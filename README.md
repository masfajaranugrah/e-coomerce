# 🚀 E-Commerce Backend API

Sistem backend e-commerce menggunakan **Express.js**, terintegrasi dengan **Midtrans (Snap API)** untuk pembayaran dan **RajaOngkir** untuk cek ongkos kirim.

---

## 🧰 Teknologi yang Digunakan

- Node.js + Express.js
- PostgreSQL + Sequelize ORM
- Midtrans Snap API
- RajaOngkir API (via Komerce)
- Axios, UUID, Dotenv

---

## 📁 Struktur Proyek
## Instalasi & Setup

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


```bash
  .
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── env.js
│   │   └── midtrans.js
│   ├── controllers/
│   │   ├── auth/
│   │   │   └── authController.js
│   │   ├── couponController.js
│   │   ├── productController.js
│   │   ├── transactionController.js
│   │   └── userController.js
│   ├── docs/
│   │   └── swaggerOptions.js
│   ├── domain/entities/
│   │   ├── coupon.entity.js
│   │   ├── product.entity.js
│   │   ├── transaction.entity.js
│   │   └── user.entity.js
│   ├── middlewares/
│   │   ├── authenticate.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── couponModel.js
│   │   ├── index.js
│   │   ├── productModel.js
│   │   ├── transactionItemModel.js
│   │   ├── transactionModel.js
│   │   └── userModel.js
│   ├── repositories/
│   │   ├── authRepository.js
│   │   ├── couponRepository.js
│   │   ├── productRepository.js
│   │   ├── transactionRepository.js
│   │   └── userRepository.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── couponRoutes.js
│   │   ├── product.js
│   │   ├── shipping.js
│   │   ├── transaction.js
│   │   └── user.js
│   ├── services/
│   │   └── rajaongkirService.js
│   ├── usecases/
│   │   ├── auth/
│   │   │   ├── loginUser.js
│   │   │   ├── logoutUser.js
│   │   │   ├── refreshAccessToken.js
│   │   │   ├── registerUser.js
│   │   │   ├── resendCodeUseCase.js
│   │   │   └── verifyCodeUseCase.js
│   │   ├── coupons/
│   │   │   ├── createCoupon.js
│   │   │   ├── deleteCoupon.js
│   │   │   ├── getAllCoupons.js
│   │   │   ├── getCouponById.js
│   │   │   └── updateCoupon.js
│   │   ├── payment/
│   │   │   ├── createPayment.js
│   │   │   └── handleMidtransNotification.js
│   │   ├── paymentHistory/
│   │   │   └── getUserPaymentHistory.js
│   │   ├── product/
│   │   │   ├── createProduct.js
│   │   │   ├── deleteProduct.js
│   │   │   ├── getAllProducts.js
│   │   │   ├── getProductById.js
│   │   │   └── updateProduct.js
│   │   └── user/
│   │       ├── deleteUser.js
│   │       ├── getAllUsers.js
│   │       ├── getUserById.js
│   │       └── updateUser.js
│   └── utils/
│       └── generateTokens.js
├── app.js
├── server.js
├── .env
├── .gitignore
├── README.md
├── LICENSE
└── package.json
```


## Environment Variables


Server Configuration

```bash
PORT=3000
NODE_ENV=development
```
JWT Authentication
 ```bash   
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d
```

 Midtrans Integration
```bash
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_SERVER_KEY=your_midtrans_server_key
```

RajaOngkir Integration
```bash
RAJAONGKIR_API_KEY=your_rajaongkir_api_key
RAJAONGKIR_BASE_URL=https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost
RAJAONGKIR_BASE_URL_TEST=https://rajaongkir.komerce.id/api/v1/calculate/test
RAJAONGKIR_BASE_URL_DESTINATION=https://rajaongkir.komerce.id/api/v1/calculate/destination
```
```bash
API_KEY=your_api_key
ANOTHER_API_KEY=your_another_api_key
SVR_PUB=your_public_server_identifier
```
## 🔐 Fitur API yang Tersedia

