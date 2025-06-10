<template>
    <AppHeader />
    <div class="bg-white min-h-screen font-sans">

        <!-- Konten Utama Halaman Pembayaran -->
        <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">

                <!-- Produk Dipesan -->
                <section class="mb-8">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-1">Produk Dipesan</h2>
                    <div class="text-sm text-gray-500 mb-6 flex justify-end space-x-8 sm:space-x-16 pr-4">
                        <span>Harga Satuan</span>
                        <span>Jumlah</span>
                        <span>Subtotal Produk</span>
                    </div>

                    <div class="border rounded-lg p-4">
                        <h3 class="text-md font-semibold text-gray-700 mb-3">Toko Tani Makmur</h3>
                        <div v-for="item in orderDetails.items" :key="item.id"
                            class="flex flex-col sm:flex-row items-start sm:items-center py-3 border-b last:border-b-0">
                            <img :src="item.imageUrl" :alt="item.name"
                                class="w-20 h-20 sm:w-16 sm:h-16 rounded object-cover mb-3 sm:mb-0 sm:mr-4">
                            <div class="flex-grow mb-3 sm:mb-0">
                                <p class="font-medium text-gray-800">{{ item.name }}</p>
                            </div>
                            <div class="flex sm:space-x-8 sm:space-x-16 w-full sm:w-auto text-sm">
                                <div class="w-1/3 sm:w-auto sm:min-w-[80px] text-left sm:text-right">{{
                                    formatCurrency(item.price) }}</div>
                                <div class="w-1/3 sm:w-auto sm:min-w-[50px] text-center sm:text-right">{{ item.quantity
                                    }}</div>
                                <div class="w-1/3 sm:w-auto sm:min-w-[100px] text-right font-semibold">{{
                                    formatCurrency(item.price * item.quantity) }}</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Alamat Pengiriman -->
                <section class="mb-8">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Alamat Pengiriman</h2>
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p class="font-semibold text-gray-700">{{ orderDetails.shippingAddress.name }}</p>
                        <p class="text-sm text-gray-600">{{ orderDetails.shippingAddress.phone }}</p>
                        <p class="text-sm text-gray-600 leading-relaxed">
                            {{ orderDetails.shippingAddress.addressLine1 }},
                            {{ orderDetails.shippingAddress.addressLine2 }},
                            {{ orderDetails.shippingAddress.city }},
                            {{ orderDetails.shippingAddress.province }} {{ orderDetails.shippingAddress.postalCode }}
                        </p>
                    </div>
                </section>

                <!-- Opsi Pengiriman -->
                <section class="mb-8">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Opsi Pengiriman</h2>
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <p class="text-gray-700">{{ orderDetails.shippingOption.provider }}</p>
                        <p class="font-semibold text-gray-800">{{ formatCurrency(orderDetails.shippingOption.cost) }}
                        </p>
                    </div>
                </section>

                <!-- Metode Pembayaran -->
                <section class="mb-8">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">Metode Pembayaran</h2>
                    <div class="max-w-xs">
                        <select v-model="selectedPaymentMethod"
                            class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150">
                            <option v-for="method in paymentMethods" :key="method.value" :value="method.value">
                                {{ method.name }}
                            </option>
                        </select>
                    </div>
                </section>

                <!-- Ringkasan Pembayaran & Tombol Aksi -->
                <section class="mt-10 pt-6 border-t">
                    <div class="flex justify-end items-center mb-6">
                        <span class="text-lg font-medium text-gray-700 mr-4">Total Pembayaran:</span>
                        <span class="text-2xl font-bold text-teal-600">{{ formatCurrency(calculateTotalPayment())
                            }}</span>
                    </div>
                    <div class="flex justify-end">
                        <button @click="processPayment"
                            class="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                            Bayar Sekarang
                        </button>
                    </div>
                </section>

            </div>
        </main>
    </div>
    <AppFooter />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Data dummy untuk detail pesanan
const orderDetails = ref({
    items: [
        {
            id: 'prod1',
            name: 'Tani Makmur - Beras Premium Grade A',
            price: 17000,
            quantity: 1,
            imageUrl: 'https://placehold.co/100x100/fafafa/333?text=Beras',
        },
        // Anda bisa menambahkan item lain di sini jika ada
    ],
    shippingAddress: {
        name: 'Maria Tiahahu',
        phone: '(+62) 878-3858-1XXX',
        addressLine1: 'Jl. Dr. Wahidin Sudirohusodo No.34, RT.14/RW.04, Klitren',
        addressLine2: 'Kec. Gondokusuman',
        city: 'Kota Yogyakarta',
        province: 'Daerah Istimewa Yogyakarta',
        postalCode: '55222',
    },
    shippingOption: {
        provider: 'Mitra Jasa Ekspedisi Regular',
        cost: 5000,
    },
});

// Pilihan metode pembayaran
const paymentMethods = ref([
    { name: 'Transfer Bank', value: 'bank_transfer' },
    { name: 'Kartu Kredit/Debit', value: 'credit_card' },
    { name: 'GoPay', value: 'gopay' },
    { name: 'OVO', value: 'ovo' },
]);

const selectedPaymentMethod = ref('bank_transfer'); // Metode pembayaran default

// Fungsi untuk format mata uang
const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value).replace('Rp', 'Rp '); // Menambahkan spasi setelah Rp
};

// Fungsi untuk menghitung total pembayaran
const calculateTotalPayment = (): number => {
    const itemsTotal = orderDetails.value.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = orderDetails.value.shippingOption.cost;
    return itemsTotal + shippingCost;
};

// Fungsi dummy untuk proses pembayaran
const processPayment = () => {
    if (!selectedPaymentMethod.value) {
        alert('Silakan pilih metode pembayaran terlebih dahulu.');
        return;
    }
    alert(`Pembayaran sebesar ${formatCurrency(calculateTotalPayment())} dengan metode ${paymentMethods.value.find(m => m.value === selectedPaymentMethod.value)?.name} akan diproses.`);
    // Di sini Anda akan mengimplementasikan logika pengiriman data ke backend,
    // navigasi ke halaman sukses, atau menampilkan modal pembayaran.
    console.log({
        orderDetails: orderDetails.value,
        selectedPaymentMethod: selectedPaymentMethod.value,
        totalAmount: calculateTotalPayment(),
    });
};

// Set judul halaman
useHead({
    title: 'Halaman Pembayaran - DABE',
    meta: [
        { name: 'description', content: 'Selesaikan pembayaran pesanan Anda di DABE.' }
    ]
});
</script>

<style scoped>
/* Anda bisa menambahkan gaya kustom tambahan di sini jika kelas Tailwind tidak cukup */
/* Contoh:
.font-sans {
  font-family: 'Inter', sans-serif; // Pastikan font Inter sudah di-setup di tailwind.config.js atau di-import global
}
*/
</style>
