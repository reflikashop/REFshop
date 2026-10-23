/* =========================================================
   DATA PRODUK — SENTINEL HOBBY
   Cara pakai: edit / tambah objek di array PRODUCTS.
   - emoji: ganti dengan <img src="foto.jpg"> di app.js bila sudah punya foto
   - status: "ready" | "limited" | "preorder"
   - badge : "new" | "hot" | "stock" | null
   ========================================================= */

const STORE_CONFIG = {
  storeName: "SENTINEL HOBBY",
  waNumber: "6281234567890", // <-- GANTI dengan nomor WhatsApp asli (format 62..., tanpa + atau spasi)
};

const CATEGORIES = {
  "replika-senjata": "Replika Senjata",
  "tactical-gear": "Tactical Gear",
  "aksesori-koleksi": "Aksesoris Koleksi",
  "apparel": "Apparel",
};

const PRODUCTS = [
  {
    id: 1,
    name: "Replika M4 CARBINE — Static Display",
    category: "replika-senjata",
    price: 1250000,
    emoji: "🔫",
    status: "ready",
    badge: "hot",
    desc: "Replika statis non-fungsional untuk display. Body metal alloy + polymer, finishing milspec, berat ±2,1 kg. Dilengkapi stand display dan sertifikat koleksi toko.",
  },
  {
    id: 2,
    name: "Replika Pistol Desert Eagle — Decoy",
    category: "replika-senjata",
    price: 485000,
    emoji: "🧿",
    status: "ready",
    badge: "new",
    desc: "Decoy model full-weight, tidak dapat dimodifikasi menjadi fungsional. Cocok untuk diorama dan properti foto. Finish gold matte.",
  },
  {
    id: 3,
    name: "Tactical Vest MOLLE Real Tree",
    category: "tactical-gear",
    price: 375000,
    emoji: "🦺",
    status: "ready",
    badge: null,
    desc: "Rompi taktis dengan sistem MOLLE penuh, bahan Cordura 600D, adjustable untuk lingkar dada 96–120 cm. Ideal untuk airsoft & cosplay.",
  },
  {
    id: 4,
    name: "Helikopter Display AH-64 Apache 1:24",
    category: "aksesori-koleksi",
    price: 690000,
    emoji: "🚁",
    status: "limited",
    badge: "stock",
    desc: "Die-cast scale 1:24 dengan rotor berputar (manual), landing gear logam, termasuk stand nama. Sisa 3 unit.",
  },
  {
    id: 5,
    name: "Tas Ransel Tactical 45L OD Green",
    category: "tactical-gear",
    price: 289000,
    emoji: "🎒",
    status: "ready",
    badge: null,
    desc: "Ransel 45 liter, kompartemen laptop 15\", webbing MOLLE eksternal, resleting YKK, bahan waterproof coating.",
  },
  {
    id: 6,
    name: "Sarung Pisau Kulit Full Grain + Sheath",
    category: "aksesori-koleksi",
    price: 210000,
    emoji: "🗡️",
    status: "ready",
    badge: null,
    desc: "Sarung kulit sapi full-grain jahit tangan, cocok untuk belt lebar max 6 cm. Termasuk snap penutup dan d-ring.",
  },
  {
    id: 7,
    name: "Jaket Field M65 Woodland L–XXL",
    category: "apparel",
    price: 425000,
    emoji: "🧥",
    status: "ready",
    badge: "hot",
    desc: "Jaket lapangan model M65, katun ripstop waxed, 4 saku depan + inner pocket, hood tersimpan di kerah. Ukuran L, XL, XXL.",
  },
  {
    id: 8,
    name: "Topi Boonie Cover Camo Multicam",
    category: "apparel",
    price: 95000,
    emoji: "👒",
    status: "ready",
    badge: null,
    desc: "Cover boonie hat dengan loop foliage, bahan TC ripstop, ukuran all-size dengan tali pengikat dagu.",
  },
  {
    id: 9,
    name: "Teropong Binocular 10x50 HD Military Spec",
    category: "tactical-gear",
    price: 520000,
    emoji: "🔭",
    status: "limited",
    badge: "stock",
    desc: "Binocular 10x50 prism BaK-4, fully multi-coated, body rubber armor anti-slip, waterproof nitrogen-filled. Bonus tas & tali leher.",
  },
  {
    id: 10,
    name: "Plakat Logam Unit — Set 6 pcs",
    category: "aksesori-koleksi",
    price: 165000,
    emoji: "🎖️",
    status: "preorder",
    badge: "new",
    desc: "Set 6 plakat/logam emblem bertema unit terkenal, enamel finish, double tape + pin. Preorder 7–10 hari kerja.",
  },
  {
    id: 11,
    name: "Gloves Tactical Hard Knuckle Black",
    category: "apparel",
    price: 135000,
    emoji: "🧤",
    status: "ready",
    badge: null,
    desc: "Sarung tangan taktis pelindung buku jari, telapak anti-slip, jari index & thumb touchscreen-ready. Ukuran M/L/XL.",
  },
  {
    id: 12,
    name: "Pedang Katana Display Damascus + Stand",
    category: "aksesori-koleksi",
    price: 875000,
    emoji: "⚔️",
    status: "ready",
    badge: "hot",
    desc: "Katana display (tumpul/non-sharp) pola damascus tempa, pegangan ito wrap, saya kayu lacquer. Termasuk stand horizontal jati.",
  },
];
