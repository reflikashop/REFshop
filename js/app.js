/* =========================================================
   SENTINEL HOBBY — app.js
   Katalog, pencarian, filter kategori, detail produk,
   keranjang (localStorage), dan checkout via WhatsApp.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (sel) => document.querySelector(sel);
  const rupiah = (n) =>
    "Rp " + n.toLocaleString("id-ID", { maximumFractionDigits: 0 });

  const STATUS_LABEL = {
    ready: ["Ready Stock", "st-ready"],
    limited: ["Stok Terbatas", "st-limited"],
    preorder: ["Preorder", "st-preorder"],
  };

  function waLink(message) {
    return (
      "https://wa.me/" +
      STORE_CONFIG.waNumber +
      "?text=" +
      encodeURIComponent(message)
    );
  }

  /* ---------- State ---------- */
  let activeCategory = "all";
  let searchTerm = "";
  let currentProduct = null;
  let cart = [];

  try {
    cart = JSON.parse(localStorage.getItem("sh_cart") || "[]");
  } catch (e) {
    cart = [];
  }
  const saveCart = () =>
    localStorage.setItem("sh_cart", JSON.stringify(cart));

  /* ---------- Render katalog ---------- */
  function filteredProducts() {
    const q = searchTerm.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const okCat = activeCategory === "all" || p.category === activeCategory;
      const okQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        (CATEGORIES[p.category] || "").toLowerCase().includes(q);
      return okCat && okQ;
    });
  }

  function renderGrid() {
    const grid = $("#productGrid");
    const list = filteredProducts();
    $("#emptyMsg").hidden = list.length > 0;

    grid.innerHTML = list
      .map((p) => {
        const [label, cls] = STATUS_LABEL[p.status] || ["", ""];
        const badgeHtml = p.badge
          ? `<span class="badge badge-${p.badge}">${
              { new: "NEW", hot: "BEST SELLER", stock: "LIMITED" }[p.badge]
            }</span>`
          : "";
        return `
        <article class="product-card">
          <div class="product-media" data-id="${p.id}" role="button" tabindex="0" aria-label="Lihat detail ${p.name}">
            ${badgeHtml}
            <span>${p.emoji}</span>
            <span class="status-pill ${cls}">${label}</span>
          </div>
          <div class="product-body">
            <p class="product-cat">${CATEGORIES[p.category] || ""}</p>
            <h3 class="product-name" data-id="${p.id}">${p.name}</h3>
            <p class="product-price">${rupiah(p.price)}</p>
            <div class="product-actions">
              <button class="btn btn-primary" data-add="${p.id}">+ Keranjang</button>
              <a class="btn btn-wa" href="${waLink(
                "Halo admin " + STORE_CONFIG.storeName +
                ", saya ingin memesan:\n\n🛒 *" + p.name + "*\n💰 " + rupiah(p.price) +
                "\n\nApakah stok masih tersedia?"
              )}" target="_blank" rel="noopener">Pesan</a>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  /* ---------- Modal detail ---------- */
  function openDetail(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    currentProduct = p;
    const [label, cls] = STATUS_LABEL[p.status] || ["", ""];
    $("#mMedia").textContent = p.emoji;
    $("#mCat").textContent = CATEGORIES[p.category] || "";
    $("#mTitle").textContent = p.name;
    $("#mPrice").textContent = rupiah(p.price);
    $("#mStatus").innerHTML = `<span class="${cls}" style="padding:3px 10px;border-radius:999px;">${label}</span>`;
    $("#mDesc").textContent = p.desc;
    $("#mQty").value = 1;
    $("#detailModal").hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeDetail() {
    $("#detailModal").hidden = true;
    document.body.style.overflow = "";
  }

  /* ---------- Keranjang ---------- */
  function addToCart(id, qty) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const existing = cart.find((c) => c.id === id);
    if (existing) existing.qty += qty;
    else cart.push({ id: p.id, name: p.name, price: p.price, emoji: p.emoji, qty });
    saveCart();
    renderCart();
  }

  function cartTotal() {
    return cart.reduce((s, c) => s + c.price * c.qty, 0);
  }

  function renderCart() {
    $("#cartCount").textContent = cart.reduce((s, c) => s + c.qty, 0);
    const box = $("#cartItems");
    if (!cart.length) {
      box.innerHTML = `<p class="cart-empty">Keranjang masih kosong.<br>Yuk jelajahi katalog kami 🎯</p>`;
    } else {
      box.innerHTML = cart
        .map(
          (c) => `
        <div class="cart-item">
          <div class="ci-thumb">${c.emoji}</div>
          <div>
            <p class="ci-name">${c.name}</p>
            <p class="ci-meta">${rupiah(c.price)} × ${c.qty}</p>
          </div>
          <div class="ci-right">
            <span class="ci-price">${rupiah(c.price * c.qty)}</span>
            <button class="ci-remove" data-remove="${c.id}">Hapus</button>
          </div>
        </div>`
        )
        .join("");
    }
    $("#cartTotal").textContent = rupiah(cartTotal());
  }

  function openCart() {
    $("#cartDrawer").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    $("#cartDrawer").hidden = true;
    document.body.style.overflow = "";
  }

  function checkoutWa() {
    if (!cart.length) return;
    let msg =
      "Halo admin " + STORE_CONFIG.storeName + ", saya mau checkout pesanan berikut:\n\n";
    cart.forEach((c, i) => {
      msg += `${i + 1}. *${c.name}* — ${c.qty} pcs — ${rupiah(c.price * c.qty)}\n`;
    });
    msg += `\n*Total: ${rupiah(cartTotal())}*\n\nMohon info ketersediaan & total termasuk ongkir. Terima kasih 🙏`;
    window.open(waLink(msg), "_blank");
  }

  /* ---------- Events ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderGrid();
    renderCart();
    $("#year").textContent = new Date().getFullYear();

    // Set href semua tombol WA statis
    document.querySelectorAll("[data-wa-msg]").forEach((el) => {
      el.setAttribute("href", waLink(el.dataset.waMsg));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });

    // Pencarian & filter
    $("#searchInput").addEventListener("input", (e) => {
      searchTerm = e.target.value;
      renderGrid();
    });
    $("#categoryChips").addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeCategory = chip.dataset.cat;
      renderGrid();
    });

    // Klik kartu produk (delegasi)
    $("#productGrid").addEventListener("click", (e) => {
      const media = e.target.closest(".product-media");
      const name = e.target.closest(".product-name");
      const add = e.target.closest("[data-add]");
      if (add) {
        addToCart(Number(add.dataset.add), 1);
        add.textContent = "✓ Ditambah";
        setTimeout(() => (add.textContent = "+ Keranjang"), 900);
        return;
      }
      const target = media || name;
      if (target) openDetail(Number(target.dataset.id));
    });

    // Modal
    $("#modalClose").addEventListener("click", closeDetail);
    $("#detailModal").addEventListener("click", (e) => {
      if (e.target === $("#detailModal")) closeDetail();
    });
    $("#qtyMinus").addEventListener("click", () => {
      const i = $("#mQty");
      i.value = Math.max(1, Number(i.value) - 1);
    });
    $("#qtyPlus").addEventListener("click", () => {
      const i = $("#mQty");
      i.value = Math.min(99, Number(i.value) + 1);
    });
    $("#mAddCart").addEventListener("click", () => {
      if (!currentProduct) return;
      addToCart(currentProduct.id, Math.max(1, Number($("#mQty").value)));
      closeDetail();
      openCart();
    });
    $("#mBuyWa").addEventListener("click", () => {
      if (!currentProduct) return;
      const qty = Math.max(1, Number($("#mQty").value));
      const msg =
        "Halo admin " + STORE_CONFIG.storeName + ", saya ingin memesan:\n\n🛒 *" +
        currentProduct.name + "*\n🔢 Jumlah: " + qty +
        "\n💰 Estimasi: " + rupiah(currentProduct.price * qty) +
        "\n\nMohon konfirmasi ketersediaan. Terima kasih 🙏";
      window.open(waLink(msg), "_blank");
    });

    // Keranjang drawer
    $("#cartBtn").addEventListener("click", openCart);
    $("#cartClose").addEventListener("click", closeCart);
    $("#cartDrawer").addEventListener("click", (e) => {
      if (e.target === $("#cartDrawer")) closeCart();
    });
    $("#cartItems").addEventListener("click", (e) => {
      const rm = e.target.closest("[data-remove]");
      if (!rm) return;
      cart = cart.filter((c) => c.id !== Number(rm.dataset.remove));
      saveCart();
      renderCart();
    });
    $("#clearCart").addEventListener("click", () => {
      cart = [];
      saveCart();
      renderCart();
    });
    $("#checkoutWa").addEventListener("click", checkoutWa);

    // Mobile nav
    $("#navToggle").addEventListener("click", () => {
      $("#mainNav").classList.toggle("open");
      $("#navToggle").classList.toggle("open");
    });
    $("#mainNav").addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        $("#mainNav").classList.remove("open");
        $("#navToggle").classList.remove("open");
      }
    });

    // Esc menutup overlay
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDetail();
        closeCart();
      }
    });
  });
})();
