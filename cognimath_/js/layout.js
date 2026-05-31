/* ============================================================
   layout.js — Menyuntikkan Sidebar, Bar Atas, dan Navbar Bawah
   ke setiap halaman secara otomatis (tidak perlu copy-paste HTML)
   ============================================================ */

function renderLayout(halamanAktif) {
  // ── SIDEBAR ──
  const sidebarHTML = `
  <div class="overlay-sidebar" id="overlay-sidebar" onclick="tutupSidebar()"></div>
  <aside class="sidebar">
    <a href="dashboard.html" class="sidebar-logo">
      <img src="Cognimath.png" alt="Logo CogniMath">
      <span class="app-name">COGNIMATH</span>
      <span class="app-tagline">LEARN · MATH · PRACTICE</span>
    </a>
    <nav>
      ${menuItems.map(m => `
        <a href="${m.href}" class="item-menu ${halamanAktif === m.href ? 'aktif' : ''}" data-halaman="${m.key}">
          ${m.icon}
          <span>${m.label}</span>
        </a>`).join('')}
    </nav>
    <div class="sidebar-bawah">
      <button class="btn-keluar" onclick="prosesLogout()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span>Keluar</span>
      </button>
    </div>
  </aside>`;

  // ── BAR ATAS ──
  const barAtasHTML = `
  <div class="bar-atas">
    <div class="bar-kiri">
      <button class="btn-menu-mobile" onclick="bukaSidebar()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <div class="kolom-cari">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" id="input-cari" placeholder="Cari materi, video, kuis...">
      </div>
    </div>
    <div class="bar-kanan">
      <a href="riwayat.html" class="btn-ikon" title="Riwayat Belajar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </a>
      <button class="btn-ikon" onclick="tampilkanNotif('Tidak ada notifikasi baru.','🔔')" title="Notifikasi">
        <div class="notif-titik"></div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      </button>
      <a href="profil.html" class="avatar-atas" id="avatar-atas" title="Profil Saya">U</a>
    </div>
  </div>`;

  // ── NAVBAR BAWAH (MOBILE) ──
  const navbarBawahHTML = `
  <div class="navbar-bawah">
    <div class="navbar-bawah-dalam">
      ${menuItems.filter(m => m.mobileVisible).map(m => `
        <a href="${m.href}" class="nav-item-bawah ${halamanAktif === m.href ? 'aktif' : ''}" data-halaman="${m.key}">
          ${m.icon}
          <span>${m.label}</span>
        </a>`).join('')}
    </div>
  </div>`;

  // ── NOTIFIKASI POPUP ──
  const notifHTML = `
  <div class="notif-popup" id="notif-popup">
    <span class="notif-ikon" id="notif-ikon">✅</span>
    <span class="notif-teks" id="notif-teks">Berhasil!</span>
  </div>`;

  // Suntikkan ke elemen #app-layout
  const wrap = document.getElementById('app-layout');
  if (!wrap) return;

  wrap.innerHTML = `
    ${notifHTML}
    <div class="layout-app">
      ${sidebarHTML}
      <main class="konten-utama">
        ${barAtasHTML}
        <div id="isi-halaman">
          ${document.getElementById('konten-halaman')?.innerHTML || ''}
        </div>
      </main>
      ${navbarBawahHTML}
    </div>`;
}

/* ─── DATA MENU NAVIGASI ──────────────────────────────────── */
const menuItems = [
  {
    key: 'dashboard', href: 'dashboard.html', label: 'Beranda', mobileVisible: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`
  },
  {
    key: 'materi', href: 'materi.html', label: 'Materi', mobileVisible: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
  },
  {
    key: 'video', href: 'video.html', label: 'Video', mobileVisible: false,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`
  },
  {
    key: 'kuis', href: 'kuis.html', label: 'Kuis', mobileVisible: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
  },
  {
    key: 'riwayat', href: 'riwayat.html', label: 'Riwayat', mobileVisible: false,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  },
  {
    key: 'profil', href: 'profil.html', label: 'Profil', mobileVisible: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
  },
];
