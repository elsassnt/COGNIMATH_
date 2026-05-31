/* ============================================================
   kuis.js — Halaman Kuis, Soal, Timer, Hasil
   ============================================================ */

function renderHalamanKuis(filter = 'semua') {
  const container = document.getElementById('container-kuis');
  let list;
  switch (filter) {
    case 'belum':   list = semuaKuis.filter(k => k.nilai === null); break;
    case 'selesai': list = semuaKuis.filter(k => k.nilai !== null); break;
    default:        list = semuaKuis;
  }

  if (list.length === 0) {
    container.innerHTML = `<div class="status-kosong"><div class="ikon-kosong">📝</div><h3>Belum ada kuis</h3><p>Kuis untuk kategori ini belum tersedia.</p></div>`;
    return;
  }

  container.innerHTML = `<div class="grid-kuis">${list.map(k => {
    const selesai = k.nilai !== null;
    const warnaNilai = k.nilai >= 80 ? '#2e7d32' : k.nilai >= 60 ? '#F57F17' : '#D32F2F';
    return `
    <div class="kartu-kuis ${selesai?'selesai':''}">
      <div class="header-kuis-card">
        <div class="ikon-kuis-card">${k.ikon || '📝'}</div>
        <div style="flex:1">
          <h4>${k.judul}</h4>
          <p class="sub-kuis">${k.pertanyaan.length} soal • Waktu: 15 menit</p>
        </div>
        ${selesai ? `<span class="badge ${k.nilai>=80?'badge-hijau':k.nilai>=60?'badge-oranye':'badge-merah'}">${k.nilai}/100</span>` : ''}
      </div>
      ${selesai ? `<div class="bar-nilai"><div class="isi-bar-nilai" style="width:${k.nilai}%;background:${warnaNilai}"></div></div>` : ''}
      <p style="font-size:12px;color:var(--abu);margin-bottom:14px">${k.deskripsi}</p>
      <div class="footer-kuis-card">
        ${selesai
          ? `<span class="badge badge-hijau">✓ Selesai</span><button class="btn btn-garis btn-kecil" onclick="mulaiKuis(${k.id})">🔄 Ulangi</button>`
          : `<span class="badge badge-abu">Belum dikerjakan</span><button class="btn btn-utama btn-kecil" onclick="mulaiKuis(${k.id})">Mulai →</button>`
        }
      </div>
    </div>`;
  }).join('')}</div>`;
}

/* ─── MULAI KUIS ──────────────────────────────────────────── */
function mulaiKuis(id) {
  const k = semuaKuis.find(x => x.id === id);
  if (!k) return;
  stateApp.kuisBerjalan = k;
  stateApp.indeksSoal   = 0;
  stateApp.semuaJawaban = [];
  stateApp.sisaWaktu    = 900;
  stateApp.jawabanDipilih = null;

  document.getElementById('judul-kuis-modal').textContent = k.judul;
  document.getElementById('body-kuis').innerHTML = '';
  document.getElementById('footer-kuis-modal').style.display = '';
  document.getElementById('timer-kuis').classList.remove('warning');

  tampilkanSoal();
  updateTimer();

  if (stateApp.timerKuis) clearInterval(stateApp.timerKuis);
  stateApp.timerKuis = setInterval(() => {
    stateApp.sisaWaktu--;
    updateTimer();
    if (stateApp.sisaWaktu <= 60) document.getElementById('timer-kuis').classList.add('warning');
    if (stateApp.sisaWaktu <= 0) { clearInterval(stateApp.timerKuis); tampilkanHasil(); }
  }, 1000);

  document.getElementById('overlay-kuis').classList.add('terbuka');
}

/* ─── TAMPILKAN SOAL ──────────────────────────────────────── */
function tampilkanSoal() {
  const k = stateApp.kuisBerjalan;
  const soal = k.pertanyaan[stateApp.indeksSoal];
  const total = k.pertanyaan.length;
  const persen = ((stateApp.indeksSoal + 1) / total) * 100;

  document.getElementById('counter-soal').textContent = `Soal ${stateApp.indeksSoal + 1} dari ${total}`;
  document.getElementById('isi-progress').style.width = persen + '%';

  document.getElementById('body-kuis').innerHTML = `
    <div class="progress-kuis"><div class="isi-progress" id="isi-progress" style="width:${persen}%"></div></div>
    <p class="teks-soal">${soal.soal}</p>
    <div class="list-pilihan" id="list-pilihan">
      ${soal.pilihan.map((p, i) => `
        <div class="pilihan" onclick="pilihJawaban(${i})" id="pil-${i}">
          <div class="huruf">${String.fromCharCode(65+i)}</div>
          <span>${p}</span>
        </div>
      `).join('')}
    </div>
  `;

  stateApp.jawabanDipilih = null;
  const btnLanjut = document.getElementById('btn-lanjut');
  if (btnLanjut) btnLanjut.textContent = stateApp.indeksSoal === total - 1 ? '✓ Selesai' : 'Selanjutnya →';
}

