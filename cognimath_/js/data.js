/* ============================================================
   data.js — Semua data konten CogniMath
   Versi: 2.0 — Video menggunakan YouTube IFrame API
   ============================================================ */

/* ──────────────────────────────────────────────────────────
   DATA MATERI PELAJARAN (6 topik)
   youtubeId = ID video YouTube yang relevan dengan topik
────────────────────────────────────────────────────────── */
const semuaMateri = [
  {
    id:1, judul:'Aljabar Dasar', ikon:'🔢', waktuBaca:6, kategori:'aljabar',
    warnaLatar:'#E3F2FD', warnaIkon:'#1565C0', sudahDibaca:false,
    deskripsi:'Pengenalan variabel, konstanta, suku, dan operasi bentuk aljabar',
    poinPenting:[
      'Variabel mewakili nilai yang belum diketahui',
      'Suku sejenis bisa dijumlahkan atau dikurangkan',
      'Koefisien adalah angka di depan variabel'
    ],
    konten:{
      intro:'Aljabar adalah cabang matematika yang menggunakan simbol (variabel) untuk mewakili bilangan. Ini adalah fondasi dari hampir semua cabang matematika lanjutan.',
      seksi:[
        {
          judul:'1. Variabel',
          teks:'Variabel adalah huruf yang digunakan untuk mewakili suatu nilai yang belum diketahui. Nilainya bisa berubah-ubah tergantung situasi.',
          rumus:'Contoh variabel: x, y, a, b, n\nContoh penggunaan: x + 5 = 10  →  x adalah variabel',
          contohSoal:'Jika x = 3, berapa nilai dari 2x + 1?\nJawab: 2(3) + 1 = 6 + 1 = 7'
        },
        {
          judul:'2. Konstanta',
          teks:'Konstanta adalah nilai tetap yang tidak berubah dalam suatu persamaan. Nilainya selalu sama di manapun.',
          rumus:'Contoh konstanta: 2,  -5,  3/4,  π (≈3.14)'
        },
        {
          judul:'3. Suku & Suku Sejenis',
          teks:'Suku adalah bagian dari ekspresi aljabar yang dipisahkan oleh tanda + atau −. Suku sejenis memiliki variabel dan pangkat yang sama — hanya ini yang bisa dijumlahkan/dikurangkan langsung.',
          rumus:'Contoh: 3x + 2y − x + 5y\nSuku sejenis: 3x dan −x  →  2x\nSuku sejenis: 2y dan 5y  →  7y\nHasil akhir: 2x + 7y',
          contohSoal:'Sederhanakan: 4a + 3b − 2a + b\nJawab: (4a−2a) + (3b+b) = 2a + 4b'
        },
        {
          judul:'4. Operasi Aljabar',
          teks:'Dalam aljabar, kita bisa menjumlahkan, mengurangkan, mengalikan, dan membagi. Untuk perkalian, gunakan sifat distributif. Untuk pembagian, sederhanakan koefisiennya.',
          rumus:'Penjumlahan: (2x + 3) + (x − 1) = 3x + 2\nDistributif:  3(2x + 4) = 6x + 12\nPerkalian:   (3x)(2x) = 6x²\nPembagian:  6x² ÷ 2x = 3x'
        }
      ]
    }
  },
  {
    id:2, judul:'Persamaan Linear Satu Variabel', ikon:'📐', waktuBaca:7, kategori:'persamaan',
    warnaLatar:'#FCE4EC', warnaIkon:'#C2185B', sudahDibaca:false,
    deskripsi:'Memahami dan menyelesaikan persamaan linear dengan satu variabel',
    poinPenting:[
      'Variabel hanya boleh berpangkat 1',
      'Operasi yang sama harus dilakukan di kedua ruas',
      'Selalu buktikan jawaban dengan substitusi kembali'
    ],
    konten:{
      intro:'Persamaan linear satu variabel (PLSV) adalah persamaan dengan satu variabel berpangkat 1. Ini adalah jenis persamaan paling dasar yang wajib dikuasai sebelum lanjut ke topik yang lebih sulit.',
      seksi:[
        {
          judul:'1. Bentuk Umum PLSV',
          teks:'Bentuk umum PLSV adalah ax + b = c, di mana a ≠ 0. Tujuannya adalah mencari nilai x yang membuat persamaan ini benar (terpenuhi).',
          rumus:'Bentuk umum: ax + b = c\nContoh: 2x + 3 = 7   (a=2, b=3, c=7)'
        },
        {
          judul:'2. Langkah-Langkah Menyelesaikan',
          teks:'Prinsipnya sederhana: isolasi variabel ke satu sisi. Apa yang dilakukan di ruas kiri, HARUS dilakukan juga di ruas kanan agar tetap seimbang seperti timbangan.',
          rumus:'2x + 3 = 7\n2x = 7 − 3         ← pindahkan 3 ke kanan (tanda berubah)\n2x = 4\nx  = 4 ÷ 2 = 2   ← bagi kedua sisi dengan 2',
          contohSoal:'Tentukan nilai x dari: 5x − 8 = 12\nLangkah: 5x = 12 + 8 = 20\nMaka x = 20 ÷ 5 = 4'
        },
        {
          judul:'3. Verifikasi (Membuktikan) Jawaban',
          teks:'Setelah mendapat nilai x, substitusikan kembali ke persamaan awal. Jika ruas kiri = ruas kanan, maka jawaban BENAR!',
          rumus:'Cek x = 2 dalam persamaan 2x + 3 = 7:\n2(2) + 3 = 4 + 3 = 7  ✓ BENAR!'
        },
        {
          judul:'4. Soal Cerita (Word Problem)',
          teks:'Dalam kehidupan nyata, PLSV sering muncul dalam bentuk soal cerita. Kuncinya: ubah kalimat menjadi persamaan matematika terlebih dahulu.',
          rumus:'Contoh: "Umur Budi 3 tahun lebih tua dari Ani.\nJumlah umur keduanya 25 tahun. Berapa umur Ani?"\n\nMisalkan umur Ani = x\nUmur Budi = x + 3\nPersamaan: x + (x+3) = 25\n2x + 3 = 25 → x = 11\nJadi umur Ani = 11 tahun',
          contohSoal:'Sebuah toko menjual pensil seharga Rp2.000 per buah. Jika Rina membeli x pensil dan membayar Rp14.000, berapa pensil yang dibeli?\nJawab: 2000x = 14000 → x = 7 pensil'
        }
      ]
    }
  },
  {
    id:3, judul:'SPLDV', ikon:'⚡', waktuBaca:10, kategori:'persamaan',
    warnaLatar:'#F3E5F5', warnaIkon:'#7B1FA2', sudahDibaca:false,
    deskripsi:'Sistem Persamaan Linear Dua Variabel — metode substitusi, eliminasi, dan campuran',
    poinPenting:[
      'Dibutuhkan 2 persamaan untuk mencari 2 variabel',
      'Substitusi: nyatakan satu variabel, masukkan ke persamaan lain',
      'Eliminasi: hilangkan satu variabel dengan operasi antar persamaan'
    ],
    konten:{
      intro:'SPLDV adalah dua persamaan linear yang punya dua variabel (biasanya x dan y). Keduanya harus dipenuhi sekaligus. Ada tiga metode: substitusi, eliminasi, dan campuran keduanya.',
      seksi:[
        {
          judul:'1. Metode Substitusi',
          teks:'Langkah: nyatakan satu variabel dari persamaan pertama, lalu masukkan (substitusi) hasilnya ke persamaan kedua.',
          rumus:'Diketahui: x + y = 5  ...(1)\n           x − y = 1  ...(2)\n\nDari (1): x = 5 − y\nMasukkan ke (2):\n(5 − y) − y = 1\n5 − 2y = 1  →  2y = 4  →  y = 2\nMaka x = 5 − 2 = 3\n\nHasil: x = 3, y = 2',
          contohSoal:'Gunakan substitusi:\n2x + y = 8  dan  x − y = 1\nJawab: dari pers.2: x = y+1\nMasuk ke pers.1: 2(y+1)+y=8 → 3y=6 → y=2, x=3'
        },
        {
          judul:'2. Metode Eliminasi',
          teks:'Langkah: kurangi atau jumlahkan kedua persamaan langsung untuk menghilangkan (mengeliminasi) satu variabel sekaligus.',
          rumus:'Diketahui: 2x + y = 7  ...(1)\n            x + y = 4  ...(2)\n\nKurangkan (1) − (2):\n(2x−x) + (y−y) = 7 − 4\n x = 3\n\nSubstitusi x=3 ke (2):\n3 + y = 4  →  y = 1\n\nHasil: x = 3, y = 1',
          contohSoal:'Gunakan eliminasi:\n3x + 2y = 16  dan  x + 2y = 8\nKurangkan: 2x = 8 → x = 4\nMasuk ke pers.2: 4 + 2y = 8 → y = 2'
        },
        {
          judul:'3. Metode Campuran (Gabungan)',
          teks:'Metode campuran menggabungkan eliminasi dan substitusi. Pertama eliminasi satu variabel, lalu substitusi hasilnya untuk mendapat variabel kedua.',
          rumus:'Contoh:\n3x + 4y = 18  ...(1)\n x − 2y = 2   ...(2)\n\nKalikan (2) × 2: 2x − 4y = 4  ...(3)\nJumlahkan (1)+(3):\n5x = 22? → 3x+2x = 18+4 → 5x = 22\nHmm, coba eliminasi y:\n(1) + (2)×2 → 5x = 22 → x = 22/5'
        },
        {
          judul:'4. Aplikasi Kehidupan Nyata',
          teks:'SPLDV sangat berguna untuk menyelesaikan masalah sehari-hari seperti masalah harga campuran, jarak-waktu-kecepatan, atau usia.',
          rumus:'Contoh: "Harga 2 buku + 3 pensil = Rp16.000\n         Harga 1 buku + 1 pensil = Rp7.000\n         Berapa harga 1 buku?"\n\nMisalkan buku = x, pensil = y:\n2x + 3y = 16000  ...(1)\n x  + y  = 7000   ...(2)\n\nDari (2): x = 7000 − y\nMasuk (1): 2(7000−y) + 3y = 16000\n14000 + y = 16000\ny = 2000, x = 5000\nHarga 1 buku = Rp5.000'
        }
      ]
    }
  },
  {
    id:4, judul:'Fungsi Linear', ikon:'📈', waktuBaca:8, kategori:'fungsi',
    warnaLatar:'#E8F5E9', warnaIkon:'#2E7D32', sudahDibaca:false,
    deskripsi:'Pengertian fungsi, domain, kodomain, gradien, dan grafik fungsi linear',
    poinPenting:[
      'Gradien positif = garis naik ke kanan, negatif = turun',
      'Nilai c adalah titik potong sumbu y di titik (0, c)',
      'Dua garis sejajar selalu memiliki gradien yang sama'
    ],
    konten:{
      intro:'Fungsi linear adalah fungsi yang grafiknya berupa garis lurus. Bentuk umumnya f(x) = mx + c, di mana m adalah gradien (kemiringan) dan c adalah konstanta (titik potong sumbu y).',
      seksi:[
        {
          judul:'1. Pengertian Fungsi',
          teks:'Fungsi adalah relasi yang memasangkan setiap anggota domain (input) dengan tepat SATU anggota kodomain (output). Tidak boleh satu input punya dua output berbeda.',
          rumus:'Fungsi: f(x) = 2x + 1\nJika x = 3, maka f(3) = 2(3) + 1 = 7\nJika x = 0, maka f(0) = 2(0) + 1 = 1'
        },
        {
          judul:'2. Bentuk Umum & Gradien',
          teks:'f(x) = mx + c adalah bentuk standar. m adalah gradien yang menentukan kemiringan garis. c adalah di mana garis memotong sumbu y.',
          rumus:'f(x) = 2x + 1\nm = 2  →  garis naik, setiap x naik 1, y naik 2\nc = 1  →  garis memotong sumbu y di (0, 1)',
          contohSoal:'Tentukan f(4) jika f(x) = 3x − 2\nJawab: f(4) = 3(4) − 2 = 12 − 2 = 10'
        },
        {
          judul:'3. Menentukan Gradien dari Dua Titik',
          teks:'Jika diketahui dua titik yang dilalui sebuah garis, kita bisa hitung gradiennya menggunakan rumus berikut:',
          rumus:'Rumus gradien:\nm = (y₂ − y₁) / (x₂ − x₁)\n\nContoh: titik (1, 3) dan (3, 7):\nm = (7 − 3) / (3 − 1) = 4/2 = 2',
          contohSoal:'Tentukan gradien garis yang melalui (2,5) dan (6,13)\nJawab: m = (13−5)/(6−2) = 8/4 = 2'
        },
        {
          judul:'4. Menggambar Grafik Fungsi Linear',
          teks:'Untuk menggambar grafik, kita hanya perlu dua titik. Cara termudah: cari titik potong sumbu x (y=0) dan titik potong sumbu y (x=0).',
          rumus:'Contoh: f(x) = 2x − 4\nTitik potong sumbu y (x=0): y = 2(0)−4 = −4 → (0, −4)\nTitik potong sumbu x (y=0): 0 = 2x−4 → x = 2 → (2, 0)\nHubungkan kedua titik tersebut!'
        },
        {
          judul:'5. Hubungan Dua Garis',
          teks:'Dua garis bisa sejajar, berpotongan, atau berimpit. Gradien menentukan hubungan ini.',
          rumus:'Sejajar: m₁ = m₂, b₁ ≠ b₂\nContoh: y=2x+1 dan y=2x−3 (sejajar)\n\nTegak lurus: m₁ × m₂ = −1\nContoh: y=2x dan y=−½x (tegak lurus)'
        }
      ]
    }
  },
  {
    id:5, judul:'Pertidaksamaan Linear', ikon:'🔍', waktuBaca:6, kategori:'aritmatika',
    warnaLatar:'#FFF8E1', warnaIkon:'#F57F17', sudahDibaca:false,
    deskripsi:'Mempelajari pertidaksamaan linear satu dan dua variabel beserta himpunan penyelesaiannya',
    poinPenting:[
      'Tanda WAJIB berubah ketika dikali/dibagi bilangan negatif',
      'Solusi berupa himpunan bilangan, bukan satu nilai',
      'Grafik solusi digambarkan di garis bilangan'
    ],
    konten:{
      intro:'Pertidaksamaan linear menggunakan simbol <, >, ≤, ≥ sebagai pengganti =. Solusinya bukan satu nilai, melainkan himpunan nilai yang memenuhi syarat. Aturan dasarnya mirip persamaan, kecuali ada satu aturan krusial yang sering dilupakan!',
      seksi:[
        {
          judul:'1. Simbol-Simbol Pertidaksamaan',
          teks:'Ada empat simbol utama. Masing-masing punya makna berbeda dan menentukan apakah batas nilainya ikut atau tidak.',
          rumus:'<  = kurang dari       (tidak termasuk batas)\n>  = lebih dari        (tidak termasuk batas)\n≤  = kurang dari/sama dengan  (termasuk batas)\n≥  = lebih dari/sama dengan   (termasuk batas)\n\nContoh: x < 5  →  x bisa: 4, 3.9, 0, -10, ...\n        x ≥ 3  →  x bisa: 3, 4, 5, 100, ...',
          contohSoal:'Sebutkan 5 bilangan bulat yang memenuhi x ≤ 4!\nJawab: ..., 2, 3, 4 (termasuk 4 karena ≤)'
        },
        {
          judul:'2. Cara Menyelesaikan',
          teks:'Cara menyelesaikannya sama seperti persamaan linear: isolasi variabel. KECUALI ada satu aturan penting yang tidak berlaku di persamaan biasa.',
          rumus:'Contoh biasa (positif):\n2x + 1 > 7\n2x > 6\nx > 3  ✓  (tanda tidak berubah)\n\nLangkah verifikasi: coba x = 4 → 2(4)+1 = 9 > 7 ✓',
          contohSoal:'Selesaikan: 3x − 5 ≤ 10\nJawab: 3x ≤ 15, maka x ≤ 5'
        },
        {
          judul:'3. ⚠️ ATURAN PENTING: Tanda Harus Dibalik!',
          teks:'PERINGATAN MERAH: Ketika mengalikan atau membagi kedua ruas dengan bilangan NEGATIF, tanda pertidaksamaan HARUS DIBALIK. Ini aturan yang paling sering salah!',
          rumus:'CONTOH SALAH vs BENAR:\n\n−2x > 6\n\nSALAH: x > 6 ÷ (−2) = x > −3  ✗\nBENAR: x < 6 ÷ (−2) = x < −3  ✓\n             ↑ tanda dibalik karena dibagi −2\n\nVerifikasi: coba x = −4 di −2x > 6:\n−2(−4) = 8 > 6  ✓ BENAR (x = −4 memenuhi x < −3)'
        },
        {
          judul:'4. Pertidaksamaan Majemuk',
          teks:'Dua pertidaksamaan bisa digabung menjadi satu. Ada dua bentuk: "dan" (irisan) dan "atau" (gabungan).',
          rumus:'Bentuk "dan" (irisan ∩):\n2 < x ≤ 7  →  x lebih dari 2 DAN paling besar 7\n\nBentuk "atau" (gabungan ∪):\nx < 2 atau x > 5\n→  semua bilangan di bawah 2 ATAU di atas 5'
        }
      ]
    }
  },
  {
    id:6, judul:'Teorema Pythagoras', ikon:'📏', waktuBaca:7, kategori:'aritmatika',
    warnaLatar:'#E8EAF6', warnaIkon:'#3F51B5', sudahDibaca:false,
    deskripsi:'Hubungan sisi-sisi segitiga siku-siku, triple Pythagoras, dan penerapan di kehidupan nyata',
    poinPenting:[
      'Hanya berlaku untuk segitiga SIKU-SIKU',
      'Sisi miring (c) selalu sisi yang paling panjang',
      'Banyak digunakan dalam konstruksi dan navigasi'
    ],
    konten:{
      intro:'Teorema Pythagoras adalah salah satu rumus matematika paling terkenal di dunia. Ditemukan oleh Pythagoras (570–495 SM), rumus ini menyatakan hubungan antara ketiga sisi segitiga siku-siku.',
      seksi:[
        {
          judul:'1. Rumus Pythagoras',
          teks:'Jika a dan b adalah sisi siku-siku (kaki segitiga), dan c adalah sisi miring (hypotenuse / sisi terpanjang yang berhadapan dengan sudut siku-siku), maka:',
          rumus:'a² + b² = c²\n\nMencari sisi miring:  c = √(a² + b²)\nMencari sisi lain:    a = √(c² − b²)\n\nContoh: a=3, b=4\nc = √(3² + 4²) = √(9+16) = √25 = 5',
          contohSoal:'Segitiga punya sisi 5 cm dan 12 cm. Berapa sisi miringnya?\nJawab: c = √(25 + 144) = √169 = 13 cm'
        },
        {
          judul:'2. Triple Pythagoras',
          teks:'Triple Pythagoras adalah tiga bilangan bulat yang memenuhi rumus a²+b²=c². Hafal beberapa triple ini agar bisa mengenali segitiga siku-siku dengan cepat!',
          rumus:'Triple dasar yang umum:\n(3, 4, 5)    →  9+16 = 25  ✓\n(5, 12, 13)  →  25+144 = 169  ✓\n(8, 15, 17)  →  64+225 = 289  ✓\n(7, 24, 25)  →  49+576 = 625  ✓\n\nKelipatannya juga berlaku:\n(6, 8, 10) = 2×(3,4,5)  ✓'
        },
        {
          judul:'3. Membuktikan Segitiga Siku-Siku',
          teks:'Kita bisa menggunakan kebalikan Teorema Pythagoras untuk membuktikan apakah suatu segitiga siku-siku atau bukan.',
          rumus:'Jika a² + b² = c²  →  segitiga SIKU-SIKU\nJika a² + b² > c²  →  segitiga LANCIP\nJika a² + b² < c²  →  segitiga TUMPUL\n\nContoh: sisi 6, 8, 10\n6² + 8² = 36 + 64 = 100 = 10²  ✓ SIKU-SIKU',
          contohSoal:'Apakah segitiga dengan sisi 9, 12, 15 adalah siku-siku?\nJawab: 9²+12² = 81+144 = 225 = 15²  ✓ YA!'
        },
        {
          judul:'4. Penerapan di Kehidupan Nyata',
          teks:'Teorema Pythagoras digunakan di banyak bidang: konstruksi bangunan, navigasi kapal, desain arsitektur, hingga layar TV.',
          rumus:'Contoh 1 — Tangga:\nTangga 10 m bersandar di dinding, kaki tangga 6 m\ndari dinding. Setinggi apa tangga menyentuh dinding?\nTinggi² = 10² − 6² = 100 − 36 = 64\nTinggi = √64 = 8 m\n\nContoh 2 — Diagonal persegi panjang:\nPersegi panjang 6 m × 8 m\nDiagonal = √(6² + 8²) = √100 = 10 m'
        }
      ]
    }
  }
];

