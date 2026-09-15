// Konfigurasi Database Level dan Gambar (silakan sesuaikan path gambarmu)
const levels = [
    { id: 1, name: "Conan Edogawa", img: "img/level1.jpg" },
    { id: 2, name: "Shinichi Kudo", img: "img/level2.jpg" },
    { id: 3, name: "Ran Mouri", img: "img/level3.jpg" },
    { id: 4, name: "Ayumi Yoshida", img: "img/level4.jpg" },
    { id: 5, name: "Ai Haibara", img: "img/level5.jpg" },
    { id: 6, name: "Genta Kojima", img: "img/level6.jpg" },
    { id: 7, name: "Mitsuhiko Tsuburaya", img: "img/level7.jpg" },
    { id: 8, name: "Heiji Hattori", img: "img/level8.jpg" },
    { id: 9, name: "Sera Matsumi", img: "img/level9.jpg" },
    { id: 10, name: "Sonoko Suzuki", img: "img/level10.jpg" },
    { id: 11, name: "Hiroshi Agasa", img: "img/level11.jpg" },
    { id: 12, name: "Kogoro Mouri", img: "img/level12.jpg" },
    { id: 13, name: "Juzo Megure", img: "img/level13.jpg" },
    { id: 14, name: "Takagi Wataru", img: "img/level14.jpg" },
    { id: 15, name: "Satou Miwako", img: "img/level15.jpg" },
    { id: 16, name: "Yumi Miyamoto", img: "img/level16.jpg" },
    { id: 17, name: "Vermouth", img: "img/level17.jpg" },
    { id: 18, name: "Kaito Kuroba", img: "img/level18.jpg" },
    { id: 19, name: "Eri Kisaki", img: "img/level19.jpg" },
    { id: 20, name: "Yusaku Kudo", img: "img/level20.jpg" },
    { id: 21, name: "Yukiko Kudo", img: "img/level21.jpg" },
    { id: 22, name: "Jodie Starling", img: "img/level22.jpg" },
    { id: 23, name: "Shiho Miyano/Sherry", img: "img/level23.jpg" },
    { id: 24, name: "Kazuha Toyama", img: "img/level24.jpg" },
    { id: 25, name: "Gin", img: "img/level25.jpg" },
    { id: 26, name: "Vodka", img: "img/level26.jpg" },
    { id: 27, name: "Kazunobu Chiba", img: "img/level27.jpg" },
    { id: 28, name: "Shuichi Akai", img: "img/level28.jpg" },
];

const rows = 4; // Berubah jadi 4 baris (vertikal)
const cols = 3; // Berubah jadi 3 kolom (horizontal)
let currentLevelIndex = 0;
let currentMenuPage = 0; // Melacak halaman paket menu saat ini (Halaman 0 = level 1-12, Halaman 1 = level 13-24, dst)
let pieces = [];
let selectedPiece = null;

// Mengambil data progress user dari LocalStorage
let unlockedLevels = JSON.parse(localStorage.getItem('unlockedLevels')) || [1]; 
let solvedImages = JSON.parse(localStorage.getItem('solvedImages')) || [];

// 1. Fungsi Navigasi Antar Halaman (Screen Switching)
function switchScreen(screenId) {
    // enableFullscreen(); -> Dihapus
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    if (screenId === 'screen-level') {
        // Set halaman menu level secara otomatis mengikuti level aktif saat ini
        currentMenuPage = Math.floor(currentLevelIndex / 12);
        renderLevelGrid();
    }
}

// Fungsi Trigger khusus untuk Tombol Mulai Bermain di Halaman Utama
function btnPlayGame() {
    switchScreen('screen-level'); // Pindah ke halaman level
}

