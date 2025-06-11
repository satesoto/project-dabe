<template>
    <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = {
    labels: ['Bantul', 'Sleman', 'Gunungkidul', 'Kulon Progo', 'Yogyakarta'],
    datasets: [
        {
            label: '2022',
            backgroundColor: '#f87171', // red-400
            data: [12200, 12400, 12100, 11900, 12500]
        },
        {
            label: '2023',
            backgroundColor: '#a78bfa', // violet-400
            data: [12800, 13000, 12700, 12600, 13100]
        },
        {
            label: '2024',
            backgroundColor: '#60a5fa', // blue-400
            data: [13500, 13800, 13300, 13200, 14000]
        }
    ]
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Peta Harga Beras Provinsial DIY'
        },
        legend: {
            position: 'bottom',
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
};
</script>