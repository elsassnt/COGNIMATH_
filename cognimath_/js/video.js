/* ============================================================
   video.js — Video YouTube (In-App) + Video Lokal (Upload)
   ============================================================ */

let playerYT     = null;
let ytAPIsiap    = false;
let videoAntrian = null;
let videoLokal   = [];
let _videoAktif  = null;  // Data video yang sedang diputar

/* ─── YouTube IFrame API Callback ────────────────────────── */
function onYouTubeIframeAPIReady() {
  ytAPIsiap = true;
  if (videoAntrian) { _buatPlayerYT(videoAntrian); videoAntrian = null; }
}

/* ─── RENDER HALAMAN VIDEO ────────────────────────────────── */
function renderHalamanVideo(filter = 'semua') {
  const cont = document.getElementById('container-video');
  const prog = window.progressAktif || { video: [] };

  if (filter === 'lokal') {
    _renderVideoLokal(); return;
  }

  let list;
  if      (filter === 'favorit')  list = semuaVideo.filter(v => v.favorit);
  else if (filter === 'semua')    list = semuaVideo;
  else                            list = semuaVideo.filter(v => v.kategori === filter);

  if (!list.length) {
    cont.innerHTML = `
      <div class="status-kosong">
        <div class="ikon-kosong">${filter==='favorit'?'💔':'🎬'}</div>
        <h3>${filter==='favorit'?'Belum ada favorit':'Belum ada video'}</h3>
        <p>${filter==='favorit'?'Tekan ❤️ pada kartu video untuk menambahkan ke favorit.':'Video belum tersedia.'}</p>
      </div>`;
    return;
  }

  cont.innerHTML = `<div class="grid-video">${list.map(v => `
    <div class="kartu-video">
      <div class="thumb-video" style="cursor:pointer;position:relative;overflow:hidden" onclick="putarVideo(${v.id})">
        <img
          src="https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg"
          alt="${v.judul}"
          style="width:100%;height:100%;object-fit:cover;display:block"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        >
        <!-- Fallback thumbnail -->
        <div style="display:none;width:100%;height:100%;background:linear-gradient(135deg,${v.warnaKategori},${v.warnaKategori}99);align-items:center;justify-content:center;flex-direction:column;gap:8px;color:white;font-weight:700;text-align:center;padding:16px;position:absolute;inset:0">
          <span style="font-size:32px">🎬</span>
          <span style="font-size:12px">${v.judul}</span>
        </div>
        <div class="thumb-overlay"></div>
        <div class="btn-play-tengah">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="lbl-durasi">${v.durasi}</div>
        <div style="position:absolute;bottom:8px;left:8px;background:${v.warnaKategori};color:white;font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px">
          ${v.kategori.toUpperCase()}
        </div>
        ${prog.video.includes(v.id) ? `<div style="position:absolute;top:8px;left:8px;background:rgba(46,125,50,.85);color:white;font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px">✓ Ditonton</div>` : ''}
        <button class="btn-favorit-video ${v.favorit?'aktif':''}"
          onclick="event.stopPropagation();toggleFavorit(${v.id})"
          title="${v.favorit?'Hapus favorit':'Tambah favorit'}">${v.favorit?'❤️':'🤍'}</button>
      </div>
      <div class="info-video">
        <div>
          <h4 style="cursor:pointer" onclick="putarVideo(${v.id})">${v.judul}</h4>
          <p>${v.deskripsi}</p>
        </div>
        <div class="meta-video" style="margin-top:10px">
          <span style="font-size:11px;color:var(--abu)">⏱ ${v.durasi}</span>
          <button class="btn btn-utama btn-kecil" onclick="putarVideo(${v.id})">▶ Tonton</button>
        </div>
      </div>
    </div>`).join('')}</div>`;
}