// 2. Render Grid Pemilihan Level (Konsep Kartu Premium 3x4 per 12 Level)
function renderLevelGrid() {
    const levelGrid = document.getElementById('level-grid');
    const screenLevel = document.getElementById('screen-level');
    const prevPageBtn = document.getElementById('btn-prev-page');
    const nextPageBtn = document.getElementById('btn-next-page');
    levelGrid.innerHTML = '';

    // LOGIKA PACK BACKGROUND UTAMA (Per Paket Halaman Menu 12 Level)
    const currentPack = currentMenuPage + 1;
    screenLevel.style.backgroundImage = `url('img/bg${currentPack}.jpg')`;

    // VALIDASI VISIBILITY TOMBOL NAVIGASI HALAMAN (Mencegah celah klik kanan dengan hidden)
    if (currentMenuPage === 0) {
        prevPageBtn.classList.add('hidden');
    } else {
        prevPageBtn.classList.remove('hidden');
    }

    // Jika perkiraan halaman berikutnya melewati total data level, sembunyikan tombol next page
    const totalPagesNeeded = Math.ceil(levels.length / 12);
    if (currentMenuPage >= totalPagesNeeded - 1) {
        nextPageBtn.classList.add('hidden');
    } else {
        nextPageBtn.classList.remove('hidden');
    }

    // HITUNG INDEKS AWAL UNTUK GRID 3x4 BERDASARKAN HALAMAN MENU SEKARANG
    const startIdx = currentMenuPage * 12;

    // Lakukan perulangan mutlak 12 kali untuk membentuk struktur grid 3x4 yang kokoh
    for (let index = startIdx; index < startIdx + 12; index++) {
        const box = document.createElement('div');
        box.classList.add('level-box');

        // Jika data level di database array 'levels' lebih sedikit dari 12, sisa grid dipaksa jadi slot terkunci
        if (index >= levels.length) {
            box.classList.add('locked');
            box.innerHTML = `<div class="level-badge">🔒</div>`;
            levelGrid.appendChild(box);
            continue;
        }

        const lvl = levels[index];
        const badge = document.createElement('div');
        badge.classList.add('level-badge');

        // KONDISI 1: 🟢 Sudah Selesai (Transparan Menembus Wallpaper, Lingkaran Hijau)
        if (solvedImages.includes(lvl.img)) {
            box.classList.add('solved');
            badge.innerText = lvl.id;
            box.onclick = () => startLevel(index);
            box.appendChild(badge);
        } 
        // KONDISI 2: 🟡 Current / Level Terbuka Dimainkan (Kartu Tertutup, Lingkaran Kuning)
        else if (unlockedLevels.includes(lvl.id)) {
            box.classList.add('current');
            badge.innerText = lvl.id;
            box.onclick = () => startLevel(index);
            box.appendChild(badge);
        } 
        // KONDISI 3: 🔴 Terkunci (Kartu Tertutup, Lingkaran Merah + Ikon Gembok)
        else {
            box.classList.add('locked');
            badge.innerHTML = '🔒';
            box.appendChild(badge);
        }

        levelGrid.appendChild(box);
    }
}

// Navigasi Berpindah Halaman Paket Menu (Maju/Mundur per 12 Level)
function navigatePage(direction) {
    const targetPage = currentMenuPage + direction;
    const totalPagesNeeded = Math.ceil(levels.length / 12);

    if (targetPage >= 0 && targetPage < totalPagesNeeded) {
        currentMenuPage = targetPage;
        renderLevelGrid();
    }
}

// 3. Mulai Level Tertentu
function startLevel(index) {
    currentLevelIndex = index;
    switchScreen('screen-game');
    document.getElementById('game-title').innerText = levels[index].name;
    initPuzzle();
}

// 4. Inisialisasi Game Board Puzzle
function initPuzzle() {
  const board = document.getElementById('puzzle-board');
  board.innerHTML = '';
  pieces = [];
  selectedPiece = null;

  for (let i = 0; i < rows * cols; i++) {
    pieces.push(i);
  }
  shuffle(pieces);

  const currentImg = levels[currentLevelIndex].img;

  // Ukuran potongan gambar dalam VH
  const pieceWidthVh = 14; 
  const pieceHeightVh = 18.66; 

  // Tentukan ukuran board total dalam VH
  board.style.width = `${pieceWidthVh * cols}vh`;
  board.style.height = `${pieceHeightVh * rows}vh`;

  // Tentukan grid board dengan piksel tepat
  board.style.gridTemplateColumns = `repeat(${cols}, ${pieceWidthVh}vh)`;
  board.style.gridTemplateRows = `repeat(${rows}, ${pieceHeightVh}vh)`;

  pieces.forEach((pieceIndex, currentPosition) => {
    const piece = document.createElement('div');
    piece.classList.add('puzzle-piece');
    piece.dataset.currentPos = currentPosition;
    piece.dataset.correctPos = pieceIndex;

    // Ambil posisi kolom (X) dan baris (Y) dari potongan asli (sebelum diacak)
    const originalCol = pieceIndex % cols;
    const originalRow = Math.floor(pieceIndex / cols);

    // Hitung posisi background dengan piksel tepat menggunakan vh (Tanpa gangguan Gap)
    const bgX = -(originalCol * pieceWidthVh);
    const bgY = -(originalRow * pieceHeightVh);

    // Atur ukuran background agar gambar pas sempurna dengan grid total
    piece.style.backgroundImage = `url('${currentImg}')`;
    piece.style.backgroundSize = `${pieceWidthVh * cols}vh ${pieceHeightVh * rows}vh`; 
    piece.style.backgroundPosition = `${bgX}vh ${bgY}vh`;

    // Pastikan ukuran potongan juga diatur
    piece.style.width = `${pieceWidthVh}vh`;
    piece.style.height = `${pieceHeightVh}vh`;

    piece.onclick = handlePieceClick;
    board.appendChild(piece);
  });
}