Kumpulan endpoint RESTful untuk menangani berbagai kebutuhan dalam sistem backend e-commerce, mulai dari autentikasi hingga transaksi dan manajemen data produk serta kupon.

### 📦 Produk (Product Management)

Kelola data produk yang ditampilkan kepada pelanggan.

- `GET /products` – Ambil seluruh daftar produk
- `GET /products/:id` – Ambil detail produk berdasarkan ID
- `POST /products` – Tambahkan produk baru
- `PUT /products/:id` – Perbarui informasi produk
- `DELETE /products/:id` – Hapus produk dari sistem

### 👤 Autentikasi & Verifikasi Pengguna (User Authentication)

Sistem login, registrasi, dan verifikasi akun menggunakan token dan OTP.

- `POST /auth/register` – Registrasi akun pengguna baru
- `POST /auth/login` – Login & generate token akses
- `POST /auth/verify` – Verifikasi akun melalui kode OTP
- `POST /auth/resend-code` – Kirim ulang kode OTP ke email pengguna
- `POST /auth/logout` – Logout & invalidasi sesi pengguna
### 🧾 Transaksi & Pembayaran (Checkout & Payment)

Mekanisme checkout terintegrasi dengan Midtrans Snap API dan RajaOngkir untuk ongkir.

- `POST /transactions` – Buat transaksi baru dan proses pembayaran
-  Menyertakan data produk yang dibeli
-  Menyertakan detail pengiriman: asal, tujuan, berat, ekspedisi
- `[Coming Soon] Webhook Midtrans` – Menangani notifikasi status transaksi secara otomatis
### 🎫 Kupon & Diskon (Voucher Management)

Kelola kode kupon promosi yang dapat digunakan saat checkout.
- `POST /coupons` – Buat kode kupon baru
- `GET /coupons` – Ambil semua kupon yang tersedia
- `GET /coupons/:id` – Ambil detail kupon berdasarkan ID
- `PATCH /coupons/:id` – Ubah data kupon yang ada
- ` DELETE /coupons/:id` – Hapus kupon dari sistem

### 👥 Pengguna (User Management)
Manajemen data profil dan hak akses pengguna.
- `GET /users` – Ambil seluruh data pengguna
- `GET /users/:id` – Ambil detail pengguna berdasarkan ID
- `PATCH /users/:id` – Perbarui data profil pengguna (alamat, role, avatar, dll.)
## Dokumentasi API

Untuk dokumentasi lengkap, buka:

```bash
  GET /api-docs
```

(Sudah terintegrasi dengan Swagger UI)


## Clean Architecture Friendly?

Struktur kamu sudah cukup bersih dan bisa disesuaikan untuk Clean Architecture. Jika ingin tampak lebih “enterprise-ready”, kamu bisa tambahkan:

- `interfaces/` (untuk adapter luar)
- `infrastructure/` (untuk persistence, API - eksternal)
- `application/` (untuk use cases)


## Kontribusi
Pull request sangat terbuka. Sertakan deskripsi perubahan dan test jika memungkinkan.



## License

Proyek ini dilisensikan di bawah MIT License
[MIT License](https://github.com/masfajaranugrah/e-coomerce/blob/main/LICENSE)


## Tech Stack
**Server:** Node.js + Express.js + PostgreSQL + Sequelize ORM + Midtrans Snap API + RajaOngkir API (via Komerce)

![Node.js](https://img.shields.io/badge/Node.js-v18.x-brightgreen)
![Express](https://img.shields.io/badge/Express.js-Backend-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-ORM-orange)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)



## Postman Collection Link (Public)


🔭 Coba Langsung API
[🔗 Klik di sini untuk mengakses Postman Collection](https://www.postman.com/crimson-crater-159090/e-co/collection/l4ycn72/eccommerce)

## Authors

- [@masfajaranugrah](https://www.fajaranugrahdev.my.id)

