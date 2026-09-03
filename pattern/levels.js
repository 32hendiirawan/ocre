// levels.js
const CUSTOM_LEVELS = [
    {
        id: 1,
        tipe: "Pola ini selalu ditambah 1 setiap bergeser ke kanan (+1).",
        sequence: [1, 2, 3, 4, 5], 
        targetIdx: 3, 
        jawaban: 4,
        opsi_lain: [3, 5, 6]
    },
    {
        id: 2,
        tipe: "Pola ini selalu ditambah 2 setiap bergeser ke kanan (+2).",
        sequence: [1, 3, 5, 7, 9], 
        targetIdx: 3, 
        jawaban: 7,
        opsi_lain: [5, 6, 8]
    },
    {
        id: 3,
        tipe: "Pola ini selalu ditambah 3 setiap bergeser ke kanan (+3).",
        sequence: [2, 5, 8, 11, 14], 
        targetIdx: 3, 
        jawaban: 11,
        opsi_lain: [9, 10, 12]
    },
    {
        id: 4,
        tipe: "Pola ini selalu dikurangi 2 setiap bergeser ke kanan (-2).",
        sequence: [17, 15, 13, 11, 9], 
        targetIdx: 2, 
        jawaban: 13,
        opsi_lain: [12, 14, 15]
    },
    {
        id: 5,
        tipe: "Pola ini selalu dikurangi 3 setiap bergeser ke kanan (-3).",
        sequence: [21, 18, 15, 12, 9], 
        targetIdx: 2, 
        jawaban: 15,
        opsi_lain: [13, 14, 16]
    },
    {
        id: 6,
        tipe: "Pola ini selalu dikurangi 5 setiap bergeser ke kanan (-5).",
        sequence: [23, 18, 13, 8, 3], 
        targetIdx: 2, 
        jawaban: 13,
        opsi_lain: [11, 12, 14]
    },
    {
        id: 7,
        tipe: "Pola ini dikali 2 setiap bergeser ke kanan (x2).",
        sequence: [3, 6, 12, 24, 48],
        targetIdx: 3, 
        jawaban: 24,
        opsi_lain: [21, 22, 25]
    },
    {
        id: 8,
        tipe: "Pola ini dikali 3 setiap bergeser ke kanan (x3).",
        sequence: [1, 3, 9, 27, 81],
        targetIdx: 3, 
        jawaban: 27,
        opsi_lain: [26, 28, 39]
    },
    {
        id: 9,
        tipe: "Pola ini dikali 5 setiap bergeser ke kanan (x5).",
        sequence: [2, 10, 50, 250, 1250],
        targetIdx: 3, 
        jawaban: 250,
        opsi_lain: [150, 200, 300]
    },
    {
        id: 10,
        tipe: "Pola ini dibagi 2 setiap bergeser ke kanan (:2).",
        sequence: [48, 24, 12, 6, 3],
        targetIdx: 2, 
        jawaban: 12,
        opsi_lain: [10, 14, 16]
    },
    {
        id: 11,
        tipe: "Pola ini dibagi 3 setiap bergeser ke kanan (:3).",
        sequence: [162, 54, 18, 6, 2],
        targetIdx: 2, 
        jawaban: 18,
        opsi_lain: [12, 15, 21]
    },
    {
        id: 12,
        tipe: "Pola ini dibagi 4 setiap bergeser ke kanan (:4).",
        sequence: [256, 64, 16, 4, 1],
        targetIdx: 2, 
        jawaban: 16,
        opsi_lain: [12, 20, 18]
    },
    {
        id: 13,
        tipe: "Pola ini adalah bilangan kuadrat.",
        sequence: [1, 4, 9, 16, 25],
        targetIdx: 3, 
        jawaban: 16,
        opsi_lain: [15, 17, 20]
    },
    {
        id: 14,
        tipe: "Polanya adalah 2n+1",
        gambar: "soal_lv5.png", // Nama file gambar atau URL gambar Anda
        sequence: [11], // Pola jumlah batang korek api per segitiga
        targetIdx: 0, // Target angka ke-4 (9) yang dikosongkan
        jawaban: 11,
        opsi_lain: [9, 10, 12]
    },
    {
        id: 15,
        tipe: "Polanya adalah n x (n + 1)",
        gambar: "soal_lv7.png", // Nama file gambar atau URL gambar Anda
        sequence: [30], // Pola jumlah batang korek api per segitiga
        targetIdx: 0, // Target angka ke-4 (9) yang dikosongkan
        jawaban: 30,
        opsi_lain: [25, 32, 36]
    },
    {
        id: 16,
        tipe: "Ini adalah pola segitiga dengan rumus n(n + 1)/2",
        gambar: "soal_lv8.png", // Nama file gambar atau URL gambar Anda
        sequence: [15], // Pola jumlah batang korek api per segitiga
        targetIdx: 0, // Target angka ke-4 (9) yang dikosongkan
        jawaban: 15,
        opsi_lain: [12, 18, 16]
    },
    {
        id: 17,
        tipe: "Polanya adalah +2, -1, +2, -1",
        sequence: [5, 7, 6, 8, 7],
        targetIdx: 4, 
        jawaban: 7,
        opsi_lain: [6, 9, 10]
    }
];
