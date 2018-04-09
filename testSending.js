var http = require('http')
var querystring = require('querystring')

const postData = querystring.stringify({
    'name': 'max',
    'email': 'maxtang@glosfer.com'
  });
  
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/mailer',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};


let loop=3000
while(loop--)
{

    var req = http.request(options, (res)=>{

    })
    req.on('error', (e)=>{
        console.log('problem with request: '+ e.message)
    })

    req.write(postData)

}


req.end()













