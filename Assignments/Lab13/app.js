// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const port = process.env.PORT || 3000;
// const server = http.createServer((req, res) => {
// //     if (req.url === '/' || req.url === '/sms') {
// //       // Read the HTML file
// //       fs.readFile('./index.html', (err, data) => {
// //         if (err) {
// //           res.writeHead(500, { 'Content-Type': 'text/plain' });
// //           res.end('Internal Server Error');
// //         } else {
// //           res.writeHead(200, { 'Content-Type': 'text/html' });
// //           res.end(data);
// //         }
// //       });
// //     } else {
// //       res.writeHead(404, { 'Content-Type': 'text/plain' });
// //       res.end('404 Not Found');
// //     }
//    });
// server.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//     console.log(`http://localhost:${port}`);
// });



const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

// Define a route for the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });


// app.get('/', (req, res) => res.send('Hello World!'))

// app.get('/sms', (req, res) => {
//     fs.readFile('index.html', 'utf8', (err, data) => {
//       if (err) {
//         res.status(500).send('Internal Server Error');
//       } else {
//         res.send(data);
//       }
//     });
//   });
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))