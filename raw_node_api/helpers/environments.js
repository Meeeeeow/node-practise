//app object
const environments = {};

//environments objects
environments.staging={
    port:3000,
    envName : "staging",
    secretKey:'asasdadsdadas',
    maxChecks: 5,
}

environments.production ={
    port:5000,
    envName: "production",
    secretKey:'dgfghfhfhfghfh',
    maxChecks: 5,
}

//check for which environment has come from terminal
const currentEnv = typeof(process.env.NODE_ENV) === "string" ? process.env.NODE_ENV : "staging";

//get the env object
const envObj = typeof(environments[currentEnv]) === "object" ? environments[currentEnv] : environments.staging;

//export the obj
module.exports = envObj;



//need to install : npm install -g win-node-env to run NODE_ENV in scripts