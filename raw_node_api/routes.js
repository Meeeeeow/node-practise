const {sampleHandler} = require('./routehandlers/sampleRoute');
const {aboutHandler} = require('./routehandlers/aboutRoute');
const routes = {
    sample:sampleHandler,
    about:aboutHandler
}

module.exports = routes;