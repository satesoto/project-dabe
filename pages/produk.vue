<template>
    <AppHeader  />
    <div class="bg-white min-h-screen font-sans">
        <!-- Konten Utama Halaman Detail Produk -->
        <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Bagian Detail Produk Utama -->
            <section class="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-8">
                <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    <!-- Kolom Gambar Produk -->
                    <div class="lg:w-2/5 flex justify-center items-start">
                        <img :src="product.imageUrl || 'https://placehold.co/400x400/fafafa/333?text=Gambar+Produk'"
                            :alt="product.name" class="rounded-lg object-contain w-full max-w-md lg:max-w-none">
                    </div>

                    <!-- Kolom Informasi Produk -->
                    <div class="lg:w-3/5">
                        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{{ product.name }}</h1>
                        <div class="flex items-center mb-3 text-sm">
                            <div class="flex items-center text-yellow-500">
                                <span v-for="n in 5" :key="`star-${n}`" class="h-5 w-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        :class="{ 'text-yellow-400': n <= product.rating, 'text-gray-300': n > product.rating }">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </span>
                            </div>
                            <span class="ml-2 text-gray-600">{{ product.rating.toFixed(1) }}</span>
                            <span class="mx-2 text-gray-400">|</span>
                            <span class="text-gray-600">{{ product.reviewsCount }} Penilaian</span>
                            <span class="mx-2 text-gray-400">|</span>
                            <span class="text-gray-600">{{ product.soldCount }} Terjual</span>
                        </div>
                        <div class="bg-gray-100 p-4 rounded-md mb-4">
                            <p class="text-3xl font-bold text-teal-600">{{ formatCurrency(product.price) }}</p>
                        </div>

                        <div class="mb-4">
                            <h3 class="text-sm font-semibold text-gray-700 mb-1">Deskripsi Produk:</h3>
                            <ul class="list-disc list-inside text-sm text-gray-600 space-y-1 pl-1">
                                <li v-for="(desc, index) in product.description" :key="`desc-${index}`">{{ desc }}</li>
                            </ul>
                        </div>

                        <!-- Quantity Selector -->
                        <div class="mb-6">
                            <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
                            <div class="flex items-center max-w-[120px]">
                                <button @click="decreaseQuantity"
                                    class="px-3 py-1.5 border border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none">-</button>
                                <input type="number" id="quantity" v-model.number="quantity"
                                    class="w-12 text-center border-t border-b border-gray-300 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    min="1">
                                <button @click="increaseQuantity"
                                    class="px-3 py-1.5 border border-gray-300 rounded-r-md hover:bg-gray-100 focus:outline-none">+</button>
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-3">
                            <button
                                class="flex-1 sm:flex-auto w-full sm:w-auto justify-center items-center px-6 py-3 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-150">
                                <span class="mr-2">🛒</span> Masukkan Keranjang
                            </button>
                            <button
                                class="flex-1 sm:flex-auto w-full sm:w-auto justify-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50 transition duration-150">
                                Beli Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Bagian Informasi Penjual -->
            <section class="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-8">
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <img :src="seller.avatarUrl || 'https://placehold.co/60x60/EBF4FF/777?text=S'" alt="Avatar Penjual"
                        class="w-16 h-16 rounded-full object-cover border-2 border-gray-200">
                    <div class="flex-grow">
                        <h3 class="text-lg font-semibold text-gray-800">{{ seller.name }}</h3>
                        <div class="flex space-x-3 mt-1">
                            <button
                                class="px-4 py-1.5 border border-gray-300 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition duration-150">
                                💬 Chat Sekarang
                            </button>
                            <button
                                class="px-4 py-1.5 border border-gray-300 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition duration-150">
                                🏪 Kunjungi Toko
                            </button>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-x-4 gap-y-1 text-sm text-gray-600 pt-2 sm:pt-0 w-full sm:w-auto">
                        <span class="text-gray-500">Penilaian</span> <span
                            class="text-teal-600 font-medium col-span-2 sm:col-span-1">{{ seller.stats.rating }}</span>
                        <span class="text-gray-500">Produk</span> <span
                            class="text-teal-600 font-medium col-span-2 sm:col-span-1">{{ seller.stats.products
                            }}</span>
                        <span class="text-gray-500">Bergabung</span> <span
                            class="text-teal-600 font-medium col-span-2 sm:col-span-1">{{ seller.stats.joined }}</span>
                    </div>
                </div>
            </section>

            <!-- Bagian Spesifikasi Produk -->
            <section class="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-8">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Spesifikasi Produk</h2>
                <div class="bg-gray-50 p-4 rounded-md">
                    <!-- Isi dengan spesifikasi produk, contoh: -->
                    <ul class="space-y-2 text-sm text-gray-700">
                        <li v-for="(spec, index) in product.specifications" :key="`spec-${index}`">
                            <span class="font-medium text-gray-600">{{ spec.name }}:</span> {{ spec.value }}
                        </li>
                        <li><span class="font-medium text-gray-600">Stok:</span> {{ product.stock }}</li>
                    </ul>
                </div>
            </section>

            <!-- Bagian Penilaian Produk -->
            <section class="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Penilaian Produk</h2>
                <div class="bg-gray-50 p-4 rounded-md mb-6">
                    <div class="flex items-center">
                        <span class="text-3xl font-bold text-yellow-500">{{ product.rating.toFixed(1) }}</span>
                        <span class="text-gray-600 ml-2">dari 5</span>
                    </div>
                    <!-- Filter bintang bisa ditambahkan di sini jika perlu -->
                </div>
                <!-- Daftar ulasan (placeholder) -->
                <div class="space-y-4">
                    <p class="text-center text-gray-500 py-4">Belum ada ulasan untuk produk ini.</p>
                    <!-- Contoh Ulasan:
          <div v-for="n in 2" :key="`review-${n}`" class="border-b pb-4 last:border-b-0">
            <div class="flex items-center mb-1">
              <img src="https://placehold.co/32x32" alt="User avatar" class="w-8 h-8 rounded-full mr-2">
              <span class="font-semibold text-sm">Nama Pengulas</span>
            </div>
            <div class="flex items-center text-yellow-400 mb-1">
              <span v-for="s in 5" :key="`rev-star-${s}`" class="h-4 w-4">...ikon bintang...</span>
            </div>
            <p class="text-sm text-gray-700">Komentar ulasan produk...</p>
          </div>
          -->
                </div>
                <!-- Pagination (placeholder) -->
                <nav class="mt-6 flex justify-center items-center space-x-1 text-sm">
                    <a href="#" class="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-200">‹</a>
                    <a href="#" class="px-3 py-1 rounded-md bg-teal-500 text-white">1</a>
                    <a href="#" class="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">2</a>
                    <a href="#" class="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">3</a>
                    <a href="#" class="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200">4</a>
                    <span class="px-3 py-1 text-gray-500">...</span>
                    <a href="#" class="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-200">›</a>
                </nav>
            </section>
        </main>
    </div>
    <AppFooter />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// import { useRoute } from 'vue-router'; // Jika mengambil ID dari rute

