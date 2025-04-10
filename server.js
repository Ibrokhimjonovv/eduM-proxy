const express = require('express');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// Proxy routes
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.edumark.uz/api',
    changeOrigin: true,
    pathRewrite: { '^/api': '/api' },
  })
);

app.use(
  '/order/create',
  createProxyMiddleware({
    target: 'https://api.edumark.uz/api/order/create',
    changeOrigin: true,
    pathRewrite: { '^/order': '' },
  })
);

app.use(
  '/api/media',
  createProxyMiddleware({
    target: 'http://api.edumark.uz',
    changeOrigin: true,
    pathRewrite: { '^/api/media': '/media' },
  })
);

// ✅ TO‘G‘RI STATIC SERVE
// app.use(express.static(path.join(__dirname, '../client/build')));

// // ✅ React routing uchun fallback
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server http://localhost:${PORT} da ishga tushdi!`);
});
