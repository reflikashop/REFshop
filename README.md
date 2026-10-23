# SENTINEL HOBBY — Toko Online (Statis)

Toko online satu halaman (mobile-first) bergaya **Premium Military Minimalis** dengan katalog produk, pencarian, filter kategori, detail produk, keranjang, dan pemesanan via **WhatsApp**. Tanpa framework — cukup HTML, CSS, dan JavaScript murni.

## Struktur File

```
├── index.html          # Seluruh halaman (Beranda, Katalog, Tentang, Cara Pemesanan, FAQ, Kontak)
├── css/
│   └── style.css       # Tema & layout responsif
└── js/
    ├── products.js     # ⚙️ DATA PRODUK + konfigurasi toko (yang paling sering Anda edit)
    └── app.js          # Logika: render katalog, keranjang, WhatsApp checkout
```

## Langkah Wajib Sebelum Online

1. **Ganti nomor WhatsApp** — buka `js/products.js`, ubah nilai `waNumber`:
   ```js
   waNumber: "6281234567890", // format 62..., tanpa +, spasi, atau tanda baca
   ```
2. **Sesuaikan data toko** di `index.html`: nama toko, email, lokasi, jam pelayanan, rekening pembayaran.
3. **Kelola produk** di array `PRODUCTS` pada `js/products.js`:
   - `name`, `category` (kunci ada di `CATEGORIES`), `price` (angka, tanpa titik/koma)
   - `status`: `"ready"` | `"limited"` | `"preorder"`
   - `badge`: `"new"` | `"hot"` | `"stock"` | `null`
   - `emoji`: sementara pakai emoji; lihat poin berikutnya untuk foto asli.

## Menggunakan Foto Produk Asli

1. Buat folder `img/` lalu taruh foto di sana, mis. `img/m4-carbine.jpg` (disarankan rasio 4:3, ±800×600 px).
2. Di `js/products.js` tambahkan properti `photo` per produk:
   ```js
   { id: 1, name: "...", photo: "img/m4-carbine.jpg", ... }
   ```
3. Di `js/app.js`, ganti `<span>${p.emoji}</span>` pada fungsi `renderGrid()` menjadi:
   ```js
   ${p.photo ? `<img src="${p.photo}" alt="${p.name}" loading="lazy">` : `<span>${p.emoji}</span>`}
   ```

## Menjalankan Secara Lokal

Buka langsung `index.html` di browser, atau jalankan server kecil:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Upload ke Hosting

- **Netlify / Vercel / GitHub Pages (gratis):** drag-and-drop folder ini atau push ke repo, site otomatis online.
- **cPanel biasa:** upload seluruh isi folder ke `public_html`.

## Fitur yang Sudah Tersedia

- ✅ Beranda: banner, keunggulan, statistik, CTA katalog & WhatsApp
- ✅ Katalog: pencarian real-time, filter kategori, badge (NEW/BEST SELLER/LIMITED), status stok
- ✅ Modal detail produk dengan pilihan jumlah
- ✅ Keranjang belanja (tersimpan di localStorage) → checkout otomatis menyusun pesanan ke chat WhatsApp
- ✅ Tentang Kami, Cara Pemesanan, FAQ (accordion), Kontak & jam pelayanan
- ✅ Tombol WhatsApp mengambang + menu mobile responsif

## Catatan Legal & Keamanan Transaksi

- Teks toko menegaskan produk adalah **replika/dekorasi non-fungsional**. Sesuaikan dengan kategori produk Anda yang sebenarnya dan peraturan yang berlaku.
- Pembayaran disarankan hanya ke **rekening resmi atas nama toko**, disertai invoice digital.
- Ganti semua data contoh (nomor WA, email, alamat, klaim statistik) dengan data asli sebelum publikasi.
