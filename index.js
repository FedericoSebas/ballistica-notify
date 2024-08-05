const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),  // Path to your private key
  cert: fs.readFileSync('cert.pem') // Path to your certificate
};

const port = 8000;

const server = https.createServer(options, (req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    console.log('Received body:', body);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Data received successfully!\n');
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
