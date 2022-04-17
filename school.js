
const EventEmitter = require('events'); // get the generalised events

const emitter = new EventEmitter() // event emitter


class School extends EventEmitter{
    startWork = () =>{
        console.log('work started!');
    
        //raise an event
        setTimeout(()=>{
            this.emit('doWork',{
                first:'from first',
                last:'till last'
            });  // one parameter is enough
        },3000)
    }
}
module.exports = School;