var cookie = {
    //milliseconds remaining today
    leftTime: function() {
        var curTamp = new Date().getTime();
        var curDate = new Date(); //191223 added
        //The time stamp of the early morning of the day, minus one millisecond is to prevent the state that the subsequent time will not reach 00:00:00
        var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
        var passedTamp = curTamp - curWeeHours;
        var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
        return leftTamp;
    },
    //n: key name, v: key value, exp: expiration time (ms)
    setCookie: function(n, v, exp) {
        var date = new Date()
        date.setTime(date.getTime() + exp);
        document.cookie = n + "=" + escape(v) +
            ((exp == null) ? "" : ";expires=" + date.toGMTString())
    },
    //n is the key name of the key value you want to get
    getCookie: function(n) {
        var reg = /\s/g;
        var result = document.cookie.replace(reg, "");
        var resultArr = result.split(";");
        for (var i = 0; i < resultArr.length; i++) {
            var nameArr = resultArr[i].split("=");
            if (nameArr[0] == n) {
                return nameArr[1];
            }
        }
    }
};
  
//generate the guid
var guid = function() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
};
  
//If the guid does not exist, then generate the guid
console.log(cookie.leftTime() / 1000 / 60 /60);
!cookie.getCookie('guid') && cookie.setCookie('guid', guid(), cookie.leftTime());