let currentInput = null;

// Atur Event Listener agar Numpad kustom aktif saat input diklik
document.querySelectorAll('.game-board input').forEach(input => {
    input.addEventListener('click', function(e) {
        e.stopPropagation(); // Mencegah bentrok event klik dokumen
        
        // Hapus kelas aktif dari input lama
        if(currentInput) currentInput.classList.remove('active-input');
        
        currentInput = this;
        currentInput.classList.add('active-input');
        
        // Munculkan numpad kustom
        document.getElementById('numpad').classList.add('show');
    });
});

// Sembunyikan numpad jika mengetuk area kosong di luar papan game
document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-numpad') && !e.target.closest('.game-board')) {
        hideNumpad();
    }
});

function pressNum(num) {
    if (currentInput) {
        // Batasi input maksimal 3 digit agar tidak merusak tata letak bubble mobile
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

/* ==================== LOGIKA KALKULASI ASLI ==================== */
function getGCD(x, y) {
    x = Math.abs(x); y = Math.abs(y);
    while (y) { var t = y; y = x % y; x = t; }
    return x;
}

function getLCM(x, y) {
    if (x === 0 || y === 0) return 0;
    return Math.abs(x * y) / getGCD(x, y);
}

function calculate() {
    hideNumpad();
    var a = parseInt(document.getElementById('a').value);
    var b = parseInt(document.getElementById('b').value);
    var c = parseInt(document.getElementById('c').value);
    var op = document.getElementById('op').value;
    var d = parseInt(document.getElementById('d').value);
    var e = parseInt(document.getElementById('e').value);
    var f = parseInt(document.getElementById('f').value);
    
    if (isNaN(a)) a = 0; 
    if (isNaN(d)) d = 0; 
    
    if (isNaN(b) || isNaN(c) || isNaN(e) || isNaN(f)) {
        alert("Ups! Lengkapi semua angka pecahan dulu ya!");
        return;
    }
    if (c === 0 || f === 0) {
        alert("Angka bawah (penyebut) tidak boleh 0 sayang!");
        return;
    }
    
    const lcm = getLCM(c, f);

    if(op === "+") {
        document.getElementById('result').innerHTML = `
        <table style="text-align: center">
            <tr><td rowspan="3">${a === 0 ? '' : a}</td><td>${b}</td><td rowspan="3">+</td><td rowspan="3">${d === 0 ? '' : d}</td><td>${e}</td></tr>
            <tr><td style="min-width:24px"><hr></td><td style="min-width:24px"><hr></td></tr>
            <tr><td>${c}</td><td>${f}</td></tr>
        </table>
        <table style="text-align: center">
            <tr><td rowspan="3">=</td><td>${a*c+b}</td><td rowspan="3">+</td><td>${d*f+e}</td></tr>
            <tr><td style="min-width:24px"><hr></td><td style="min-width:24px"><hr></td></tr> 
            <tr><td>${c}</td><td>${f}</td></tr>
            <tr><td rowspan=3>=</td><td>${(a*c+b)*(lcm/c)}</td><td rowspan="3">+</td><td>${(d*f+e)*(lcm/f)}</td></tr>
            <tr><td style="min-width:24px"><hr></td><td style="min-width:24px"><hr></td></tr>
            <tr><td>${lcm}</td><td>${lcm}</td></tr>
            <tr><td rowspan="3">=</td><td id="h">${((a*c+b)*(lcm/c))+((d*f+e)*(lcm/f))}</td></tr>
            <tr><td style="min-width:24px"><hr></td></tr>
            <tr><td id="i">${lcm}</td></tr>
        </table>`;
    }
    if(op === "-") {
        document.getElementById('result').innerHTML = `
        <table style="text-align: center">
            <tr><td rowspan="3">${a === 0 ? '' : a}</td><td>${b}</td><td rowspan="3">-</td><td rowspan="3">${d === 0 ? '' : d}</td><td>${e}</td></tr>
            <tr><td style="min-width:24px"><hr></td><td style="min-width:24px"><hr></td></tr> 
            <tr><td>${c}</td><td>${f}</td></tr>
        </table>
        <table style="text-align: center">
            <tr><td rowspan="3">=</td><td>${a*c+b}</td><td rowspan="3">-</td><td>${d*f+e}</td></tr>
            <tr><td style="min-width:24px"><hr></td><td style="min-width:24px"><hr></td></tr> 
            <tr><td>${c}</td><td>${f}</td></tr>
            <tr><td rowspan="3">=</td><td>${(a*c+b)*(lcm/c)}</td><td rowspan="3">-</td><td>${(d*f+e)*(lcm/f)}</td></tr>
            <tr><td style="min-width:24px"><hr></td><td style="min-width:24px"><hr></td></tr>
            <tr><td>${lcm}</td><td>${lcm}</td></tr>
            <tr><td rowspan="3">=</td><td id="h">${((a*c+b)*(lcm/c))-((d*f+e)*(lcm/f))}</td></tr>
            <tr><td style="min-width:24px"><hr></td></tr>
            <tr><td id="i">${lcm}</td></tr>
        </table>`;
    }
    if(op === "x") {
        document.getElementById('result').innerHTML = `
        <table style="text-align: center">
            <tr><td rowspan="3">${a === 0 ? '' : a}</td><td>${b}</td><td rowspan="3">×</td><td rowspan="3">${d === 0 ? '' : d}</td><td>${e}</td></tr>
            <tr><td style="min-width:24px"><hr></td><td style="min-width:24px"><hr></td></tr> 
            <tr><td>${c}</td><td>${f}</td></tr>
        </table>
        <table style="text-align: center">
            <tr><td rowspan="3">=</td><td>${a*c+b}</td><td rowspan="3">×</td><td>${d*f+e}</td></tr>
            <tr><td style="min-width:24px"><hr></td><td style="min-width:24px"><hr></td></tr> 
            <tr><td>${c}</td><td>${f}</td></tr>
            <tr><td rowspan="3">=</td><td id="h">${(a*c+b)*(d*f+e)}</td></tr>
            <tr><td style="min-width:24px"><hr></td></tr>
            <tr><td id="i">${c*f}</td></tr>
        </table>`;
    }
    if(op === ":") {
        document.getElementById('result').innerHTML = `
        <table style="text-align: center">
            <tr><td rowspan="3">${a === 0 ? '' : a}</td><td>${b}</td><td rowspan="3">÷</td><td rowspan="3">${d === 0 ? '' : d}</td><td>${e}</td></tr>
            <tr><td style="min-width:24px"><hr></td><td style="min-width:24px"><hr></td></tr> 
            <tr><td>${c}</td><td>${f}</td></tr>
        </table>
        <table style="text-align: center">
            <tr><td rowspan="3">=</td><td>${a*c+b}</td><td rowspan="3">÷</td><td>${d*f+e}</td></tr>
            <tr><td style="min-width:24px"><hr></td><td style="min-width:24px"><hr></td></tr> 
            <tr><td>${c}</td><td>${f}</td></tr>
            <tr><td rowspan="3">=</td><td>${(a*c+b)}</td><td rowspan="3">×</td><td>${f}</td></tr>
            <tr><td style="min-width:24px"><hr></td><td style="min-width:24px"><hr></td></tr>
            <tr><td>${c}</td><td>${d*f+e}</td></tr>
            <tr><td rowspan="3">=</td><td id="h">${(a*c+b)*f}</td></tr>
            <tr><td style="min-width:24px"><hr></td></tr>
            <tr><td id="i">${c*(d*f+e)}</td></tr>
        </table>`;
    }

    var h = parseInt(document.getElementById('h').innerText);
    var i = parseInt(document.getElementById('i').innerText);
    const fpb = getGCD(h, i);
    
    let finalH1 = ''; let finalH2 = ''; let finalH3 = '';

    if (h/i === Math.floor(h/i)){
        document.getElementById('result').innerHTML += `<table><tr><td>= ${h/i}</td></tr></table>`;
        finalH1 = h/i; finalH2 = '-'; finalH3 = '-';
    }
    else if (h/i >= 1) {
        var bulat = Math.floor(h/i);
        var pembilang = (h/fpb)-(bulat*(i/fpb));
        var penyebut = i/fpb;
        document.getElementById('result').innerHTML += `
        <table style="text-align: center">
            <tr><td rowspan="3">=</td><td rowspan="3">${bulat}</td><td>${pembilang}</td></tr>
            <tr><td style="min-width:24px"><hr></td></tr>
            <tr><td>${penyebut}</td></tr>
        </table>`;
        finalH1 = bulat; finalH2 = pembilang; finalH3 = penyebut;
    }
    else if (fpb > 1) {
        document.getElementById('result').innerHTML += `
        <table style="text-align: center">
            <tr><td rowspan="3">=</td><td>${h/fpb}</td></tr>
            <tr><td style="min-width:24px"><hr></td></tr>
            <tr><td>${i/fpb}</td></tr>
        </table>`;
        finalH1 = ''; finalH2 = h/fpb; finalH3 = i/fpb;
    } else {
        finalH1 = ''; finalH2 = h; finalH3 = i;
    }

    document.getElementById('ha').textContent = finalH1 === '' ? '' : finalH1;
    document.getElementById('hb').textContent = finalH2;
    document.getElementById('hc').textContent = finalH3;

    if(finalH1 === '') document.getElementById('ha').style.opacity = '0';
    else document.getElementById('ha').style.opacity = '1';

    document.getElementById('result-box').style.display = 'block';
}

function reset() {
    hideNumpad();
    document.getElementById('result-box').style.display = 'none';
    document.querySelectorAll('.game-board input').forEach(inpt => inpt.value = '');
    document.getElementById('op').value = '+';
    document.getElementById('ha').textContent = '...';
    document.getElementById('hb').textContent = '...';
    document.getElementById('hc').textContent = '...';
    document.getElementById('ha').style.opacity = '1';
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
