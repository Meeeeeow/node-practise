const data = require('../lib/data');
const {hashing} = require('../helpers/utilities');
const {parseJSON} = require('../helpers/utilities');
const tokenHandler = require('./tokenRoute');

const handler={};

handler.userHandler =(requestProps,callback)=>{
    const acceptedMethods =['get','put','post','delete'];
    if(acceptedMethods.includes(requestProps.method))
    {
        handler._users[requestProps.method](requestProps,callback);
    }else{
        callback(405,{
            error:"Wrong client method detected!"
        });
    }
    
}

handler._users ={};

handler._users.get = (requestProps,callback)=>{
    console.log( requestProps.queryObjStr.phone);

    const phone = typeof(requestProps.queryObjStr.phone) === "string" 
    && requestProps.queryObjStr.phone.trim().length === 11 ? requestProps.queryObjStr.phone : false;
    console.log(phone);

    if(phone)
    {
        const token = typeof(requestProps.headers.token) === "string" ? requestProps.headers.token : false;

        tokenHandler._token.verify(token,phone,(tokenId)=>{
            if(tokenId)
            {
                data.read('test',phone,(err,u)=>{
                    console.log(u)
                    const user = {...parseJSON(u)};
                    if(!err && user)
                    {
                        delete user.password;
                        callback(200,user);
                    }else{
                        callback(404,{
                            error:"User wasnot found"
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
        callback(404,{
            error:"Requested user was not found!"
        })
    }
}

handler._users.post =(requestProps,callback)=>{
    const firstName = typeof(requestProps.body.firstName) === "string" && requestProps.body.firstName.trim().length > 0 ? requestProps.body.firstName : false;

    const lastName = typeof(requestProps.body.lastName) === "string" && requestProps.body.lastName.trim().length > 0 ? requestProps.body.lastName : false;

    const phone = typeof(requestProps.body.phone) === "string" && requestProps.body.phone.trim().length === 11 ? requestProps.body.phone : false;
    
    const password = typeof(requestProps.body.password) === "string" && requestProps.body.password.trim().length > 0 ? requestProps.body.password : false;

    const tosAgree = typeof(requestProps.body.tosAgree) === "boolean"  ? requestProps.body.tosAgree : false;

    if(firstName && lastName && password && phone && tosAgree )
    {
        //check if user already exists
        data.read('test',phone,(err,user)=>{
            if(err)
            {
                let userObj={
                    firstName,
                    lastName,
                    phone,
                    password : hashing(password),
                    tosAgree
                }

                //store user to file system
                data.create('test',phone,userObj,(err)=>{
                    if(!err)
                    {
                        callback(200,{
                            message:"user was created succesfully."
                        })
                    }else{
                        callback(500,{
                            error:"Error in creating file."
                        })
                    }
                })
            }else{
                callback(500,{
                    error:"There was a error in creating user.User already exists."
                })
            }
        })
        
    }else{
        callback(400,{
            error:"There is a problem in your given data!"
        })
    }
}

handler._users.put = (requestProps,callback)=>{
    const firstName = typeof(requestProps.body.firstName) === "string" && requestProps.body.firstName.trim().length > 0 ? requestProps.body.firstName : false;

    const lastName = typeof(requestProps.body.lastName) === "string" && requestProps.body.lastName.trim().length > 0 ? requestProps.body.lastName : false;

    const phone = typeof(requestProps.body.phone) === "string" && requestProps.body.phone.trim().length === 11 ? requestProps.body.phone : false;
    
    const password = typeof(requestProps.body.password) === "string" && requestProps.body.password.trim().length > 0 ? requestProps.body.password : false;

    if(phone)
    {
        if(firstName || lastName || password)
        {
            
            const token = typeof(requestProps.headers.token) === "string" ? requestProps.headers.token : false;

            tokenHandler._token.verify(token,phone,(tokenId)=>{
                if(tokenId)
                {
                    data.read('test',phone,(err,u)=>{
                        const user ={...parseJSON(u)};
                        if(!err && user)
                        {
                            if(firstName)
                            {
                                user.firstName = firstName
                            }
                            if(lastName)
                            {
                                user.lastName = lastName;
                            }
                            if(password)
                            {
                                user.password = hashing(password);
                            }
                            
                            //store updates on file system
                            data.update('test',phone,user,(err)=>{
                                if(!err)
                                {
                                    callback(200,{
                                        message:"user updated successfully!"
                                    })
                                }else{
                                    callback(500,{
                                        error:"Error in updating user."
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
                    callback(403,{
                        error:"Authentication failure!"
                    })
                }
            })
           
        }else{
            callback(400,{
                error:"Wrong credentials."
            })
        }
    }else{
        callback(400,{
            error:"Contact number is not valid."
        })
    }
}

handler._users.delete = (requestProps,callback)=>{
    const phone = typeof(requestProps.queryObjStr.phone) === "string" 
    && requestProps.queryObjStr.phone.trim().length === 11 ? requestProps.queryObjStr.phone : false;

    if(phone)
    {
        const token = typeof(requestProps.headers.token) === "string" ? requestProps.headers.token : false;

        tokenHandler._token.verify(token,phone,(tokenId)=>{
            if(tokenId)
            {
                data.read("test",phone,(err,user)=>{
                    if(!err && user)
                    {
                        data.delete("test",phone,(err)=>{
                            if(!err)
                            {
                                callback(200,{
                                    message:"user deleted successfully!"
                                })
                            }else{
                                callback(500,{
                                    error:"Error in delete operation."
                                })
                            }
                        })
                    }else{
                        callback(500,{
                            error:"There was an error reading the file."
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
            error:"Contact number is invalid."
        })
    }
}

module.exports = handler;