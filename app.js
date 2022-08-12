const  http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
   const url = req.url;
   const method = req.method;
   if (url ==='/') {
    res.write('<html>');
    res.write('<head><title>First Response</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button?</form></body>');
    res.write('</html>');
    return res.end();
   }
   if (url === '/message' && method === 'POST') {
        const body = [];    
        req.on('data', (chunk) => {
          console.log(chunk);  
          body.push(chunk);
          
        });
        return req.on('end',() => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, (error) => {
                res.writeHead(302, {'Location': '/'});
                return res.end;
            });
         
        });
       
       
   }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>First Response</title></head>');
    res.write('<body><h1>Hello From Node.js Server</h1></body>');
    res.write('</html>');
    res.end();
});
// Set up our server so it will listen on the port
server.listen(port, function (error) {
  
    // Checking any error occur while listening on port
    if (error) {
        console.log('Something went wrong', error);
    }
    // Else sent message of listening
    else {
        console.log('Server is listening on port' + port);
    }
})