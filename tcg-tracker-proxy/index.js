const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
var cors = require('cors')
// Create Express Server
const app = express();
app.use(cors())
// Configuration
const PORT = 3001;
const HOST = "localhost";
const API_SERVICE_URL = "https://yugiohprices.com/api";

app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to the yugiohprices api');
 });

//  // Authorization
// app.use('', (req, res, next) => {
//     if (req.headers.authorization) {
//         console.log(req.headers.authorization + ' accessed ' + req.baseUrl + 'drölf')
//         next();
//     } else {
//         res.sendStatus(403);
//     }
//  });

 // Proxy endpoints
app.use('/yugiohprices', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/yugiohprices`]: '',
    },
 }));

 app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });