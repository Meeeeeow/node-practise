//dependencies
const http = require('http');

const {handleReqRes} = require('./helpers/handleReqRes');
const envObj = require("./helpers/environments");
const data = require('./lib/data');
//app object - module scaffolding
const app = {};

// data.create('test','users',{'name':'Rahim','age':14,"hobby" :"die"},(err)=>{
//     console.log(err);
// })

// data.read('test','users',(err,data)=>{
//     console.log(err,data);
// })

// data.update('test','users',{'name' :'Karim','age': 15},(err)=>{
//     console.log(err);
// })

// data.delete('test','users',(err)=>{
//     console.log(err);
// })


//create server
app.createServer = () =>{
    const server = http.createServer(app.handleReqRes);
    console.log(envObj);
    server.listen(envObj.port, ()=>{
        console.log(process.env.NODE_ENV);
        console.log(`listening to port number ${envObj.port}`);
    })
}

//handle request response
app.handleReqRes = handleReqRes;
//start the server
app.createServer();