/* ──────────────────────────────────────────────────────────
   DATA VIDEO PEMBELAJARAN
   youtubeId = ID video YouTube (bagian setelah ?v= di URL)
   Contoh URL: https://youtube.com/watch?v=dQw4w9WgXcQ
   Maka youtubeId = 'dQw4w9WgXcQ'

   Video diputar LANGSUNG di dalam aplikasi menggunakan
   YouTube IFrame API — pengguna tidak perlu keluar!
────────────────────────────────────────────────────────── */
const semuaVideo = [
  {
    id: 1,
    judul: 'Aljabar Dasar — Variabel, Konstanta & Operasi',
    deskripsi: 'Pengenalan lengkap konsep dasar aljabar: variabel, konstanta, suku sejenis, dan cara menyederhanakan bentuk aljabar. Cocok untuk pemula!',
    youtubeId: 'NybHckSEQBI',   // "Aljabar Dasar" — Khan Academy Indonesia
    durasi: '10:32',
    kategori: 'aljabar',
    warnaKategori: '#1565C0',
    favorit: false
  },
  {
    id: 2,
    judul: 'Persamaan Linear Satu Variabel (PLSV)',
    deskripsi: 'Belajar menyelesaikan persamaan linear satu variabel dengan metode yang mudah dipahami, dilengkapi berbagai contoh soal nyata.',
    youtubeId: 'l3XzepXmCos',   // Persamaan Linear — matematikamudah
    durasi: '12:45',
    kategori: 'persamaan',
    warnaKategori: '#C2185B',
    favorit: false
  },
  {
    id: 3,
    judul: 'SPLDV — Metode Substitusi & Eliminasi',
    deskripsi: 'Tutorial lengkap SPLDV: metode substitusi, eliminasi, dan campuran. Dilengkapi soal cerita dan penerapan kehidupan sehari-hari.',
    youtubeId: 'vA-55wZtLeE',   // SPLDV — video populer
    durasi: '15:20',
    kategori: 'persamaan',
    warnaKategori: '#7B1FA2',
    favorit: false
  },
  {
    id: 4,
    judul: 'Fungsi Linear — Grafik & Gradien',
    deskripsi: 'Memahami fungsi linear secara visual: cara menggambar grafik garis lurus, menentukan gradien, dan titik potong sumbu koordinat.',
    youtubeId: 'MXV65i9g1Xg',   // Linear Function graph
    durasi: '18:05',
    kategori: 'fungsi',
    warnaKategori: '#2E7D32',
    favorit: false
  },
  {
    id: 5,
    judul: 'Pertidaksamaan Linear — Lengkap dengan Aturan Tanda',
    deskripsi: 'Panduan lengkap pertidaksamaan linear: cara menyelesaikan, aturan perubahan tanda saat dibagi negatif, dan himpunan penyelesaian.',
    youtubeId: 'Y6Vhzbp0i2E',
    durasi: '14:30',
    kategori: 'aritmatika',
    warnaKategori: '#F57F17',
    favorit: false
  },
  {
    id: 6,
    judul: 'Teorema Pythagoras — Rumus, Bukti & Penerapan',
    deskripsi: 'Penjelasan lengkap Teorema Pythagoras: rumus dasar, triple Pythagoras, cara membuktikan segitiga siku-siku, dan contoh soal kehidupan nyata.',
    youtubeId: 'YompsDlEdtc',
    durasi: '11:20',
    kategori: 'aritmatika',
    warnaKategori: '#3F51B5',
    favorit: false
  }
];

