const handler={};

handler.aboutHandler =(requestProps,realData,callback)=>{
    console.log(requestProps);
    console.log(realData);
    callback(200,{
        message:"This is about page." + realData
    })
}

module.exports = handler;