var genTagNum = module.exports = {
    currentTagNum: 1548,  //Change depending on tagNum entries currently in db

    current: function(){
        genTagNum.currentTagNum = genTagNum.currentTagNum
    },
    add: function() {
        genTagNum.currentTagNum += 1;
    }
}