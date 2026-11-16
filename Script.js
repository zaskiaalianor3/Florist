function handleLogin(event) {
    event.preventDefault();
    const user = document.getElementById('login-user').value;
    document.getElementById('current-user-name').innerText = user.toUpperCase() === 'OWNER' ? 'Pemilik Toko' : 'Indah Permata';
    
    // Sembunyikan halaman login, tampilkan aplikasi utama
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('sidebar-container').classList.remove('hidden');
    document.getElementById('main-app-content').classList.remove('hidden');
}

function handleLogout() {
    document.getElementById('login-page').classList.remove('hidden');
    document.getElementById('sidebar-container').classList.add('hidden');
    document.getElementById('main-app-content').classList.add('hidden');
}

function switchTab(tabName) {
    const tabs = ['dashboard', 'kasir', 'inventori', 'rusak', 'pelanggan', 'laporan'];
    tabs.forEach(t => {
        const el = document.getElementById(`tab-content-${t}`);
        if(el) el.classList.add('hidden');
        const nav = document.getElementById(`nav-${t}`);
        if(nav) {
            nav.classList.remove('bg-emerald-50', 'text-emerald-800');
            nav.classList.add('text-gray-600', 'hover:bg-gray-50');
        }
    });

    const activeEl = document.getElementById(`tab-content-${tabName}`);
    if(activeEl) activeEl.classList.remove('hidden');
    const activeNav = document.getElementById(`nav-${tabName}`);
    if(activeNav) {
        activeNav.classList.remove('text-gray-600', 'hover:bg-gray-50');
        activeNav.classList.add('bg-emerald-50', 'text-emerald-800');
    }
}

// Jam Live
setInterval(() => {
    const d = new Date();
    const timeStr = d.toTimeString().split(' ')[0] + ' WIB';
    const clockEl = document.getElementById('live-clock');
    if(clockEl) clockEl.innerText = timeStr;
}, 1000);

let cart = [];
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if(cart.length === 0) {
        container.innerHTML = '<p>Belum ada produk dipilih.</p>';
        totalEl.innerText = 'Rp 0';
        return;
    }
    let html = '';
    let total = 0;
    cart.forEach((item, idx) => {
        total += item.price;
        html += `<div class="flex justify-between items-center"><span>${item.name}</span><span class="font-bold">Rp ${item.price.toLocaleString()}</span></div>`;
    });
    container.innerHTML = html;
    totalEl.innerText = `Rp ${total.toLocaleString()}`;
}

function checkout() {
    if(cart.length === 0) {
        alert('Keranjang masih kosong!');
        return;
    }
    alert('Pembayaran berhasil diproses!');
    cart = [];
    updateCartUI();
    switchTab('dashboard');
}

function closeReceipt() {
    document.getElementById('struk-modal').classList.add('hidden');
}