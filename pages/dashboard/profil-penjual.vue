<template>
    <AppHeaderPenjual />
    <div class="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-2xl w-full">
            <div class="bg-white shadow-xl rounded-xl p-8 sm:p-10 transition-all duration-300 ease-in-out">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-800">Profil Saya</h1>
                        <p class="mt-1 text-sm text-gray-600">
                            Kelola informasi profil Anda untuk mengontrol, melindungi, dan mengamankan akun.
                        </p>
                    </div>
                    <div class="relative mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 group">
                        <img class="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover shadow-md border-4 border-white"
                            :src="userProfile.avatarUrl || 'https://placehold.co/150x150/EBF4FF/3B82F6?text=Profil'"
                            alt="Avatar Pengguna">
                        <button @click="triggerAvatarUpload"
                            class="absolute bottom-1 right-1 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <form @submit.prevent="" class="space-y-6">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
                            Nama Pengguna
                        </label>
                        <input type="text" name="username" id="username" v-model="userProfile.username"
                            class="form-input"
                            placeholder="Masukkan nama pengguna">
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input type="email" name="email" id="email" v-model="userProfile.email"
                            class="form-input"
                            placeholder="Masukkan alamat email">
                    </div>

                    <div class="pt-4">
                        <button type="submit"
                            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 transform hover:scale-105">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <AppFooter />
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Data dummy untuk profil pengguna
const userProfile = ref({
    username: 'Dabeyy',
    email: 'context@dabe.com',
    avatarUrl: 'https://placehold.co/150x150/FEF3C7/F97316?text=DB', // Contoh avatar dari placeholder
});

const triggerAvatarUpload = () => {
    // Logika untuk memicu dialog unggah file avatar
    // Misalnya: document.getElementById('avatarInputFile').click();
    console.log('Tombol ganti avatar diklik. Implementasikan logika unggah file.');
    alert('Fitur ganti avatar belum diimplementasikan.');
};
// Fungsi dummy untuk menyimpan profil
// const saveProfile = () => {
//     // Di sini Anda akan mengimplementasikan logika untuk mengirim data ke backend
//     console.log('Profil disimpan:', userProfile.value);
//     alert(`Profil untuk ${userProfile.value.username} telah disimpan (simulasi).`);
//     // Contoh:
//     // try {
//     //   const response = await $fetch('/api/user/profile', {
//     //     method: 'POST',
//     //     body: userProfile.value
//     //   });
//     //   alert('Profil berhasil diperbarui!');
//     // } catch (error) {
//     //   console.error('Gagal menyimpan profil:', error);
//     //   alert('Gagal menyimpan profil.');
//     // }
// };

// Set judul halaman
useHead({
    title: 'Profil Saya - DABE',
    meta: [
        { name: 'description', content: 'Kelola informasi profil akun DABE Anda.' }
    ]
});
</script>

<style scoped>
.form-input {
    @apply appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition duration-150;
}
/* Anda bisa menambahkan gaya kustom lainnya di sini jika diperlukan */
</style>
