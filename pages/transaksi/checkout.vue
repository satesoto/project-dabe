<template>
    <div class="bg-gray-100 min-h-screen py-8">
        <div class="container mx-auto px-4 max-w-4xl">

            <div class="flex justify-between items-center mb-4">
                <div class="flex border-b">
                    <button class="py-2 px-4 text-teal-600 border-b-2 border-teal-600 font-semibold">Belum
                        dibayar</button>
                    <button class="py-2 px-4 text-gray-500 hover:text-teal-600">Beri penilaian</button>
                </div>
                <div class="relative w-1/3">
                    <input type="search" placeholder="Cari..."
                        class="w-full pl-4 pr-10 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-teal-300">
                    <button class="absolute top-0 right-0 h-full px-3 text-white bg-teal-500 rounded-r-md">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm p-6">
                <div v-if="cart.length > 0" class="space-y-6">

                    <div v-for="(seller, sellerIndex) in cart" :key="seller.id">
                        <div class="border-b pb-4">
                            <div class="flex items-center mb-4">
                                <input type="checkbox" class="h-5 w-5 rounded text-teal-600 focus:ring-teal-500"
                                    v-model="sellerCheckboxes[sellerIndex]">
                                <h2 class="ml-3 font-bold text-gray-800">{{ seller.name }}</h2>
                            </div>

                            <div class="space-y-4">
                                <div v-for="item in seller.items" :key="item.id"
                                    class="flex flex-col md:flex-row items-center gap-4 pl-8">
                                    <input type="checkbox" class="h-5 w-5 rounded text-teal-600 focus:ring-teal-500"
                                        v-model="item.selected">

                                    <img :src="item.imageUrl" alt="Produk"
                                        class="w-20 h-20 object-cover rounded-md border">

                                    <div class="flex-grow text-center md:text-left">
                                        <p class="text-gray-700">{{ item.name }}</p>
                                    </div>

                                    <p class="w-24 text-center font-semibold text-gray-800">{{
                                        formatCurrency(item.price) }}</p>

                                    <div class="flex items-center border rounded-md">
                                        <button @click="decreaseQuantity(item)"
                                            class="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                                        <input type="text" class="w-12 text-center border-l border-r focus:outline-none"
                                            :value="item.quantity" readonly>
                                        <button @click="increaseQuantity(item)"
                                            class="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                                    </div>

                                    <button @click="removeItem(seller, item)" class="text-gray-400 hover:text-red-500">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center text-gray-500 py-10">
                    <p>Keranjang belanja Anda kosong.</p>
                </div>
            </div>

            <div class="sticky bottom-0 mt-6 bg-white shadow-lg p-4 border-t rounded-lg flex justify-end items-center">
                <div class="flex items-center">
                    <span class="text-gray-600 mr-2">Total</span>
                    <span class="text-2xl font-bold text-teal-600">{{ formatCurrency(totalPrice) }}</span>
                </div>
                <button class="ml-6 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-8 rounded-lg">
                    Checkout
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// --- DATA KERANJANG (Contoh) ---
// Dalam aplikasi nyata, data ini akan datang dari state management (Vuex/Pinia) atau API
const cart = ref([
    {
        id: 'seller1',
        name: 'Toko Tani Makmur',
        items: [
            {
                id: 'prod1',
                name: 'Tani Makmur - Beras Premium Grade A',
                price: 17000,
                quantity: 1,
                imageUrl: 'https://images.unsplash.com/photo-1586201375765-c124a2736173?q=80&w=200',
                selected: true, // Item ini dipilih secara default
            },
        ],
    },
    {
        id: 'seller2',
        name: 'Toko Tani Raya',
        items: [
            {
                id: 'prod2',
                name: 'Tani Raya - Pupuk Organik Super',
                price: 25000,
                quantity: 2,
                imageUrl: 'https://via.placeholder.com/200',
                selected: false,
            },
            {
                id: 'prod3',
                name: 'Tani Raya - Bibit Cabai Unggul',
                price: 12000,
                quantity: 1,
                imageUrl: 'https://via.placeholder.com/200',
                selected: true,
            },
        ],
    },
]);

// --- LOGIKA & FUNGSI ---

// Computed property untuk menghitung total harga dari item yang dipilih
const totalPrice = computed(() => {
    return cart.value.reduce((total, seller) => {
        const sellerTotal = seller.items.reduce((sellerAcc, item) => {
            return item.selected ? sellerAcc + (item.price * item.quantity) : sellerAcc;
        }, 0);
        return total + sellerTotal;
    }, 0);
});

// Helper untuk format mata uang
const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0 }).format(value);
};

// Fungsi untuk menambah kuantitas
const increaseQuantity = (item) => {
    item.quantity++;
};

// Fungsi untuk mengurangi kuantitas
const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
        item.quantity--;
    }
};

// Fungsi untuk menghapus item
const removeItem = (seller, itemToRemove) => {
    seller.items = seller.items.filter(item => item.id !== itemToRemove.id);
    // Jika toko menjadi kosong setelah item dihapus, hapus juga tokonya
    if (seller.items.length === 0) {
        cart.value = cart.value.filter(s => s.id !== seller.id);
    }
};

// Computed property untuk mengelola checkbox per toko
const sellerCheckboxes = computed(() => {
    return cart.value.map(seller => {
        const allSelected = seller.items.length > 0 && seller.items.every(item => item.selected);
        return {
            get: () => allSelected,
            set: (value) => {
                seller.items.forEach(item => {
                    item.selected = value;
                });
            }
        };
    });
});
</script>