var crypto = require('crypto');

const showResponse = (res, code, response) => {    
    let server_response = {
        status:response.status,
        message:response.message,
        data:response.data,
        total:response.total?response.total:undefined
    }    
    res.status(code).json(server_response)
}
const showAck = (status,message,data) => {
  let response = {}
  response.status = status
  response.message = message
  response.data = data
  return response;
}

const getTimerValue=(number)=>{
    let days = Math.floor(number / 86400)
    let hours = Math.floor(number % 86400 / 3600)
    let minutes = Math.floor(number / 60 % 60)
    let seconds = Math.floor(number % 60)
    var stringArr = ""
    if (days != 0){
        stringArr = days == 1 ? days+" Day" : days+" Days"
    }
    else if (hours != 0){
        stringArr = hours == 1 ? hours+" Hour" : hours+" Hours"
    }
    else if (minutes != 0){
        stringArr = minutes == 1 ? minutes+" Minute" : minutes+" Minutes"
    }
    else if (seconds != 0){
        stringArr = seconds == 1 ? seconds+" Second" : seconds+" Seconds"
    }else{
         stringArr = "Off"
    }
    return stringArr
}

const randomStr=(len, arr)=> { 
    var ans = ''; 
    for (var i = len; i > 0; i--) { 
        ans +=  
          arr[Math.floor(Math.random() * arr.length)]; 
    } 
    return ans; 
}

module.exports = {
    showResponse,
    showAck,
    randomStr,
    getTimerValue
}