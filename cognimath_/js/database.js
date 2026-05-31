/* ============================================================
   database.js — Sistem Database IndexedDB CogniMath
   
   IndexedDB = database bawaan browser, data PERMANEN tersimpan
   di perangkat pengguna (tidak hilang saat browser ditutup).
   
   Struktur database:
   ├── tabel: pengguna      → data akun (username, email, password hash, foto, dll)
   ├── tabel: sesi          → token login aktif
   ├── tabel: nilai_kuis    → rekap nilai per kuis per pengguna
   ├── tabel: riwayat       → semua aktivitas belajar
   └── tabel: progress      → materi & video yang sudah diselesaikan
   ============================================================ */

const DB_NAMA    = 'CogniMathDB';
const DB_VERSI  = 1;

let _db = null; // Koneksi database

/* ──────────────────────────────────────────────────────────────
   INISIALISASI DATABASE
   Buka/buat database. Dipanggil sekali saat aplikasi dimuat.
────────────────────────────────────────────────────────────── */
function bukaDatabase() {
  return new Promise((resolve, reject) => {
    if (_db) { resolve(_db); return; }

    const req = indexedDB.open(DB_NAMA, DB_VERSI);

    // Dipanggil saat pertama kali / upgrade versi database
    req.onupgradeneeded = (e) => {
      const db = e.target.result;

      // ── Tabel PENGGUNA ──
      if (!db.objectStoreNames.contains('pengguna')) {
        const store = db.createObjectStore('pengguna', { keyPath: 'id', autoIncrement: true });
        store.createIndex('email',    'email',    { unique: true });
        store.createIndex('username', 'username', { unique: true });
      }

      // ── Tabel SESI ──
      if (!db.objectStoreNames.contains('sesi')) {
        const store = db.createObjectStore('sesi', { keyPath: 'token' });
        store.createIndex('penggunaId', 'penggunaId', { unique: false });
      }

      // ── Tabel NILAI KUIS ──
      if (!db.objectStoreNames.contains('nilai_kuis')) {
        const store = db.createObjectStore('nilai_kuis', { keyPath: 'id', autoIncrement: true });
        store.createIndex('penggunaId_kuisId', ['penggunaId','kuisId'], { unique: false });
        store.createIndex('penggunaId', 'penggunaId', { unique: false });
      }

      // ── Tabel RIWAYAT ──
      if (!db.objectStoreNames.contains('riwayat')) {
        const store = db.createObjectStore('riwayat', { keyPath: 'id', autoIncrement: true });
        store.createIndex('penggunaId', 'penggunaId', { unique: false });
      }

      // ── Tabel PROGRESS ──
      if (!db.objectStoreNames.contains('progress')) {
        const store = db.createObjectStore('progress', { keyPath: 'id', autoIncrement: true });
        store.createIndex('penggunaId_tipe_itemId', ['penggunaId','tipe','itemId'], { unique: true });
        store.createIndex('penggunaId', 'penggunaId', { unique: false });
      }
    };

    req.onsuccess = (e) => { _db = e.target.result; resolve(_db); };
    req.onerror   = (e) => reject(e.target.error);
  });
}

