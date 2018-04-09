var cluster  = require('cluster')
var numCPUs = require('os').cpus().length

if(cluster.isMaster){
    for(let i=0; i<numCPUs; i++){
        cluster.fork()
    }
}
else{
    require('./mailer')
}


