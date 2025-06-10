<template>
    <Doughnut :data="chartData" :options="chartOptions" :plugins="plugins" />
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartData = {
    labels: ['Bantul', 'Sleman', 'Gunungkidul', 'Kulon Progo', 'Yogyakarta'],
    datasets: [
        {
            backgroundColor: ['#a78bfa', '#60a5fa', '#2dd4bf', '#f472b6', '#fb923c'], // violet-400, blue-400, teal-400, pink-400, orange-400
            data: [79059, 64059, 45059, 75059, 55823],
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Stok Beras per ton Prov DIY'
        },
        legend: {
            position: 'right',
        },
    },
};

// Plugin kustom untuk menulis teks di tengah Donut Chart
const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
        if (chart.data.datasets.length === 0 || chart.data.datasets[0].data.length === 0) {
            return; // Tidak ada data untuk ditampilkan
        }

        const ctx = chart.ctx;
        // Gunakan chart.canvas.width/height untuk dimensi piksel canvas aktual
        const { width, height } = chart.canvas; 
        const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);

        ctx.restore(); // Kembalikan ke state default (font, warna, dll.)

        let fontSize;
        let textX, textY; // Variabel untuk posisi teks

        const datasetMeta = chart.getDatasetMeta(0);
        // Periksa apakah elemen chart (arcs) tersedia
        if (datasetMeta && datasetMeta.data && datasetMeta.data.length > 0) {
            const firstArc = datasetMeta.data[0];
            textX = firstArc.x; // Gunakan koordinat x dari pusat arc sebagai pusat X teks
            textY = firstArc.y; // Gunakan koordinat y dari pusat arc sebagai pusat Y teks

            // Hitung ukuran font, menggunakan logika yang sudah ada
            // Prioritaskan innerRadius jika valid
            if (typeof firstArc.innerRadius === 'number' && firstArc.innerRadius > 0) {
                fontSize = Math.max(10, firstArc.innerRadius * 0.35);
            } else {
                // Fallback jika innerRadius tidak valid (misalnya pie chart atau data arc tanpa innerRadius)
                fontSize = Math.max(10, Math.min(width, height) / 20);
            }
        } else {
            // Fallback posisi dan ukuran font jika tidak ada data arc (seharusnya tidak terjadi jika chart render)
            textX = width / 2;
            textY = height / 2;
            fontSize = Math.max(10, Math.min(width, height) / 20); // Ukuran fallback yang lebih konservatif
        }
        
        fontSize = Math.floor(fontSize); // Gunakan nilai piksel integer untuk ukuran font
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center'; // Memudahkan penempatan di tengah
        ctx.fillStyle = '#4A5568'; // Warna abu-abu gelap (Tailwind gray-700) agar lebih lembut
        const text = total.toLocaleString('id-ID');
        ctx.fillText(text, textX, textY);
        ctx.save(); // Simpan state konteks setelah menggambar
    },
};

const plugins = [centerTextPlugin];
</script>