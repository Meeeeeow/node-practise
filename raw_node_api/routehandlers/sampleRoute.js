const handler={};

handler.sampleHandler =(requestProps,callback)=>{
    callback(200,{
        message:"This is sample page."
    })
}

module.exports = handler;