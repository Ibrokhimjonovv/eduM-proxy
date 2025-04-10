const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 1. Avval cors sozlamalari
app.use(cors());

// 2. Express.json() middleware
app.use(express.json());

// 3. Proxy sozlamalari (path-to-regexp ishlatmasdan)
const proxyOptions = {
  target: 'https://api.edumark.uz',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api'
  },
  onProxyReq: (proxyReq, req) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
};

// Proxy middleware (regexpsiz)
app.use('/api', createProxyMiddleware(proxyOptions));

// Static fayllar
app.use(express.static(path.join(__dirname, '../client/build')));

// Fallback route (regexpsiz)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Serverni ishga tushirish
const PORT = 3001;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} da ishga tushdi!`);
});