// Fungsi Pengacak (Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 5. Logika Tukar Klik Gambar
function handlePieceClick(e) {
    const clickedPiece = e.currentTarget;

    if (!selectedPiece) {
        selectedPiece = clickedPiece;
        selectedPiece.classList.add('selected');
    } else {
        if (selectedPiece === clickedPiece) {
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
            return;
        }

        // Swap visual dan dataset
        const tempBgPos = selectedPiece.style.backgroundPosition;
        const tempCorrectPos = selectedPiece.dataset.correctPos;

        selectedPiece.style.backgroundPosition = clickedPiece.style.backgroundPosition;
        clickedPiece.style.backgroundPosition = tempBgPos;

        selectedPiece.dataset.correctPos = clickedPiece.dataset.correctPos;
        clickedPiece.dataset.correctPos = tempCorrectPos;

        selectedPiece.classList.remove('selected');
        selectedPiece = null;

        setTimeout(checkWinCondition, 150);
    }
}

// 6. Cek Kemenangan & Kelola Modal Sukses Kustom
function checkWinCondition() {
    const allPieces = document.querySelectorAll('.puzzle-piece');
    let win = true;

    allPieces.forEach(p => {
        if (p.dataset.currentPos !== p.dataset.correctPos) win = false;
    });

    if (win) {
        const currentLvl = levels[currentLevelIndex];
        
        // Simpan gambar ke galeri reward jika belum ada
        if (!solvedImages.includes(currentLvl.img)) {
            solvedImages.push(currentLvl.img);
            localStorage.setItem('solvedImages', JSON.stringify(solvedImages));
        }

        // Buka level berikutnya di latar belakang (Local Storage)
        const nextLevelId = currentLvl.id + 1;
        if (nextLevelId <= levels.length && !unlockedLevels.includes(nextLevelId)) {
            unlockedLevels.push(nextLevelId);
            localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
        }

        // Tampilkan Modal Sukses Custom
        openWinModal();
    }
}

// Membuka Modal Sukses & Menyembunyikan Tombol Navigasi Secara Total Jika di Batas Level
function openWinModal() {
    const winModal = document.getElementById('win-modal');
    const prevBtn = document.getElementById('btn-prev-lvl');
    const nextBtn = document.getElementById('btn-next-lvl');

    winModal.style.display = "flex";

    // Jika ini Level Pertama, SEMBUNYIKAN tombol "<" total
    if (currentLevelIndex === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    // Jika ini Level Terakhir, SEMBUNYIKAN tombol ">" total
    if (currentLevelIndex === levels.length - 1) {
        nextBtn.classList.add('hidden');
    } else {
        nextBtn.classList.remove('hidden');
    }
}

// Menutup Modal (Tetap berada di level tersebut untuk melihat gambar)
function closeWinModal() {
    document.getElementById('win-modal').style.display = "none";
}

// Logika Navigasi Level Otomatis via Tombol Pop-up Modal 
function navigateLevel(direction) {
    const targetIndex = currentLevelIndex + direction;

    if (targetIndex >= 0 && targetIndex < levels.length) {
        closeWinModal();
        startLevel(targetIndex);
    }
}

// 7. Buka & Render Halaman Galeri Berlayar Penuh
function openGallery() {
    switchScreen('screen-gallery');
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';

    if (solvedImages.length === 0) {
        galleryGrid.innerHTML = `<p style="grid-column: 1/-1; opacity:0.7; padding-top: 5vh;">Belum ada gambar terbuka.<br>Selesaikan level terlebih dahulu!</p>`;
        return;
    }

    solvedImages.forEach(imgSrc => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.style.backgroundImage = `url('${imgSrc}')`;
        item.onclick = () => openModal(imgSrc);
        galleryGrid.appendChild(item);
    });
}

// 8. Logika Modal Pop-Up Preview & Download Galeri
function openModal(imgSrc) {
    const modal = document.getElementById('preview-modal');
    const modalImg = document.getElementById('modal-img');
    const downloadBtn = document.getElementById('download-btn');

    modal.style.display = "flex";
    modalImg.src = imgSrc;
    downloadBtn.href = imgSrc;
}

function closeModal() {
    document.getElementById('preview-modal').style.display = "none";
}

// Tombol Reset dalam Game
document.getElementById('reset-btn').onclick = initPuzzle;

// =================================================================
// 🛡️ FITUR KEAMANAN & PROTEKSI (ANTI F12, KLIK KANAN, SCREENSHOT)
// =================================================================

// 1. Anti Klik Kanan
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 2. Anti F12, Inspect Element (Ctrl+Shift+I / J / C / U)
document.addEventListener('keydown', function(e) {
    if (e.key === "F12") {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'i' || e.key === 'j' || e.key === 'c')) {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
    }
    // 3. Anti Screenshot via tombol PrintScreen
    if (e.key === "PrintScreen") {
        e.preventDefault();
        navigator.clipboard.writeText(""); 
        alert("Screenshot dinonaktifkan demi hak cipta gambar!");
    }
});

// Tambahan proteksi PrintScreen saat jendela kehilangan fokus
window.addEventListener('keyup', function(e) {
    if (e.key === "PrintScreen") {
        navigator.clipboard.writeText("");
    }
});