function pilihJawaban(i) {
  stateApp.jawabanDipilih = i;
  document.querySelectorAll('.pilihan').forEach(el => el.classList.remove('dipilih'));
  document.getElementById('pil-' + i)?.classList.add('dipilih');
}

function soalSelanjutnya() {
  if (stateApp.jawabanDipilih === null) {
    tampilkanNotif('Pilih salah satu jawaban dulu ya!', '⚠️'); return;
  }
  const soal = stateApp.kuisBerjalan.pertanyaan[stateApp.indeksSoal];
  const benar = stateApp.jawabanDipilih === soal.jawabanBenar;

  document.querySelectorAll('.pilihan').forEach((el, i) => {
    if (i === soal.jawabanBenar) el.classList.add('benar');
    if (i === stateApp.jawabanDipilih && !benar) el.classList.add('salah');
    el.style.pointerEvents = 'none';
  });

  stateApp.semuaJawaban.push(benar);

  setTimeout(() => {
    stateApp.indeksSoal++;
    if (stateApp.indeksSoal >= stateApp.kuisBerjalan.pertanyaan.length) tampilkanHasil();
    else tampilkanSoal();
  }, 700);
}

function soalSebelumnya() {
  if (stateApp.indeksSoal > 0) {
    stateApp.indeksSoal--;
    stateApp.semuaJawaban.pop();
    tampilkanSoal();
  }
}

/* ─── HASIL KUIS ──────────────────────────────────────────── */
function tampilkanHasil() {
  clearInterval(stateApp.timerKuis);
  const benar = stateApp.semuaJawaban.filter(Boolean).length;
  const total = stateApp.kuisBerjalan.pertanyaan.length;
  const nilai = Math.round((benar / total) * 100);

  // Simpan nilai
  const k = semuaKuis.find(x => x.id === stateApp.kuisBerjalan.id);
  if (k) k.nilai = nilai;

  // Tambah ke riwayat
  riwayatAktivitas.unshift({
    tipe:'kuis', judul:stateApp.kuisBerjalan.judul,
    keterangan:`Baru saja selesai • ${total} soal`,
    nilai, ikon:'🏆', warnaLatar:'#FFF8E1'
  });

  const emoji = nilai >= 80 ? '🏆' : nilai >= 60 ? '👍' : '💪';
  const pesan = nilai >= 80 ? 'Luar biasa! Kamu sangat hebat!' : nilai >= 60 ? 'Bagus! Terus semangat!' : 'Jangan menyerah, coba lagi!';
  const warnaPeringkat = nilai >= 80 ? '#2e7d32' : nilai >= 60 ? '#F57F17' : '#D32F2F';

  document.getElementById('body-kuis').innerHTML = `
    <div class="kotak-hasil">
      <div class="emoji-hasil">${emoji}</div>
      <h2 style="margin-bottom:6px">Kuis Selesai!</h2>
      <p style="color:var(--abu);font-size:13px;margin-bottom:20px">${pesan}</p>
      <div class="nilai-besar" style="color:${warnaPeringkat}">${nilai}<span>/100</span></div>
      <div style="width:80%;margin:16px auto;height:8px;background:var(--abu-latar);border-radius:4px;overflow:hidden">
        <div style="height:100%;width:${nilai}%;background:${warnaPeringkat};border-radius:4px;transition:width 1s ease"></div>
      </div>
      <div class="stat-hasil">
        <div class="stat-hasil-item"><div class="angka" style="color:var(--sukses)">✓ ${benar}</div><div class="lbl">Benar</div></div>
        <div class="stat-hasil-item"><div class="angka" style="color:var(--bahaya)">✗ ${total-benar}</div><div class="lbl">Salah</div></div>
        <div class="stat-hasil-item"><div class="angka" style="color:var(--biru)">${total}</div><div class="lbl">Total Soal</div></div>
      </div>
      <div class="btn-hasil">
        <button class="btn btn-utama" onclick="tutupKuis();navigasiKe('kuis')">Lihat Semua Kuis</button>
        <button class="btn btn-garis" onclick="mulaiKuis(${stateApp.kuisBerjalan.id})">🔄 Coba Lagi</button>
      </div>
    </div>
  `;
  document.getElementById('footer-kuis-modal').style.display = 'none';
}

function tutupKuis() {
  document.getElementById('overlay-kuis').classList.remove('terbuka');
  document.getElementById('footer-kuis-modal').style.display = '';
  clearInterval(stateApp.timerKuis);
}

function updateTimer() {
  const m = Math.floor(stateApp.sisaWaktu / 60).toString().padStart(2,'0');
  const s = (stateApp.sisaWaktu % 60).toString().padStart(2,'0');
  document.getElementById('timer-kuis').textContent = `${m}:${s}`;
}
