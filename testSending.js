var http = require('http')
var querystring = require('querystring')



let loop=5000
while(loop--)
{

    const postData = querystring.stringify({
        'name': 'max',
        'email': loop+'maxtang@glosfer.com'
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
    
    var req = http.request(options, (res)=>{

    })
    req.on('error', (e)=>{
        console.log('problem with request: '+ e.name + ', ' + e.message + ', ' + e.stack )
    })

    req.write(postData)

    // req.on('socket', (e) =>{
    //     console.log('socket error: ' + e)
    // })

    req.end()

}
















