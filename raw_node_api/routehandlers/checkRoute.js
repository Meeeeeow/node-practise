const data = require('../lib/data');
const {hashing} = require('../helpers/utilities');
const {parseJSON, createRandomStr} = require('../helpers/utilities');
const tokenHandler = require('./tokenRoute');
const environment = require('../helpers/environments');

const handler={};

handler.checkHandler =(requestProps,callback)=>{
    const acceptedMethods =['get','put','post','delete'];
    if(acceptedMethods.includes(requestProps.method))
    {
        handler._check[requestProps.method](requestProps,callback);
    }else{
        callback(405,{
            error:"Wrong client method detected!"
        });
    }
    
}

handler._check ={};

handler._check.get = (requestProps,callback)=>{
   
}

handler._check.post =(requestProps,callback)=>{
    let protocol = typeof(requestProps.body.protocol) === "string" && ['http','https'].includes(requestProps.body.protocol) ? requestProps.body.protocol : false;

    let url = typeof(requestProps.body.url) === "string" && requestProps.body.url.trim().length > 0 ? requestProps.body.url : false;

    let method = typeof(requestProps.body.method) === "string" && ['GET','POST','PUT','DELETE'].includes(requestProps.body.method) ? requestProps.body.method : false;

    let successCodes = typeof(requestProps.body.successCodes) === "object" && requestProps.body.successCodes instanceof Array ? requestProps.body.successCodes : false;

    let timeoutSeconds = typeof(requestProps.body.timeoutSeconds) === "number" && requestProps.body.timeoutSeconds % 1 === 0 && requestProps.body.timeoutSeconds >= 1 && requestProps.body.timeoutSeconds <= 5 ? requestProps.body.timeoutSeconds : false;

    if(protocol && url && method && successCodes && timeoutSeconds)
    {
        const token = typeof(requestProps.headers.token) === "string" ?
        requestProps.headers.token : false;

        //get the phone number of the given token
        data.read('tokens',token,(err,tokenData)=>{
            if(!err && tokenData)
            {
                let phone = parseJSON(tokenData).phone;

                //lookup the user
                data.read('test',phone,(err,userData)=>{
                    if(!err && userData){
                        tokenHandler._token.verify(token,phone,(tokenIsValid)=>{
                            if(tokenIsValid){
                                let userObj = parseJSON(userData);
                                let userChecks = typeof(userObj.checks) ==="object" && userObj.checks instanceof Array ? userObj.checks : [];

                                if(userChecks.length < environment.maxChecks)
                                {
                                    let checkId = createRandomStr(20);
                                    let checkObj ={
                                        id: checkId,
                                        phone,
                                        protocol,
                                        url,
                                        method,
                                        successCodes,
                                        timeoutSeconds
                                    }

                                    //save checkObj
                                    data.create('checks',checkId,checkObj,(err)=>{
                                        if(!err)
                                        {
                                            userObj.checks = userChecks;
                                            userObj.checks.push(checkId);

                                            //save the user
                                            data.update('test',phone,userObj,(err)=>{
                                                if(!err)
                                                {
                                                    callback(200,checkObj);
                                                }else{
                                                    callback(500,{
                                                        error:"Error updating file!"
                                                    })
                                                }
                                            })
                                        }else{
                                            callback(500,{
                                                error:"Error creating file!"
                                            })
                                        }
                                    })
                                }else{
                                    callback(401,{
                                        error:"Max usage limit reached!"
                                    })
                                }
                            }else{
                                callback(403,{
                                    error:"Authentication failure!"
                                })
                            }
                        })
                    }else{
                        callback(500,{
                            error:"Error reading file!"
                        })
                    }
                })
            }else{
                callback(403,{
                    error:"Authentication failure!"
                })
            }
        })
    }else{
        callback(400,{
            error:"Wrong input!"
        })
    }
}

handler._check.put = (requestProps,callback)=>{
   
}

handler._check.delete = (requestProps,callback)=>{
    
}

module.exports = handler;