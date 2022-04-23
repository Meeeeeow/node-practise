const handler={};

handler.notFoundHandler =(requestProps,callback)=>{
    callback(404,{
        message:"Page not found."
    })
}

module.exports = handler;