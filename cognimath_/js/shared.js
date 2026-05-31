/* ============================================================
   shared.js — Fungsi bersama yang dipakai di SEMUA halaman
   ============================================================ */

/* ─── NOTIFIKASI POPUP ────────────────────────────────────── */
function tampilkanNotif(pesan, ikon = '✅') {
  const el = document.getElementById('notif-popup');
  if (!el) return;
  document.getElementById('notif-teks').textContent = pesan;
  document.getElementById('notif-ikon').textContent = ikon;
  el.classList.add('tampil');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('tampil'), 3200);
}

/* ─── SIDEBAR MOBILE ──────────────────────────────────────── */
function bukaSidebar() {
  document.querySelector('.sidebar')?.classList.add('terbuka');
  document.getElementById('overlay-sidebar')?.classList.add('tampil');
}
function tutupSidebar() {
  document.querySelector('.sidebar')?.classList.remove('terbuka');
  document.getElementById('overlay-sidebar')?.classList.remove('tampil');
}

/* ─── ESCAPE KEY ──────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  document.getElementById('overlay-kuis')?.classList.remove('terbuka');
  document.getElementById('overlay-video')?.classList.remove('terbuka');
  document.getElementById('modal-edit-profil')?.classList.remove('terbuka');
  document.getElementById('modal-password')?.classList.remove('terbuka');
  document.body.style.overflow = '';
  tutupSidebar();
});

/* ─── PENCARIAN ───────────────────────────────────────────── */
function inisialisasiPencarian() {
  const inp = document.getElementById('input-cari');
  if (!inp || typeof semuaMateri === 'undefined') return;
  inp.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const q = inp.value.toLowerCase().trim();
    if (!q) return;
    const hasil = semuaMateri.find(m =>
      m.judul.toLowerCase().includes(q) || m.deskripsi.toLowerCase().includes(q)
    );
    if (hasil) {
      window.location.href = 'materi.html?id=' + hasil.id;
    } else {
      tampilkanNotif('Tidak ditemukan. Coba kata kunci lain.', '❌');
    }
    inp.value = '';
  });
}

/* ─── TANDAI SELESAI (untuk video yang ditonton) ─────────── */
async function tandaiVideoSelesai(videoId, judulVideo) {
  const uid = parseInt(localStorage.getItem('cognimath_uid'));
  if (!uid) return;
  await tandaiSelesai(uid, 'video', videoId);
  if (window.progressAktif && !window.progressAktif.video.includes(videoId)) {
    window.progressAktif.video.push(videoId);
  }
  await tambahRiwayatDB(uid, {
    tipe: 'video',
    judul: judulVideo,
    keterangan: 'Baru saja ditonton',
    nilai: null,
    ikon: '▶️',
    warnaLatar: '#F3E5F5'
  });
}
