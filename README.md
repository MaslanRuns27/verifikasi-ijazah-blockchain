
---

# 📄 **README.md — Verifikasi Ijazah Blockchain**

```md
# 🎓 Verifikasi Ijazah Berbasis Blockchain  
Sistem verifikasi ijazah digital menggunakan **Blockchain (Hardhat Network)**, **Smart Contract Solidity**, dan **Ethers.js**, dilengkapi fitur upload file, hashing SHA-256, penyimpanan ke blockchain, serta verifikasi keaslian ijazah secara otomatis.

---

## 🚀 Fitur Utama

### ✅ 1. **Upload Ijazah & Simpan Hash ke Blockchain**
- File ijazah (PDF/JPG/PNG) di-hash menggunakan **SHA-256**
- Data disimpan ke smart contract:
  - NIM  
  - Nama Pemilik  
  - Program Studi  
  - Tahun Lulus  
  - Hash Ijazah  
  - Status Valid

### ✅ 2. **Verifikasi Ijazah**
- Mengunggah file ijazah
- Sistem menghitung hash file
- Blockchain membandingkan hash input vs hash asli
- Menghasilkan status:
  - ✔ **VALID**
  - ✘ **TIDAK VALID**

### ✅ 3. **Integrasi MetaMask**
- Login menggunakan MetaMask
- Hanya wallet yang terhubung yang bisa menyimpan/menverifikasi
- Deteksi jaringan otomatis (HARUS jaringan Hardhat 31337)

### ✅ 4. **Antarmuka Modern**
- Menggunakan **TailwindCSS**
- Notifikasi **Toast**
- Loading spinner
- Layout responsif

---

## 📁 Struktur Folder

```

project-verifikasi-ijazah/
│
├── contracts/
│   └── IjazahNFT.sol
│
├── scripts/
│   └── deploy.js
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css (opsional)
│
├── hardhat.config.js
├── package.json
└── README.md

```

---

## 🔧 Instalasi & Setup

### 1️⃣ **Clone repository**
```

git clone [https://github.com/USERNAME/verifikasi-ijazah-blockchain.git](https://github.com/USERNAME/verifikasi-ijazah-blockchain.git)
cd verifikasi-ijazah-blockchain

```

### 2️⃣ Install dependency Hardhat
```

npm install
npm install --save-dev hardhat
npm install ethers

```

### 3️⃣ Jalankan Hardhat Node
```

npx hardhat node

```

### 4️⃣ Deploy Smart Contract
```

npx hardhat run scripts/deploy.js --network localhost

```

Hasil alamat contract akan muncul, contoh:

```

Contract deployed to: "alamat_contract_disini"

````

Copy **alamat contract** ini ke script.js:
```js
const CONTRACT_ADDRESS = "alamat_contract_disini";
````

---

## 🏗 Teknologi yang Digunakan

| Teknologi       | Fungsi                                     |
| --------------- | ------------------------------------------ |
| **Solidity**    | Pembuatan smart contract                   |
| **Hardhat**     | Development environment & local blockchain |
| **Ethers.js**   | Komunikasi Web → Blockchain                |
| **MetaMask**    | Wallet penghubung user                     |
| **TailwindCSS** | UI modern dan responsif                    |
| **SHA-256**     | Hash untuk file ijazah                     |

---

## 💡 Cara Menggunakan Sistem

### **A. Menyimpan Ijazah**

1. Masuk MetaMask → connect wallet
2. Isi data:

   * NIM
   * Nama
   * Program Studi
   * Tahun Lulus
3. Upload file ijazah
4. Klik **Simpan ke Blockchain**
5. Sistem:

   * Meng-hash file
   * Mengirim transaksi ke blockchain
   * Menampilkan TX hash

### **B. Verifikasi Ijazah**

1. Masukkan NIM
2. Upload file yang ingin dicek
3. Klik **Verifikasi**
4. Sistem:

   * Hash ulang file
   * Membandingkan hash dengan data blockchain
   * Menampilkan hasil

     * ✔ VALID
     * ✘ TIDAK VALID

---

## 🧪 Pengujian Sistem

| Kasus Uji                   | Hasil                    |
| --------------------------- | ------------------------ |
| Mengupload ijazah asli      | ✔ Disimpan ke blockchain |
| Verifikasi file asli        | ✔ VALID                  |
| Verifikasi file yang diubah | ✘ TIDAK VALID            |
| File dengan NIM salah       | ✘ TIDAK VALID            |
| MetaMask tidak login        | ⚠ Tidak diizinkan        |

---

## 🛡 Keamanan

Fitur keamanan yang diterapkan:

* File ijazah **tidak disimpan**, yang disimpan hanya **hash SHA-256**
* MetaMask authentication
* Blockchain immutable (data tidak bisa diubah)
* Validasi NIM → data blockchain unik per mahasiswa

---

## 👨‍💻 Developer

Nama: **Maslan Runs**
Project: *Sistem Verifikasi Ijazah Berbasis Blockchain*
Bahasa Pemrograman: Solidity, JS
Framework: Hardhat, TailwindCSS
Tahun: 2025

---

## 📜 Lisensi

MIT License — bebas digunakan untuk pendidikan & penelitian.

---

## ⭐ Jangan lupa beri star!

Jika project ini membantu, berikan ⭐ di repository GitHub!

```
