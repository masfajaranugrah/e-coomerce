<h1 align="center">Welcome to BC e-commerce 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: dev dream @ fajar anugrah" src="https://img.shields.io/badge/License-dev dream @ fajar anugrah-yellow.svg" />
  </a>
</p>

> create backend payment gateway

## Install

```sh
npm install
```

## Author

👤 **fajar angurah **

* Website: http://www.fajarangurahdev.my.id
* Github: [@masfajaranugrah](https://github.com/masfajaranugrah)

## Show your support

Give a ⭐️ if this project helped you!

.
├── src/
├── ├── config/
├── │   ├── database.js         # Setup Sequelize & koneksi database
├── │   ├── midtrans.js         # Konfigurasi Midtrans Snap API
├── │   └── env.js              # Load dan ekspor variabel ENV
├── │
├── ├── domain/
├── │   ├── product.entity.js
├── │   └── transaction.entity.js
├── │
├── ├── models/
├── │   ├── index.js            # Inisialisasi semua model
├── │   ├── user.model.js
├── │   ├── product.model.js
├── │   └── transaction.model.js
├── │
├── ├── repositories/
├── │   ├── product.repository.js
├── │   └── transaction.repository.js
├── │
├── ├── usecases/
├── │   ├── product.service.js
├── │   ├── checkout.service.js
├── │   └── payment.service.js
├── │
├── ├── controllers/
├── │   ├── auth.controller.js
├── │   ├── product.controller.js
├── │   └── transaction.controller.js
├── │
├── ├── routes/
├── │   ├── auth.route.js
├── │   ├── product.route.js
├── │   └── transaction.route.js
├── │
├── ├── middlewares/
├── │   ├── auth.middleware.js
├── │   ├── role.middleware.js
├── │   └── error.middleware.js
├── │
├── ├── utils/
├── │   └── response.js         # Helper untuk standardisasi response JSON
├── │
├── ├── app.js                  # Inisialisasi express app dan middleware
├── ├── server.js               # Menjalankan server Express
└── └── swagger.json            # Dokumentasi API (optional)