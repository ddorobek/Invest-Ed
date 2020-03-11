import axios from 'axios'
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from '../reducers/authReducer';

import {REGISTER_CLEAR} from '../reducers/dataReducer';

export const loginUser = (user) => (dispatch) => {
  axios.post(`http://localhost:4000/login`, {
    username: user.username,
    password: user.password},
    {withCredentials: true})
    .then(response => {
      // If there are validation errors
      if (response.data.error ==  true) {
        const errorList = response.data.messages;
        const errorMsgList = [];
        errorList.forEach(error => {
          errorMsgList.push(error.message);
        });
        dispatch({type: LOGIN_ERROR, payload: errorMsgList});
      }

      // If there are no validation errors
      else {
        console.log(response);
        dispatch({type: LOGIN_SUCCESS});
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({type: LOGIN_ERROR, payload: ["Something went wrong"]})
    })
}

export const logoutUser = () => (dispatch) => {
  axios.get(`http://localhost:4000/logout`,
    {withCredentials: true})
    .then(response => {
      if (response.data.error == true) {
          dispatch({type: LOGOUT_ERROR, payload: [response.data.message]});
      }
      else {
        try {
          const deserializedState = localStorage.getItem('state');
          if (deserializedState !== null){
            const deserializedStateObj = JSON.parse(deserializedState);
            if (deserializedStateObj.authenticate.auth){
              dispatch({type: LOGOUT_SUCCESS});
              dispatch({type: REGISTER_CLEAR});
            }
          }
          else{
            dispatch({type: LOGOUT_ERROR});
          }
        }catch(err){
          dispatch({type: LOGOUT_ERROR, payload: [err]});
        }
      }
    })
    .catch(err => {
      dispatch({type: LOGOUT_ERROR, payload: [err]});
    })
}
