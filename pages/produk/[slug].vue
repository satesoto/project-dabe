<template>
    <div class="bg-gray-100 min-h-screen py-8">
        <div class="container mx-auto px-4 max-w-4xl">
            <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div class="flex flex-col md:flex-row gap-6">
                    <div class="w-full md:w-1/3 flex-shrink-0">
                        <img :src="product.imageUrl" alt="Gambar Produk" class="rounded-lg w-full object-cover">
                    </div>

                    <div class="w-full md:w-2/3">
                        <h1 class="text-2xl font-bold text-gray-800">{{ product.name }}</h1>
                        <div class="flex items-center mt-2">
                            <StarRating :rating="product.rating" />
                            <span class="text-sm text-gray-500 ml-2">({{ product.reviewCount }} Penilaian)</span>
                        </div>
                        <p class="text-3xl font-bold text-teal-600 my-4">{{ formatCurrency(product.price) }}</p>

                        <h2 class="text-md font-semibold text-gray-700">Deskripsi Produk:</h2>
                        <ul class="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                            <li v-for="(desc, index) in product.description" :key="index">{{ desc }}</li>
                        </ul>

                        <div class="flex items-center gap-4 mt-6">
                            <button
                                class="w-full border border-teal-600 text-teal-600 py-2 px-4 rounded-lg hover:bg-teal-50">
                                Masukkan Keranjang
                            </button>
                            <button class="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700">
                                Beli Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between">
                <div class="flex items-center mb-4 md:mb-0">
                    <img :src="seller.avatarUrl" alt="Avatar Penjual" class="w-16 h-16 rounded-full mr-4 border">
                    <div>
                        <p class="font-bold text-gray-800">{{ seller.name }}</p>
                        <div class="flex items-center gap-2 mt-1">
                            <button class="text-sm border border-gray-300 py-1 px-3 rounded-md hover:bg-gray-100">Chat
                                Sekarang</button>
                            <button
                                class="text-sm border border-gray-300 py-1 px-3 rounded-md hover:bg-gray-100">Kunjungi
                                Toko</button>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-x-6 text-center md:text-left">
                    <div>
                        <span class="text-sm text-gray-500">Penilaian</span>
                        <p class="font-bold text-teal-600">{{ seller.stats.rating }}</p>
                    </div>
                    <div>
                        <span class="text-sm text-gray-500">Produk</span>
                        <p class="font-bold text-teal-600">{{ seller.stats.products }}</p>
                    </div>
                    <div>
                        <span class="text-sm text-gray-500">Bergabung</span>
                        <p class="font-bold text-teal-600">{{ seller.stats.joined }}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Spesifikasi Produk</h2>
                <div class="space-y-3">
                    <div v-for="spec in product.specifications" :key="spec.name"
                        class="flex flex-col md:flex-row text-sm">
                        <p class="w-full md:w-1/3 text-gray-500">{{ spec.name }}</p>
                        <p class="w-full md:w-2/3 text-gray-800 font-medium">{{ spec.value }}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div class="flex items-center mb-4">
                    <h2 class="text-xl font-bold text-gray-800 mr-4">Penilaian Produk</h2>
                    <div class="flex items-center bg-gray-100 px-2 py-1 rounded-md">
                        <StarRating :rating="product.rating" :show-text="true" />
                    </div>
                </div>

                <div class="space-y-6">
                    <div v-for="review in reviews" :key="review.id" class="border-b pb-6 last:border-b-0 last:pb-0">
                        <div class="flex">
                            <img :src="review.user.avatarUrl" class="w-10 h-10 rounded-full mr-4">
                            <div>
                                <p class="text-sm font-semibold">{{ review.user.name }}</p>
                                <StarRating :rating="review.rating" />
                                <p class="text-sm text-gray-600 mt-2">{{ review.comment }}</p>
                                <img v-if="review.imageUrl" :src="review.imageUrl"
                                    class="mt-2 w-20 h-20 rounded-md object-cover">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                    class="p-2 w-10 h-10 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-200">4</button>
                <span class="p-2 w-10 h-10 flex items-center justify-center text-gray-500">...</span>
                <button
                    class="p-2 w-10 h-10 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-200">
                    &gt;
                </button>
            </div>

        </div>
    </div>
