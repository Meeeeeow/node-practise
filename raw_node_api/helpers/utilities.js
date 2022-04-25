const utilities ={};
const crypto = require('crypto');
const environment = require('./environments');
utilities.parseJSON =(jsonStr) =>{
 let output;

 try{
     output = JSON.parse(jsonStr);
 }
 catch{
     output ={};
 }

 return output;
}

utilities.hashing = (str) =>{
    if(typeof(str) === 'string' && str.length > 0)
    {
        const hash = crypto.createHmac('sha256',environment.secretKey).update(str).digest('hex');

        return hash;
    }else{
        return false;
    }
}

utilities.createRandomStr = (strLen)=>{
    let length = strLen;

    length = typeof(strLen) === "number" && strLen > 0 ? strLen : false;

    if(length)
    {
        const possibleChars ='abcdefghijklmnopqrstuvwxyz1234567890';
        let output ='';
        for(let i=1;i<=length;i++)
        {
            let randomChar = possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));

            output += randomChar;
        }

        return output;
    }
    return false;
}
module.exports = utilities;