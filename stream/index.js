
const fs = require('fs');
const http  = require('http');

const server = http.createServer((req,res)=>{
   const readStream = fs.createReadStream(`${__dirname}/data.txt`,'UTF-8');
   readStream.pipe(res); 
}); // creaters the server

// server.on('connection',()=>{        no use in real life
//     console.log('new connection...');
// }) 
server.listen(3000); // server is kind of an emitter

console.log('listening on port 3000'); 
// const readStream = fs.createReadStream(`${__dirname}/data.txt`,'UTF-8');
// const writeStream = fs.createWriteStream(`${__dirname}/output.txt`);
// console.log(__dirname);

// // readStream.on('data',(chunk)=>{
// //     console.log(chunk);
// //     writeStream.write(chunk);
// // })

// readStream.pipe(writeStream);