/* ──────────────────────────────────────────────────────────
   DATA KUIS (6 kuis, masing-masing 5 soal)
────────────────────────────────────────────────────────── */
const semuaKuis = [
  {
    id:1, judul:'Kuis Aljabar Dasar', ikon:'🔢', nilai:null,
    deskripsi:'Uji pemahamanmu tentang variabel, konstanta, suku, dan operasi aljabar dasar.',
    pertanyaan:[
      {soal:'Jika 3x = 12, maka nilai x adalah...', pilihan:['2','3','4','5'], jawabanBenar:2},
      {soal:'Bentuk sederhana dari 5a + 3b − 2a + b adalah...', pilihan:['3a + 4b','7a + 2b','3a + 2b','7a + 4b'], jawabanBenar:0},
      {soal:'Koefisien dari 7x² adalah...', pilihan:['2','7','x','x²'], jawabanBenar:1},
      {soal:'Nilai dari 4(2x − 1) jika x = 3 adalah...', pilihan:['16','20','22','24'], jawabanBenar:1},
      {soal:'Suku-suku sejenis dalam 3x + 2y − x + 5y adalah...', pilihan:['3x dan 2y saja','3x dan −x saja','2y dan 5y saja','3x & −x, serta 2y & 5y'], jawabanBenar:3}
    ]
  },
  {
    id:2, judul:'Kuis Persamaan Linear', ikon:'📐', nilai:80,
    deskripsi:'Latihan soal persamaan linear satu variabel dengan berbagai variasi bentuk.',
    pertanyaan:[
      {soal:'Tentukan nilai x dari: 2x + 5 = 15', pilihan:['4','5','6','7'], jawabanBenar:1},
      {soal:'Jika 3x − 4 = 11, maka x = ...', pilihan:['4','5','6','7'], jawabanBenar:1},
      {soal:'Penyelesaian dari 4x + 8 = 0 adalah...', pilihan:['-4','-3','-2','-1'], jawabanBenar:2},
      {soal:'Nilai x dari 2(x + 3) = 14 adalah...', pilihan:['3','4','5','6'], jawabanBenar:1},
      {soal:'Jika x/3 = 4, maka x = ...', pilihan:['8','10','12','15'], jawabanBenar:2}
    ]
  },
  {
    id:3, judul:'Kuis SPLDV', ikon:'⚡', nilai:null,
    deskripsi:'Uji kemampuanmu menyelesaikan sistem persamaan linear dua variabel.',
    pertanyaan:[
      {soal:'Jika x + y = 7 dan x − y = 3, maka nilai x adalah...', pilihan:['2','3','4','5'], jawabanBenar:3},
      {soal:'Dari sistem 2x + y = 8 dan x + y = 5, nilai y adalah...', pilihan:['1','2','3','4'], jawabanBenar:2},
      {soal:'Penyelesaian dari x + 2y = 4 dan x − y = 1 adalah...', pilihan:['(2,1)','(1,2)','(3,1)','(2,2)'], jawabanBenar:0},
      {soal:'Metode yang menghilangkan variabel dengan operasi antar persamaan disebut...', pilihan:['Substitusi','Eliminasi','Grafik','Matriks'], jawabanBenar:1},
      {soal:'Jika 3x + y = 10 dan x = 2, maka y = ...', pilihan:['2','3','4','5'], jawabanBenar:2}
    ]
  },
  {
    id:4, judul:'Kuis Fungsi Linear', ikon:'📈', nilai:null,
    deskripsi:'Soal-soal tentang gradien, titik potong, dan persamaan garis lurus.',
    pertanyaan:[
      {soal:'Gradien dari fungsi f(x) = 3x + 2 adalah...', pilihan:['1','2','3','4'], jawabanBenar:2},
      {soal:'Titik potong sumbu y dari f(x) = 2x − 4 adalah...', pilihan:['(0, -4)','(0, 2)','(2, 0)','(-4, 0)'], jawabanBenar:0},
      {soal:'Fungsi linear melalui titik (0,3) dengan gradien 2 adalah...', pilihan:['y = 2x','y = 2x + 3','y = 3x + 2','y = x + 3'], jawabanBenar:1},
      {soal:'Jika f(x) = 4x − 1, maka f(3) = ...', pilihan:['10','11','12','13'], jawabanBenar:1},
      {soal:'Dua garis sejajar memiliki gradien yang...', pilihan:['Berbeda','Sama','Berlawanan tanda','Nol'], jawabanBenar:1}
    ]
  },
  {
    id:5, judul:'Kuis Pertidaksamaan', ikon:'🔍', nilai:null,
    deskripsi:'Latihan soal pertidaksamaan linear termasuk aturan perubahan tanda.',
    pertanyaan:[
      {soal:'Penyelesaian dari 2x + 1 > 7 adalah...', pilihan:['x > 3','x < 3','x > 4','x < 4'], jawabanBenar:0},
      {soal:'Jika −3x ≤ 9, maka x ...', pilihan:['x ≤ −3','x ≥ −3','x ≤ 3','x ≥ 3'], jawabanBenar:1},
      {soal:'Himpunan penyelesaian dari x + 4 < 10 adalah...', pilihan:['x < 6','x > 6','x < 14','x > 14'], jawabanBenar:0},
      {soal:'Nilai x yang memenuhi 5x − 3 ≥ 12 adalah...', pilihan:['x ≥ 1','x ≥ 2','x ≥ 3','x ≥ 4'], jawabanBenar:2},
      {soal:'Aturan BENAR saat membagi pertidaksamaan dengan bilangan negatif adalah...', pilihan:['Tanda tidak berubah','Tanda dibalik','Kedua ruas dikurangi 1','Tidak bisa dilakukan'], jawabanBenar:1}
    ]
  },
  {
    id:6, judul:'Kuis Pythagoras', ikon:'📏', nilai:null,
    deskripsi:'Uji pemahamanmu tentang Teorema Pythagoras dan penerapannya.',
    pertanyaan:[
      {soal:'Pada segitiga siku-siku dengan sisi 3 cm dan 4 cm, sisi miringnya adalah...', pilihan:['5 cm','6 cm','7 cm','8 cm'], jawabanBenar:0},
      {soal:'Diketahui sisi miring = 13 dan salah satu sisi = 5. Sisi lainnya adalah...', pilihan:['8','10','12','14'], jawabanBenar:2},
      {soal:'Rumus Teorema Pythagoras yang benar adalah...', pilihan:['a+b=c','a²+b²=c²','a²−b²=c²','a×b=c²'], jawabanBenar:1},
      {soal:'Segitiga dengan sisi 5, 12, dan 13 — apakah segitiga siku-siku?', pilihan:['Ya, karena 5²+12²=13²','Tidak, bukan segitiga siku-siku','Ya, karena 5+12=17','Tidak cukup data'], jawabanBenar:0},
      {soal:'Bayangan pohon 8 m, jarak ujung bayangan ke puncak 10 m. Tinggi pohon?', pilihan:['4 m','6 m','8 m','12 m'], jawabanBenar:1}
    ]
  }
];

/* ──────────────────────────────────────────────────────────
   DATA RIWAYAT AWAL
────────────────────────────────────────────────────────── */
const riwayatAktivitas = [
  {tipe:'kuis',   judul:'Kuis Persamaan Linear',       keterangan:'Selesai dikerjakan • 5 soal',   nilai:80,  ikon:'🏆', warnaLatar:'#FFF8E1'},
  {tipe:'materi', judul:'Aljabar Dasar',               keterangan:'Dibaca • Tadi',                 nilai:null,ikon:'📚', warnaLatar:'#E3F2FD'},
  {tipe:'video',  judul:'SPLDV — Metode Substitusi',   keterangan:'Ditonton • Kemarin',            nilai:null,ikon:'▶️', warnaLatar:'#F3E5F5'},
  {tipe:'kuis',   judul:'Kuis Aljabar Dasar',          keterangan:'Selesai dikerjakan • 2 hari lalu',nilai:90,ikon:'🏆', warnaLatar:'#E8F5E9'}
];
