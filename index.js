const _ = require('lodash');
const people = require('./people');
console.log(_.last([1,3]));
console.log(global); //same as window object
console.log(people.a); // will give empty object but by using module.exports we can get the desired output from another module
console.log(people.people);
people.test();
console.log(_.last(people.people));

//path module
const path = require('path');
const myPath = 'F:/nodeJS/index.js';

console.log(path.basename(myPath)); // returns last part of a path
console.log(path.dirname(myPath)); // returns the directories of a path
console.log(path.extname(myPath)); //returns the extension
console.log(path.parse(myPath)); // formats a path string into obj
const pathObj = path.parse(myPath);
console.log(path.format(pathObj)); // formats a path obj to str
//https://www.w3schools.com/nodejs/met_path_join.asp
const joinedPaths = path.join('www.w3schools.com','nodejs','met_path_join.asp');
console.log(joinedPaths);

console.log(path.isAbsolute(myPath)); //checks for absolute path

console.log(path.normalize(path.format(pathObj))); //normalize the path

// os module
const os = require('os');
console.log(os.platform());
console.log(os.hostname());
console.log(os.uptime());
console.log(os.type());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.cpus());
console.log(os.userInfo());

//fs module

const fs = require('fs');
// fs.writeFile('myFile.txt','Hello world',(err,data)=>{
    
// });
// fs.appendFile('myFile.txt','.How are you?',(err,data)=>{

// });
const data = fs.readFile('myFile.txt',(err,data)=>{
    console.log(data.toString());
});

console.log('hello');

//events module


const School = require('./school');
//register the event with listener
const school = new School();
school.on('doWork',({first,last})=>{
    console.log(`You need to do something in life ${first} ${last}`);
})

school.startWork();
