const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// API endpointlarini proksi orqali yuborish
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.edumark.uz/api',
    changeOrigin: true,
    pathRewrite: { '^/api': '/api' },
  })
);

// Order uchun alohida proxy (agar boshqa port yoki server bo'lsa)
app.use(
  '/order/create',
  createProxyMiddleware({
    target: 'https://api.edumark.uz/api/order/create',
    changeOrigin: true,
    pathRewrite: { '^/order': '' }, // faqat /order/create kabi requestlar bo‘lsa
  })
);

// Media fayllar uchun
app.use(
    '/api/media',
    createProxyMiddleware({
      target: 'http://api.edumark.uz',
      changeOrigin: true,
      pathRewrite: {
        '^/api/media': '/media',
      },
    })
  );
  

// Serverni ishga tushirish
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server http://localhost:${PORT} da ishga tushdi!`);
});