</template>

<script>
// Komponen untuk menampilkan rating bintang, bisa dibuat file terpisah
const StarRating = {
    props: {
        rating: { type: Number, default: 0 },
        showText: { type: Boolean, default: false }
    },
    template: `
    <div class="flex items-center">
      <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
      <span v-if="showText" class="text-yellow-500 font-bold text-sm ml-2">{{ rating.toFixed(1) }}</span>
    </div>
  `
};

export default {
    components: {
        StarRating
    },
    data() {
        return {
            product: {
                name: 'Tani Makmur - Beras Premium Grade A',
                rating: 4.8,
                reviewCount: 366,
                price: 17000,
                imageUrl: 'https://images.unsplash.com/photo-1586201375765-c124a2736173?q=80&w=800',
                description: [
                    'Jenis Beras: Pandan Wangi (tersedia juga Setra Ramos, Pera, & Basmati)',
                    'Bahan Kimia: Tanpa Pewangi / Pemutih / Klorin',
                    'Kemasan: 5 Kg & 10 Kg',
                    'Karakteristik: Pulen & Harum',
                    'Tingkat Patah: < 5%',
                    'Diproses Higienis',
                    'Cocok untuk Konsumsi Harian & Usaha Kuliner',
                ],
                specifications: [
                    { name: 'Jenis Beras', value: 'Pandan Wangi Super' },
                    { name: 'Grade', value: 'Premium (Sortasi 95% - Minim Patah Dan Menir)' },
                    { name: 'Warna Beras', value: 'Putih Bersih Alami' },
                    { name: 'Masa Simpan Beras', value: '6-12 Bulan (Disarankan Disimpan Di Tempat Kering & Sejuk)' },
                    { name: 'Cocok Untuk', value: 'Konsumsi Rumah Tangga, Katering, Restoran, Hotel' },
                ]
            },
            seller: {
                name: 'Tani Makmur',
                avatarUrl: 'https://via.placeholder.com/100',
                stats: {
                    rating: '18rb',
                    products: 20,
                    joined: '1 Tahun Lalu'
                }
            },
            reviews: [
                {
                    id: 1,
                    user: { name: 'Salsabila', avatarUrl: 'https://via.placeholder.com/100' },
                    rating: 5,
                    comment: 'Sudah Cekas Masak, Hasilnya Bagus, Tidak Lengket Dan Pulen, Cuman Kurang Sedikit Di Aromanya Menurut Saya.',
                    imageUrl: 'https://images.unsplash.com/photo-1586201375765-c124a2736173?q=80&w=200',
                },
                {
                    id: 2,
                    user: { name: 'sriiyani', avatarUrl: 'https://via.placeholder.com/100' },
                    rating: 5,
                    comment: 'Sudah beberapa kali beli, Gak Kecewa Kualitasnya selalu konsisten, masaknya Cepat, Matang dan Rasanya enak!',
                    imageUrl: 'https://images.unsplash.com/photo-1586201375765-c124a2736173?q=80&w=200',
                },
                {
                    id: 3,
                    user: { name: 'Mahendra', avatarUrl: 'https://via.placeholder.com/100' },
                    rating: 5,
                    comment: 'Berasnya Pulen, Wangi, Dan Bersih. Anak-Anak Di Rumah Jadi Makin Lahap makannya, Pasti Langganan Beli Di Sini Terus.',
                    imageUrl: 'https://images.unsplash.com/photo-1586201375765-c124a2736173?q=80&w=200',
                },
            ]
        };
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
        }
    }
}
</script>

<style scoped>
/* Anda bisa menambahkan style scoped di sini jika diperlukan */
/* Misalnya, untuk memastikan gambar di ringkasan produk memiliki rasio aspek yang baik */
.aspect-square {
    aspect-ratio: 1 / 1;
}
</style>