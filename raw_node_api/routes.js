const {sampleHandler} = require('./routehandlers/sampleRoute');
const {aboutHandler} = require('./routehandlers/aboutRoute');
const {userHandler} = require('./routehandlers/userRoute');
const {tokenHandler} =require('./routehandlers/tokenRoute');
const {checkHandler} = require('./routehandlers/checkRoute');
const routes = {
    sample:sampleHandler,
    about:aboutHandler,
    user:userHandler,
    token: tokenHandler,
    check: checkHandler
}

module.exports = routes;