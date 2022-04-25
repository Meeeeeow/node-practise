const handler={};

handler.aboutHandler =(requestProps,callback)=>{
    console.log(requestProps);
    callback(200,{
        message:"This is about page."
    })
}

module.exports = handler;