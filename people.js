var people =['x','y','z'];
console.log(module);    //returns Module {
                        //     id: '.',
                        //     path: 'F:\\nodeJS',
                        //     exports: {},
                        //     filename: 'F:\\nodeJS\\people.js',
                        //     loaded: false,
                        //     children: [],
                        //     paths: [ 'F:\\nodeJS\\node_modules', 'F:\\node_modules' ]
                        //   }
var a = 5;
const test = () =>{
    console.log('Hello')
}
module.exports = {
    people,
    a,
    test
}

// console.log(module); Module {
//                     id: '.',
//                     path: 'F:\\nodeJS',
//                     exports: [ 'x', 'y', 'z' ],
//                     filename: 'F:\\nodeJS\\people.js',
//                     loaded: false,
//                     children: [],
//                     paths: [ 'F:\\nodeJS\\node_modules', 'F:\\node_modules' ]
//                 }