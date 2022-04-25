const data = require('../lib/data');
const {hashing} = require('../helpers/utilities');
const {parseJSON} = require('../helpers/utilities');
const {createRandomStr} = require('../helpers/utilities');
const handler={};

handler.tokenHandler =(requestProps,callback)=>{
    const acceptedMethods =['get','put','post','delete'];
    if(acceptedMethods.includes(requestProps.method))
    {
        handler._token[requestProps.method](requestProps,callback);
    }else{
        callback(405,{
            error:"Wrong client method detected!"
        });
    }
    
}

handler._token ={};

handler._token.get = (requestProps,callback)=>{
   const id = typeof(requestProps.queryObjStr.tokenId) === "string" ? requestProps.queryObjStr.tokenId : false;

   if(id)
   {
      data.read('tokens',id,(err,u)=>{
          const user ={...parseJSON(u)};
          if(!err && user)
          {
            delete user.password;
            callback(200,user);
          }else{
              callback(404,{
                  error:"data not found!"
              })
          }
      })
   }else{
       callback(404,{
           error:"id not found!"
       })
   }
}

handler._token.post =(requestProps,callback)=>{
    const phone = typeof(requestProps.body.phone) === "string" && requestProps.body.phone.trim().length === 11 ? requestProps.body.phone : false;
    
    const password = typeof(requestProps.body.password) === "string" && requestProps.body.password.trim().length > 0 ? requestProps.body.password : false;
    console.log(requestProps);
    if(phone && password)
    {
        data.read('test',phone,(err,u)=>{
            const user = {...parseJSON(u)};
            
            let hashedPwd = hashing(password);
            if(hashedPwd === user.password)
            {
                const tokenId = createRandomStr(20);
                const expires = Date.now() + 60 * 60 * 1000;

                const tokenObj ={
                    phone,
                    tokenId,
                    expires
                }
                console.log(tokenObj);
                //store the token
                data.create('tokens',tokenId,tokenObj,(err)=>{
                    if(!err)
                    {
                        callback(200,tokenObj);
                    }else{
                        callback(500,{
                            error:"Error in creating token."
                        })
                    }
                })

            }else{
                callback(400,{
                    error:"Password doesnot match."
                })
            }
        })
    }else{
        callback(400,{
            error:"Wrong credentials."
        })
    }
}

handler._token.put = (requestProps,callback)=>{
   const id = typeof(requestProps.body.id) === "string" && requestProps.body.id.length === 20 ? requestProps.body.id : false;

   const extend = typeof(requestProps.body.extend) === "boolean" ? true : false;

   if(id && extend)
   {
        data.read('tokens',id,(err,tokenData)=>{
            if(!err && tokenData)
            {
                const tkData = {...parseJSON(tokenData)};
                if(tkData.expires > Date.now())
                {
                    tkData.expires = Date.now() + 60*60*1000;

                    //store updated value

                    data.update('tokens',id,tkData,(err)=>{
                        if(!err)
                        {
                            callback(200,{
                                message:"Token updated successfully!"
                            })
                        }else{
                            callback(500,{
                                error:"Error in updating token"
                            })
                        }
                    })
                }else{
                    callback(404,{
                        error:"Token already expired."
                    })
                }
            }else{
                callback(500,{
                    error:"Error in reading file."
                })
            }
        })
   }else{
       callback(400,{
           error:"Wrong credentials."
       })
   }


}

handler._token.delete = (requestProps,callback)=>{
   const id = typeof(requestProps.queryObjStr.tokenId) === "string" && requestProps.queryObjStr.tokenId.length === 20 ? requestProps.queryObjStr.tokenId : false;

   if(id)
   {
       data.read('tokens',id,(err,tokenData)=>{
        if(!err && tokenData)
        {
            data.delete('tokens',id,(err)=>{
                if(!err)
                {
                     callback(200,{
                         message:"Token deleted successfully!"
                     })
                }else{
                    callback(500,{
                        error:"Cannot complete delete operation"
                    })
                }
            })
        }else{
            callback(500,{
                error:"Error in reading file."
            })
        }

       })
       
   }else{
       callback(404,{
           error:"id not found."
       })
   }
}

handler._token.verify =(id,phone,callback)=>{
    data.read('tokens',id,(err,tokenData)=>{
        if(!err && tokenData)
        {
            if(parseJSON(tokenData).phone === phone && parseJSON(tokenData).expires > Date.now())
            {
                callback(true);
            }else{
                callback(false);
            }
            
        }else{
            callback(false);
        }
    })
}
module.exports = handler;