/* ──────────────────────────────────────────────────────────────
   HELPER: Jalankan transaksi database
────────────────────────────────────────────────────────────── */
function transaksi(tabel, mode, fn) {
  return bukaDatabase().then(db => {
    return new Promise((resolve, reject) => {
      const tx    = db.transaction(tabel, mode);
      const store = Array.isArray(tabel)
        ? tabel.reduce((acc, t) => { acc[t] = tx.objectStore(t); return acc; }, {})
        : tx.objectStore(tabel);
      const req = fn(store, tx);
      if (req && typeof req.onsuccess === 'undefined' && req instanceof Promise) {
        req.then(resolve).catch(reject);
      } else if (req) {
        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror   = (e) => reject(e.target.error);
      } else {
        tx.oncomplete = () => resolve(true);
        tx.onerror    = (e) => reject(e.target.error);
      }
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   ── FUNGSI AKUN & AUTENTIKASI ──
══════════════════════════════════════════════════════════════ */

/* ── Hash password sederhana (sha256-like via Web Crypto API) ─ */
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data    = encoder.encode(password + 'cognimath_salt_2026');
  const hash    = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
}

/* ── Generate token sesi ── */
function generateToken() {
  return 'cm_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);
}

/* ── Daftar Akun Baru ── */
async function daftarAkun({ nama, username, email, password, jurusan = '', semester = '' }) {
  // Validasi
  if (!nama || !username || !email || !password) throw new Error('Semua kolom wajib diisi!');
  if (password.length < 6) throw new Error('Password minimal 6 karakter!');
  if (!email.includes('@')) throw new Error('Format email tidak valid!');

  const passHash = await hashPassword(password);
  const db = await bukaDatabase();

  return new Promise((resolve, reject) => {
    const tx    = db.transaction('pengguna', 'readwrite');
    const store = tx.objectStore('pengguna');

    // Cek apakah email sudah ada
    const cekEmail = store.index('email').get(email.toLowerCase());
    cekEmail.onsuccess = () => {
      if (cekEmail.result) { reject(new Error('Email sudah terdaftar!')); return; }

      // Cek apakah username sudah ada
      const cekUser = store.index('username').get(username.toLowerCase());
      cekUser.onsuccess = () => {
        if (cekUser.result) { reject(new Error('Username sudah dipakai!')); return; }

        // Simpan pengguna baru
        const pengguna = {
          nama,
          username:  username.toLowerCase(),
          email:     email.toLowerCase(),
          passHash,
          jurusan,
          semester,
          bio:       '',
          foto:      null,
          notifikasi: true,
          tanggalDaftar: new Date().toISOString(),
        };

        const tambah = store.add(pengguna);
        tambah.onsuccess = (e) => resolve({ ...pengguna, id: e.target.result });
        tambah.onerror   = (e) => reject(new Error('Gagal menyimpan akun: ' + e.target.error));
      };
    };
  });
}

/* ── Login ── */
async function loginAkun(emailOrUsername, password) {
  const passHash = await hashPassword(password);
  const db       = await bukaDatabase();

  return new Promise((resolve, reject) => {
    const tx    = db.transaction(['pengguna', 'sesi'], 'readwrite');
    const storePengguna = tx.objectStore('pengguna');
    const storeSesi     = tx.objectStore('sesi');

    // Cari berdasarkan email dulu
    const input = emailOrUsername.toLowerCase();
    const cekEmail = storePengguna.index('email').get(input);

    cekEmail.onsuccess = () => {
      const pengguna = cekEmail.result;

      const lanjutLogin = (p) => {
        if (!p) { reject(new Error('Akun tidak ditemukan!')); return; }
        if (p.passHash !== passHash) { reject(new Error('Password salah!')); return; }

        // Buat token sesi
        const token = generateToken();
        const sesi  = {
          token,
          penggunaId: p.id,
          waktuLogin: new Date().toISOString(),
          kadaluarsa: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 hari
        };

        const simpanSesi = storeSesi.add(sesi);
        simpanSesi.onsuccess = () => {
          // Simpan token di localStorage (permanen antar sesi browser)
          localStorage.setItem('cognimath_token', token);
          localStorage.setItem('cognimath_uid',   p.id);
          resolve({ pengguna: p, token });
        };
        simpanSesi.onerror = (e) => reject(new Error('Gagal membuat sesi: ' + e.target.error));
      };

      if (pengguna) {
        lanjutLogin(pengguna);
      } else {
        // Coba cari berdasarkan username
        const cekUser = storePengguna.index('username').get(input);
        cekUser.onsuccess = () => lanjutLogin(cekUser.result);
        cekUser.onerror   = (e) => reject(e.target.error);
      }
    };
    cekEmail.onerror = (e) => reject(e.target.error);
  });
}

/* ── Logout ── */
async function logoutAkun() {
  const token = localStorage.getItem('cognimath_token');
  if (token) {
    try {
      const db  = await bukaDatabase();
      const tx  = db.transaction('sesi', 'readwrite');
      tx.objectStore('sesi').delete(token);
    } catch(e) {}
    localStorage.removeItem('cognimath_token');
    localStorage.removeItem('cognimath_uid');
  }
  window.location.href = 'login.html';
}

/* ── Cek sesi aktif ── */
async function cekSesiAktif() {
  const token = localStorage.getItem('cognimath_token');
  if (!token) return null;

  const db = await bukaDatabase();
  return new Promise((resolve) => {
    const req = db.transaction('sesi', 'readonly').objectStore('sesi').get(token);
    req.onsuccess = () => {
      const sesi = req.result;
      if (!sesi) { localStorage.removeItem('cognimath_token'); resolve(null); return; }
      if (new Date(sesi.kadaluarsa) < new Date()) {
        db.transaction('sesi', 'readwrite').objectStore('sesi').delete(token);
        localStorage.removeItem('cognimath_token');
        resolve(null); return;
      }
      resolve(sesi);
    };
    req.onerror = () => resolve(null);
  });
}

/* ── Ambil data pengguna dari ID ── */
async function getPengguna(id) {
  const db = await bukaDatabase();
  return new Promise((resolve, reject) => {
    const req = db.transaction('pengguna', 'readonly').objectStore('pengguna').get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror   = (e) => reject(e.target.error);
  });
}

/* ── Update profil pengguna ── */
async function updateProfil(id, data) {
  const db = await bukaDatabase();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction('pengguna', 'readwrite');
    const store = tx.objectStore('pengguna');
    const get   = store.get(id);
    get.onsuccess = () => {
      const pengguna = get.result;
      if (!pengguna) { reject(new Error('Pengguna tidak ditemukan')); return; }
      const updated = { ...pengguna, ...data };
      const put = store.put(updated);
      put.onsuccess = () => resolve(updated);
      put.onerror   = (e) => reject(e.target.error);
    };
  });
}

/* ── Ubah password ── */
async function ubahPassword(id, passwordLama, passwordBaru) {
  const pengguna = await getPengguna(id);
  if (!pengguna) throw new Error('Pengguna tidak ditemukan');

  const hashLama = await hashPassword(passwordLama);
  if (pengguna.passHash !== hashLama) throw new Error('Password lama salah!');
  if (passwordBaru.length < 6) throw new Error('Password baru minimal 6 karakter!');

  const hashBaru = await hashPassword(passwordBaru);
  await updateProfil(id, { passHash: hashBaru });
}

/* ══════════════════════════════════════════════════════════════
   ── FUNGSI NILAI KUIS ──
══════════════════════════════════════════════════════════════ */

async function simpanNilaiKuis(penggunaId, kuisId, nilai, detailJawaban = []) {
  const db = await bukaDatabase();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction('nilai_kuis', 'readwrite');
    const store = tx.objectStore('nilai_kuis');

    // Cek apakah sudah ada nilai sebelumnya untuk kuis ini
    const cek = store.index('penggunaId_kuisId').getAll([penggunaId, kuisId]);
    cek.onsuccess = () => {
      const existing = cek.result;

      const data = {
        penggunaId,
        kuisId,
        nilai,
        detailJawaban,  // array true/false per soal
        waktu: new Date().toISOString(),
        percobaan: existing.length + 1,
      };

      const tambah = store.add(data);
      tambah.onsuccess = (e) => resolve({ ...data, id: e.target.result });
      tambah.onerror   = (e) => reject(e.target.error);
    };
  });
}

