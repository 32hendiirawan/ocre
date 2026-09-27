let mode = 'biasaKeCampur';
let currentInput = null;

// Kontrol Aktivasi Numpad Kustom
document.querySelectorAll('.input-conv').forEach(input => {
    input.addEventListener('click', function(e) {
        e.stopPropagation();
        if(currentInput) currentInput.classList.remove('active-input');
        
        currentInput = this;
        currentInput.classList.add('active-input');
        document.getElementById('numpad').classList.add('show');
    });
});

// Klik di area kosong luar untuk tutup numpad
document.addEventListener('click', function(e) {
    if (!e.target.closest('#numpad') && !e.target.closest('.game-board')) {
        hideNumpad();
    }
});

function pressNum(num) {
    if (currentInput) {
        // Cegah angka 0 di awal input penyebut demi validasi matematika
        if (num === '0' && currentInput.value.length === 0 && currentInput.classList.contains('penyebut')) {
            alert("Angka penyebut bawah tidak boleh bernilai awal 0 ya!");
            return;
        }
        if (currentInput.value.length < 3) {
            currentInput.value += num;
        }
    }
}

function pressDel() {
    if (currentInput) {
        currentInput.value = currentInput.value.slice(0, -1);
    }
}

function hideNumpad() {
    document.getElementById('numpad').classList.remove('show');
    if(currentInput) {
        currentInput.classList.remove('active-input');
        currentInput = null;
    }
}

function tukar() {
    hideNumpad();
    const boxBiasa = document.getElementById('boxBiasa');
    const boxCampuran = document.getElementById('boxCampuran');
    const btn = document.getElementById('switch-btn');
    const label = document.getElementById('label-mode');

    if (mode === 'biasaKeCampur') {
        boxBiasa.style.order = "3";
        boxCampuran.style.order = "1";
        label.innerText = "Mode: Pecahan Campuran ⮕ Pecahan Biasa";
        mode = 'campurKeBiasa';
        btn.classList.add('active');
    } else {
        boxBiasa.style.order = "1";
        boxCampuran.style.order = "3";
        label.innerText = "Mode: Pecahan Biasa ⮕ Pecahan Campuran";
        mode = 'biasaKeCampur';
        btn.classList.remove('active');
    };
    resetconv();
}

function getFPB(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    return b === 0 ? a : getFPB(b, a % b);
}

function hitung() {
    let n = parseInt(document.getElementById('numBiasa').value);
    let d = parseInt(document.getElementById('denBiasa').value);

    if (!n || !d) {
        alert("Masukkan angka pembilang & penyebut biasa dulu ya!");
        return;
    }

    let fpb = getFPB(n, d);
    let nSed = n / fpb;
    let dSed = d / fpb;

    let bulat = Math.floor(nSed / dSed);
    let sisa = nSed % dSed;

    document.getElementById('wholeCampur').value = bulat || "0";
    document.getElementById('numCampur').value = sisa;
    document.getElementById('denCampur').value = dSed;

    let langkah = `✨ Langkah Mengubah Pecahan Biasa Ke Campuran:\n\n`;
    langkah += `1. Kecilkan pecahan ${n}/${d} dibagi FPB (${fpb}) ⮕ ${nSed}/${dSed}\n`;
    langkah += `2. Hitung pembagian utama: ${nSed} ÷ ${dSed} = didapat angka utuh (${bulat})\n`;
    langkah += `3. Cari sisa pembagiannya: ${nSed} % ${dSed} = sisa (${sisa})\n`;
    langkah += `4. Hasil Akhir Campuran ⮕ ${bulat} ${sisa}/${dSed}`;
    document.getElementById('langkahLangkah').innerText = langkah;
}

function hitungCampur() {
    let b = parseInt(document.getElementById('wholeCampur').value) || 0;
    let n = parseInt(document.getElementById('numCampur').value) || 0;
    let d = parseInt(document.getElementById('denCampur').value);

    if (!d) {
        alert("Angka penyebut bawah pecahan campuran tidak boleh kosong!");
        return;
    }

    let totalAtas = (b * d) + n;
    let fpb = getFPB(totalAtas, d);
    let nFin = totalAtas / fpb;
    let dFin = d / fpb;

    document.getElementById('numBiasa').value = nFin;
    document.getElementById('denBiasa').value = dFin;

    let langkah = `✨ Langkah Mengubah Pecahan Campuran Ke Biasa:\n\n`;
    langkah += `1. Kalikan angka depan dengan bawah: ${b} × ${d} = ${b * d}\n`;
    langkah += `2. Tambahkan hasilnya dengan angka atas: ${b * d} + ${n} = ${totalAtas}\n`;
    langkah += `3. Didapat format mentah pecahan biasa: ${totalAtas}/${d}\n`;
    if(fpb > 1) langkah += `4. Dikecilkan dibagi FPB (${fpb}) Hasil Akhir ⮕ ${nFin}/${dFin}`;
    else langkah += `4. Pecahan ini sudah paling kecil! Hasil Akhir ⮕ ${nFin}/${dFin}`;
    document.getElementById('langkahLangkah').innerText = langkah;
}

function eksekusi() {
    hideNumpad();
    if (mode === 'biasaKeCampur') {
        hitung();
    } else if (mode === 'campurKeBiasa') {
        hitungCampur();
    }
}             

function resetconv() {
    hideNumpad();
    document.querySelectorAll('.input-conv').forEach(i => i.value = "");
    document.getElementById('langkahLangkah').innerText = "Masukkan angka untuk melihat langkah penyelesaian...";
}
// GLOBAL BULLETPROOF SECURITY LAYER
(function() {
    window.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); }, true);
    window.addEventListener('keydown', function(e) {
        if (e.key === 'F12') { e.preventDefault(); e.stopPropagation(); }
        if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) { e.preventDefault(); e.stopPropagation(); }
        if (e.ctrlKey && ['U', 'S', 'A', 'C'].includes(e.key.toUpperCase())) { e.preventDefault(); e.stopPropagation(); }
    }, true);
})();
