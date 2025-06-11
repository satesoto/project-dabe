<template>
    <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const chartData = {
    labels: ['22-01', '22-03', '22-05', '22-07', '22-09', '22-11', '23-01', '23-03', '23-05'],
    datasets: [
        {
            label: 'Harga Beras',
            data: [12000, 12200, 12100, 12500, 12400, 12800, 13000, 13100, 13500],
            borderColor: '#3b82f6', // blue-500
            backgroundColor: '#3b82f6',
            yAxisID: 'y',
            tension: 0.4,
        },
        {
            label: 'Nilai Tukar',
            data: [14300, 14400, 14600, 14800, 14900, 15200, 15500, 15400, 15600],
            borderColor: '#ef4444', // red-500
            backgroundColor: '#ef4444',
            yAxisID: 'y1',
            tension: 0.4,
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    plugins: {
        title: {
            display: true,
            text: 'Perkembangan Harga Beras dan Nilai Tukar Rupiah (Jan 2022 - Mei 2023)',
        },
        legend: {
            position: 'top',
        }
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,
                text: 'Harga Beras (Rp)'
            }
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
                display: true,
                text: 'Nilai Tukar (IDR)'
            },
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
        },
    },
};
</script>