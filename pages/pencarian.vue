<template>
    <div class="bg-gray-50 min-h-screen">
        <div class="container mx-auto px-4 py-8">

            <div class="max-w-2xl mx-auto mb-8">
                <div class="relative">
                    <input type="search" v-model="searchQuery"
                        placeholder="Cari beras, pupuk, atau produk tani lainnya..."
                        class="w-full pl-4 pr-12 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-lg">
                    <button
                        class="absolute top-0 right-0 h-full px-5 text-white bg-teal-500 rounded-r-lg hover:bg-teal-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="mb-6 bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-600 mb-2 md:mb-0">
                    Menampilkan hasil untuk: <span class="font-bold text-gray-800">'{{ searchQuery }}'</span>
                </p>
                <div class="flex items-center gap-4">
                    <span class="text-sm text-gray-500">Urutkan:</span>
                    <select class="text-sm border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500">
                        <option>Relevansi</option>
                        <option>Terbaru</option>
                        <option>Harga Terendah</option>
                        <option>Harga Tertinggi</option>
                    </select>
                </div>
            </div>

            <div v-if="searchResults.length > 0"
                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

                <NuxtLink v-for="product in searchResults" :key="product.id" :to="`/produk/${product.id}`"
                    class="block">
                    <div
                        class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 group h-full">
                        <img :src="product.imageUrl" :alt="product.name" class="h-40 w-full object-cover">
                        <div class="p-4 flex flex-col">
                            <p class="text-sm text-gray-800 font-medium truncate group-hover:text-teal-600">{{
                                product.name }}</p>
                            <p class="text-lg font-bold text-gray-900 mt-1">{{ formatCurrency(product.price) }}</p>
                            <div class="mt-2 flex items-center">
                                <StarRating :rating="product.rating" />
                                <span class="text-xs text-gray-500 ml-2">({{ product.sold }})</span>
                            </div>
                            <div class="mt-3 flex items-center text-xs text-gray-500">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span>{{ product.sellerLocation }}</span>
                            </div>
                        </div>
                    </div>
                </NuxtLink>

            </div>
            <div v-else class="text-center bg-white p-10 rounded-lg">
                <p class="text-gray-600">Produk tidak ditemukan. Coba kata kunci lain.</p>
            </div>

            <div class="mt-8 flex justify-center">
                <div class="flex items-center justify-center space-x-1">
                    <button
                        class="p-2 w-10 h-10 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-200">
                        &lt;
                    </button>
                    <button
                        class="p-2 w-10 h-10 flex items-center justify-center rounded-md text-white bg-teal-600">1</button>
                    <button
                        class="p-2 w-10 h-10 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-200">2</button>
                    <button
                        class="p-2 w-10 h-10 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-200">3</button>
                    <button
                        class="p-2 w-10 h-10 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-200">
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Bagian <script> tidak ada perubahan
import { ref } from 'vue';

const StarRating = { props: { rating: { type: Number, default: 0 } }, template: `<div class="flex items-center"><svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></div>` };

const searchQuery = ref('Beras');
const searchResults = ref([
    { id: 1, name: 'Beras Premium Pandan Wangi Super 5kg', price: 68000, imageUrl: 'https://images.unsplash.com/photo-1586201375765-c124a2736173?q=80&w=400', rating: 4.8, sold: '1.2k', sellerLocation: 'Sleman' },
    { id: 2, name: 'Beras Merah Organik Pilihan', price: 35000, imageUrl: 'https://via.placeholder.com/400', rating: 4.9, sold: '876', sellerLocation: 'Bantul' },
    { id: 3, name: 'Beras Setra Ramos Wangi Alami 10kg', price: 125000, imageUrl: 'https://via.placeholder.com/400', rating: 4.7, sold: '2.4k', sellerLocation: 'Yogyakarta' },
    { id: 4, name: 'Pupuk NPK Mutiara 16-16-16 Repack 1kg', price: 15000, imageUrl: 'https://via.placeholder.com/400', rating: 4.9, sold: '5.1k', sellerLocation: 'Gunungkidul' },
    { id: 5, name: 'Beras Basmati Asli India', price: 45000, imageUrl: 'https://via.placeholder.com/400', rating: 4.8, sold: '450', sellerLocation: 'Sleman' },
    { id: 6, name: 'Beras Ketan Putih Kualitas Terbaik', price: 22000, imageUrl: 'https://via.placeholder.com/400', rating: 4.7, sold: '980', sellerLocation: 'Kulon Progo' },
]);

const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
</script>