/* ─── TOGGLE FAVORIT ──────────────────────────────────────── */
function toggleFavorit(id) {
  const v = semuaVideo.find(x => x.id === id);
  if (!v) return;
  v.favorit = !v.favorit;
  const tabAktif = document.querySelector('[data-filter].aktif');
  renderHalamanVideo(tabAktif ? tabAktif.dataset.filter : 'semua');
  tampilkanNotif(v.favorit ? `❤️ Ditambahkan ke favorit!` : `Dihapus dari favorit.`, v.favorit?'❤️':'💔');
}

/* ─── PUTAR VIDEO YOUTUBE ─────────────────────────────────── */
function putarVideo(id) {
  const v = semuaVideo.find(x => x.id === id);
  if (!v) return;
  _videoAktif = v;
  window._ytAktifId = v.youtubeId;

  document.getElementById('judul-player').textContent = v.judul;
  document.getElementById('sub-player').textContent   = `${v.kategori.toUpperCase()} · ${v.durasi}`;
  document.getElementById('overlay-video').classList.add('terbuka');
  document.body.style.overflow = 'hidden';

  if (ytAPIsiap) _buatPlayerYT(v.youtubeId);
  else {
    videoAntrian = v.youtubeId;
    document.getElementById('wadah-player').innerHTML = `
      <div style="width:100%;height:100%;background:#111;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;color:rgba(255,255,255,.6)">
        <div style="width:40px;height:40px;border:3px solid rgba(255,255,255,.2);border-top-color:#fff;border-radius:50%;animation:putar 1s linear infinite"></div>
        <p style="font-size:13px">Memuat player...</p>
      </div>
      <style>@keyframes putar{to{transform:rotate(360deg)}}</style>`;
  }

  // Catat ke database (tandai sudah ditonton)
  if (typeof tandaiVideoSelesai === 'function') {
    tandaiVideoSelesai(v.id, v.judul);
  }
}

/* ─── BUAT PLAYER YOUTUBE ─────────────────────────────────── */
function _buatPlayerYT(youtubeId) {
  if (playerYT) { try { playerYT.destroy(); } catch(e){} playerYT = null; }
  document.getElementById('wadah-player').innerHTML = '<div id="yt-player"></div>';

  playerYT = new YT.Player('yt-player', {
    videoId: youtubeId,
    playerVars: { autoplay:1, rel:0, modestbranding:1, fs:1, hl:'id' },
    width: '100%', height: '100%',
    events: {
      onReady: e => e.target.playVideo(),
      onError: () => {
        document.getElementById('wadah-player').innerHTML = `
          <div style="width:100%;height:100%;background:#1a1a2a;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;color:rgba(255,255,255,.7);text-align:center;padding:24px">
            <span style="font-size:48px">😔</span>
            <p style="font-size:15px;font-weight:600">Video tidak dapat diputar</p>
            <p style="font-size:12px;opacity:.7">Pemilik video menonaktifkan pemutaran di luar YouTube.</p>
            <button onclick="window.open('https://www.youtube.com/watch?v=${youtubeId}','_blank')"
              style="margin-top:8px;padding:10px 20px;background:var(--biru);color:white;border:none;border-radius:8px;font-size:13px;cursor:pointer">
              🔗 Buka di YouTube
            </button>
          </div>`;
      }
    }
  });
}

/* ─── TUTUP VIDEO ─────────────────────────────────────────── */
function tutupVideo() {
  if (playerYT) { try { playerYT.stopVideo(); playerYT.destroy(); } catch(e){} playerYT = null; }
  document.getElementById('wadah-player').innerHTML = '<div id="yt-player"></div>';
  document.getElementById('overlay-video').classList.remove('terbuka');
  document.body.style.overflow = '';
  _videoAktif = null;
  window._ytAktifId = null;
}

