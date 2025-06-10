<template>
    <AppHeader />
    <div class="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4">
        <div class="max-w-2xl w-full bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h1 class="text-2xl font-semibold text-gray-800 mb-6">Nilai Produk</h1>

            <div class="flex items-center mb-6">
                <img :src="product.imageUrl" class="w-16 h-16 rounded-md object-cover border" alt="Produk">
                <p class="ml-4 font-medium text-gray-700">{{ product.name }}</p>
            </div>

            <div class="flex items-center mb-6">
                <p class="w-32 text-gray-600">Kualitas Produk</p>
                <div class="flex items-center" @mouseleave="resetHoverRating">
                    <button v-for="star in 5" :key="star" @mouseover="hoverRating(star)" @click="setRating(star)"
                        class="focus:outline-none">
                        <svg class="w-7 h-7"
                            :class="star <= (tempRating || rating) ? 'text-yellow-400' : 'text-gray-300'"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <label for="review" class="text-gray-600">Penilaian :</label>
                <textarea id="review" v-model="reviewText" rows="5"
                    class="w-full mt-2 p-2 bg-transparent focus:outline-none text-gray-700"
                    placeholder="Tulis Penilaianmu di sini"></textarea>
            </div>

            <div class="flex items-center gap-4 mt-4">
                <div class="w-20 h-20 bg-gray-100 border-2 border-dashed rounded-md flex items-center justify-center">
                </div>
                <button @click="triggerFileInput"
                    class="border border-teal-600 text-teal-600 py-2 px-4 rounded-lg text-sm hover:bg-teal-50">
                    Tambah Foto
                </button>
                <input type="file" ref="fileInput" class="hidden" @change="onFileChange" accept="image/*" multiple>
            </div>

            <div class="flex justify-end mt-8">
                <button @click="submitReview"
                    class="bg-teal-600 text-white py-2 px-8 rounded-lg hover:bg-teal-700 focus:outline-none">
                    Nilai
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            product: {
                name: 'Tani Makmur - Beras Premium Grade A',
                imageUrl: 'https://images.unsplash.com/photo-1586201375765-c124a2736173?q=80&w=200',
            },
            rating: 0, // rating yang sudah dipilih
            tempRating: 0, // rating saat mouse hover
            reviewText: '',
            uploadedFiles: [],
        };
    },
    methods: {
        // Dipanggil saat mouse berada di atas bintang
        hoverRating(star) {
            this.tempRating = star;
        },
        // Dipanggil saat mouse keluar dari area bintang
        resetHoverRating() {
            this.tempRating = 0;
        },
        // Dipanggil saat bintang diklik
        setRating(star) {
            this.rating = star;
        },
        // Aksi saat tombol "Tambah Foto" diklik
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        // Aksi saat file dipilih
        onFileChange(e) {
            // Logika untuk menangani file yang diunggah
            this.uploadedFiles = [...e.target.files];
            console.log('File yang dipilih:', this.uploadedFiles);
            // Anda bisa menambahkan logika untuk menampilkan preview gambar di sini
        },
        // Aksi saat tombol "Nilai" diklik
        submitReview() {
            if (this.rating === 0) {
                alert('Mohon berikan rating kualitas produk.');
                return;
            }

            const reviewData = {
                productId: '123', // ID produk dinamis
                rating: this.rating,
                comment: this.reviewText,
                photos: this.uploadedFiles
            };

            console.log('Data Penilaian Dikirim:', reviewData);
            alert('Terima kasih atas penilaian Anda!');

            // Di sini Anda akan mengirim `reviewData` ke server/API Anda
        }
    }
}
</script>

<style scoped>
/* Tidak ada style tambahan yang diperlukan, semua ditangani oleh Tailwind CSS */
</style>