async function getNilaiKuis(penggunaId) {
  // Kembalikan nilai TERBAIK per kuis
  const db = await bukaDatabase();
  return new Promise((resolve, reject) => {
    const req = db.transaction('nilai_kuis', 'readonly')
      .objectStore('nilai_kuis')
      .index('penggunaId')
      .getAll(penggunaId);

    req.onsuccess = () => {
      const semua = req.result;
      // Grup per kuisId, ambil nilai tertinggi
      const hasilTerbaik = {};
      semua.forEach(r => {
        if (!hasilTerbaik[r.kuisId] || r.nilai > hasilTerbaik[r.kuisId].nilai) {
          hasilTerbaik[r.kuisId] = r;
        }
      });
      resolve(hasilTerbaik);
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

/* ══════════════════════════════════════════════════════════════
   ── FUNGSI RIWAYAT ──
══════════════════════════════════════════════════════════════ */

async function tambahRiwayatDB(penggunaId, item) {
  const db = await bukaDatabase();
  return new Promise((resolve, reject) => {
    const data = { penggunaId, ...item, waktu: new Date().toISOString() };
    const req  = db.transaction('riwayat', 'readwrite').objectStore('riwayat').add(data);
    req.onsuccess = (e) => resolve({ ...data, id: e.target.result });
    req.onerror   = (e) => reject(e.target.error);
  });
}

async function getRiwayatDB(penggunaId, limit = 50) {
  const db = await bukaDatabase();
  return new Promise((resolve, reject) => {
    const req = db.transaction('riwayat', 'readonly')
      .objectStore('riwayat')
      .index('penggunaId')
      .getAll(penggunaId);

    req.onsuccess = () => {
      // Urutkan terbaru dulu, ambil limit teratas
      const sorted = req.result
        .sort((a, b) => new Date(b.waktu) - new Date(a.waktu))
        .slice(0, limit);
      resolve(sorted);
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

async function hapusSemuaRiwayat(penggunaId) {
  const db = await bukaDatabase();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(['riwayat', 'nilai_kuis', 'progress'], 'readwrite');

    // Hapus riwayat
    const riwayatReq = tx.objectStore('riwayat').index('penggunaId').getAll(penggunaId);
    riwayatReq.onsuccess = () => {
      riwayatReq.result.forEach(r => tx.objectStore('riwayat').delete(r.id));
    };

    // Hapus nilai kuis
    const nilaiReq = tx.objectStore('nilai_kuis').index('penggunaId').getAll(penggunaId);
    nilaiReq.onsuccess = () => {
      nilaiReq.result.forEach(r => tx.objectStore('nilai_kuis').delete(r.id));
    };

    // Hapus progress
    const progReq = tx.objectStore('progress').index('penggunaId').getAll(penggunaId);
    progReq.onsuccess = () => {
      progReq.result.forEach(r => tx.objectStore('progress').delete(r.id));
    };

    tx.oncomplete = () => resolve(true);
    tx.onerror    = (e) => reject(e.target.error);
  });
}

/* ══════════════════════════════════════════════════════════════
   ── FUNGSI PROGRESS ──
══════════════════════════════════════════════════════════════ */

async function tandaiSelesai(penggunaId, tipe, itemId) {
  // tipe: 'materi' | 'video'
  const db = await bukaDatabase();
  return new Promise((resolve) => {
    const tx    = db.transaction('progress', 'readwrite');
    const store = tx.objectStore('progress');

    // Cek apakah sudah ada
    const cek = store.index('penggunaId_tipe_itemId').get([penggunaId, tipe, itemId]);
    cek.onsuccess = () => {
      if (cek.result) { resolve(cek.result); return; } // Sudah ada, skip
      const data = { penggunaId, tipe, itemId, waktu: new Date().toISOString() };
      const tambah = store.add(data);
      tambah.onsuccess = (e) => resolve({ ...data, id: e.target.result });
      tambah.onerror   = () => resolve(null);
    };
  });
}

async function getProgress(penggunaId) {
  const db = await bukaDatabase();
  return new Promise((resolve, reject) => {
    const req = db.transaction('progress', 'readonly')
      .objectStore('progress')
      .index('penggunaId')
      .getAll(penggunaId);

    req.onsuccess = () => {
      const materi = req.result.filter(p => p.tipe === 'materi').map(p => p.itemId);
      const video  = req.result.filter(p => p.tipe === 'video').map(p => p.itemId);
      resolve({ materi, video });
    };
    req.onerror = (e) => reject(e.target.error);
  });
}

/* ══════════════════════════════════════════════════════════════
   ── STATE GLOBAL PENGGUNA AKTIF ──
   Diisi setelah login berhasil, dipakai di seluruh halaman
══════════════════════════════════════════════════════════════ */
window.penggunaAktif = null;   // Data pengguna yang sedang login
window.progressAktif = null;   // { materi: [], video: [] }
window.nilaiKuisAktif = {};    // { kuisId: { nilai, percobaan } }

/* ── Muat semua data pengguna setelah login ── */
async function muatDataPengguna(penggunaId) {
  const [pengguna, progress, nilaiKuis] = await Promise.all([
    getPengguna(penggunaId),
    getProgress(penggunaId),
    getNilaiKuis(penggunaId),
  ]);

  window.penggunaAktif  = pengguna;
  window.progressAktif  = progress;
  window.nilaiKuisAktif = nilaiKuis;

  // Update nilai kuis di array data
  semuaKuis.forEach(k => {
    k.nilai = nilaiKuis[k.id] ? nilaiKuis[k.id].nilai : null;
  });

  return { pengguna, progress, nilaiKuis };
}

/* ── Cek & proteksi halaman (redirect ke login jika belum login) ── */
async function proteksiHalaman() {
  const sesi = await cekSesiAktif();
  if (!sesi) {
    window.location.href = 'login.html';
    return false;
  }

  const uid = parseInt(localStorage.getItem('cognimath_uid'));
  await muatDataPengguna(uid);

  // Update avatar & nama di bar atas
  _updateUISetelahLogin();
  return true;
}

function _updateUISetelahLogin() {
  const p = window.penggunaAktif;
  if (!p) return;
  const inisial = p.nama.split(' ').map(w => w[0]).slice(0,1).join('').toUpperCase();
  const avatarEl = document.getElementById('avatar-atas');
  if (!avatarEl) return;
  if (p.foto) {
    avatarEl.innerHTML = `<img src="${p.foto}" alt="foto" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
  } else {
    avatarEl.textContent = inisial;
  }
}

/* ── Inisialisasi database saat aplikasi dimuat ── */
bukaDatabase().catch(e => console.warn('IndexedDB tidak tersedia:', e));
