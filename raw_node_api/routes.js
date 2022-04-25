const {sampleHandler} = require('./routehandlers/sampleRoute');
const {aboutHandler} = require('./routehandlers/aboutRoute');
const {userHandler} = require('./routehandlers/userRoute');
const {tokenHandler} =require('./routehandlers/tokenRoute');
const routes = {
    sample:sampleHandler,
    about:aboutHandler,
    user:userHandler,
    token: tokenHandler
}

module.exports = routes;