// const route = useRoute();
// const productId = computed(() => route.params.id);

// Data dummy untuk produk
const product = ref({
    id: 'beras-premium-grade-a',
    name: 'Tani Makmur - Beras Premium Grade A',
    rating: 4.8,
    reviewsCount: 180,
    soldCount: 500, // Tambahan data
    price: 17000,
    imageUrl: 'https://placehold.co/600x600/FFFFFF/333333?text=Beras+Premium', // Ganti dengan URL gambar beras
    description: [
        'Diproses dari Padi Pilihan Langsung dari Petani, Bebas Pewangi & Pemutih.',
        'Tekstur Nasi Pulen, Harum Alami Selera Indonesia.',
        'Cocok Untuk Masakan Rumahan Maupun Bisnis Kuliner.',
        'Kemasan 5 Kg & 10 Kg.',
        'Amanah Kualitasnya.',
        'Pulen & Bersih.',
        'Tanpa Pengawet.',
        'Cocok Untuk Konsumsi Sendiri & Usaha Kuliner.',
    ],
    specifications: [
        { name: 'Merek', value: 'Tani Makmur' },
        { name: 'Jenis Beras', value: 'Premium IR64' },
        { name: 'Kemasan', value: '5 Kg / 10 Kg' },
        { name: 'Asal Produk', value: 'Lokal' },
    ],
    stock: 120, // Tambahan data
});

// Data dummy untuk penjual
const seller = ref({
    name: 'Tani Makmur',
    avatarUrl: 'https://placehold.co/80x80/EBF4FF/777?text=TM',
    stats: {
        rating: '4.8 / 5.0 (180 Penilaian)',
        products: 28,
        joined: '1 Tahun Lalu',
    },
});

const quantity = ref(1);

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value).replace('Rp', 'Rp ');
};

const increaseQuantity = () => {
    if (quantity.value < product.value.stock) {
        quantity.value++;
    }
};

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

// Set judul halaman berdasarkan nama produk
useHead({
    title: () => `${product.value.name || 'Detail Produk'} - DABE`,
    meta: [
        { name: 'description', content: () => `Detail untuk produk ${product.value.name}. ${product.value.description.join(' ')}` }
    ]
});

// Fetch data produk berdasarkan productId jika ini adalah halaman dinamis
// onMounted(async () => {
//   // Contoh fetch data (gantilah dengan API call Anda)
//   // try {
//   //   const fetchedProduct = await $fetch(`/api/products/${productId.value}`);
//   //   if (fetchedProduct) {
//   //     product.value = fetchedProduct; // Update data produk
//   //     // seller.value = fetchedProduct.seller; // Update data penjual jika ada
//   //   }
//   // } catch (error) {
//   //   console.error("Failed to fetch product details:", error);
//   //   // Handle error, misalnya redirect ke halaman 404
//   // }
// });

</script>

<style scoped>
/* Gaya spesifik jika diperlukan */
.font-sans {
    font-family: 'Inter', sans-serif;
    /* Pastikan font Inter sudah di-setup */
}

/* Untuk menyembunyikan panah di input number */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type='number'] {
    -moz-appearance: textfield;
}
</style>