/* ─── VIDEO LOKAL (Upload dari perangkat) ─────────────────── */
function uploadVideoLokal(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('video/')) {
    tampilkanNotif('File harus berupa video (MP4, WebM, dll)!', '⚠️'); return;
  }
  if (file.size > 500 * 1024 * 1024) {
    tampilkanNotif('Ukuran file terlalu besar! Maks 500MB.', '⚠️'); return;
  }
  const url     = URL.createObjectURL(file);
  const ukuranMB= (file.size / (1024*1024)).toFixed(1);
  videoLokal.push({
    id:    'lokal-' + Date.now(),
    judul: file.name.replace(/\.[^/.]+$/, ''),
    desc:  `${ukuranMB} MB · ${file.type}`,
    url,
  });
  event.target.value = '';
  tampilkanNotif(`"${file.name}" berhasil diunggah!`, '📁');
  // Pindah ke tab lokal
  document.querySelectorAll('#tab-video .tab-item').forEach(t => t.classList.remove('aktif'));
  const tabLokal = document.querySelector('[data-filter="lokal"]');
  if (tabLokal) tabLokal.classList.add('aktif');
  _renderVideoLokal();
}

function _renderVideoLokal() {
  const cont = document.getElementById('container-video');
  if (!videoLokal.length) {
    cont.innerHTML = `
      <div class="status-kosong">
        <div class="ikon-kosong">📁</div>
        <h3>Belum ada video lokal</h3>
        <p>Klik tombol <strong>"📁 Upload Video Lokal"</strong> di atas untuk menambahkan video dari perangkatmu.</p>
        <button class="btn btn-utama" style="margin-top:16px" onclick="document.getElementById('input-video-lokal').click()">📁 Pilih Video</button>
      </div>`;
    return;
  }
  cont.innerHTML = `<div class="grid-video">${videoLokal.map(v => `
    <div class="kartu-video">
      <div class="thumb-video" style="cursor:pointer;background:linear-gradient(135deg,#1565C0,#0D47A1);position:relative"
           onclick="putarVideoLokal('${v.id}')">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;color:white;position:relative;z-index:1">
          <span style="font-size:40px">🎬</span>
          <span style="font-size:12px;font-weight:600;text-align:center;padding:0 12px;line-height:1.4">${v.judul}</span>
        </div>
        <div class="thumb-overlay"></div>
        <div class="btn-play-tengah">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div style="position:absolute;bottom:8px;left:8px;background:rgba(0,0,0,.6);color:white;font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px">
          📁 LOKAL
        </div>
        <button onclick="event.stopPropagation();hapusVideoLokal('${v.id}')"
          style="position:absolute;top:8px;right:8px;width:34px;height:34px;background:rgba(220,50,50,.6);border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;color:white"
          title="Hapus video">🗑️</button>
      </div>
      <div class="info-video">
        <div>
          <h4 style="cursor:pointer" onclick="putarVideoLokal('${v.id}')">${v.judul}</h4>
          <p>${v.desc}</p>
        </div>
        <div class="meta-video" style="margin-top:10px">
          <span class="badge badge-biru">📁 Lokal</span>
          <button class="btn btn-utama btn-kecil" onclick="putarVideoLokal('${v.id}')">▶ Putar</button>
        </div>
      </div>
    </div>`).join('')}</div>`;
}

function putarVideoLokal(id) {
  const v = videoLokal.find(x => x.id === id);
  if (!v) return;

  // Hancurkan YouTube player dulu jika ada
  if (playerYT) { try { playerYT.destroy(); } catch(e){} playerYT = null; }

  document.getElementById('judul-player').textContent = v.judul;
  document.getElementById('sub-player').textContent   = 'Video Lokal · ' + v.desc;
  document.getElementById('wadah-player').innerHTML   = `
    <video id="player-lokal" src="${v.url}" controls autoplay
      style="width:100%;height:100%;background:#000;display:block">
      Browser-mu tidak mendukung pemutaran video.
    </video>`;

  document.getElementById('overlay-video').classList.add('terbuka');
  document.body.style.overflow = 'hidden';
}

function hapusVideoLokal(id) {
  const v = videoLokal.find(x => x.id === id);
  if (!v || !confirm(`Hapus video "${v.judul}"?`)) return;
  URL.revokeObjectURL(v.url);
  videoLokal = videoLokal.filter(x => x.id !== id);
  _renderVideoLokal();
  tampilkanNotif('Video dihapus dari daftar.', '🗑️');
}
