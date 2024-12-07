# Oasis Bot - Provider Management Script

## 📄 Deskripsi

Skrip ini digunakan untuk mengelola provider yang terdaftar di API Oasis.ai. Dengan bot ini, Anda dapat:
- Membaca token dari file `tokens.txt`.
- Mengambil daftar provider yang tersedia.
- Menghapus provider secara otomatis berdasarkan ID.

Skrip ini memanfaatkan **Node.js** dengan **Axios** sebagai library HTTP.

---

## 📥 Tutorial Instalasi

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan skrip ini:

### 1. Buat File `delete.js`
1. Buat file baru bernama `delete.js` di dalam folder proyek oasis-bot kalian.
2. Salin kode `delete.js` di projeck ini  kedalam file `delete.js` kalian

---

### 2. Install Axios
1. Install library **Axios**:
   ```bash
   npm install axios
   ```

---

### 3. Pastikan File `tokens.txt` berisi token oasis
jikalau tidak ada File `tokens.txt` atau filenya kosong silahkan generate dulu tokennya dengan
```bash
npm run setup
```

---

### 4. Jalankan Skrip
1. Jalankan skrip menggunakan Node.js:
   ```bash
   node delete.js
   ```
2. Skrip akan membaca token dari `tokens.txt`, mengambil daftar provider, dan menghapusnya secara otomatis.

---

## ⚠️ Catatan Penting
- **Token Harus Valid**: Pastikan token yang digunakan masih aktif untuk mengakses API Oasis.ai.
- **Edit File Jika Diperlukan**: Sesuaikan URL atau parameter API jika ada perubahan di endpoint Oasis.ai.

---

## 🛠️ Kontribusi
Jika Anda ingin menambahkan fitur atau melaporkan masalah, jangan ragu untuk membuat pull request atau membuka issue di repository proyek ini.

Selamat mencoba! 🚀
<div align="center">
  <a href="https://t.me/livexordsscript" target="_blank">
    <img src="https://img.shields.io/static/v1?message=Livexords&logo=telegram&label=&color=2CA5E0&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="telegram logo" />
  </a>
</div>
```
