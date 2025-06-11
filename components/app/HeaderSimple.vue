<template>
    <nav class="bg-teal-500 shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between h-20">
                <div class="flex-shrink-0">
                    <NuxtLink to="/" class="text-white text-3xl font-bold flex items-center">
                        <img src="/assets/img/logo/dabe_putih.png" alt="DABE Logo" class="h-10 w-auto mr-2"> <!-- Tambahkan tag img di sini -->
                        DABE
                    </NuxtLink>
                </div>

                <div class="hidden md:flex items-center space-x-4 ml-6">
                    <NuxtLink to="/profil" class="flex items-center text-white hover:text-teal-200">
                        <img class="w-10 h-10 rounded-full border-2 border-white object-cover"
                            src="https://via.placeholder.com/100" alt="User Avatar" />
                        <span class="ml-2 font-medium">{{ username }}</span>
                    </NuxtLink>
                </div>

                <div class="md:hidden flex items-center">
                    <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-white focus:outline-none">
                        <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16m-4 6h4"></path>
                        </svg>
                        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <transition name="slide-fade">
            <div v-if="mobileMenuOpen" class="md:hidden bg-teal-500 pb-3 shadow-lg">
                <NuxtLink to="/" class="block px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-150">Beranda</NuxtLink> <!-- Perbaiki typo Infografis menjadi Grafik -->
                <NuxtLink to="/grafik" class="block px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-150">Grafik</NuxtLink>
                <NuxtLink to="/peta" class="block px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-150">Peta</NuxtLink>
                <div class="border-t border-teal-400 mt-2 pt-2">
                    <NuxtLink to="/transaksi/checkout" class="flex items-center px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-150">
                        <svg class="w-6 h-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Keranjang
                    </NuxtLink>
                    <NuxtLink to="/profil" class="flex items-center px-4 py-3 text-white hover:bg-teal-600 transition-colors duration-150">
                        <img class="w-8 h-8 rounded-full border-2 border-white object-cover mr-3"
                            src="https://via.placeholder.com/100" alt="User Avatar" />
                        <span class="font-medium">{{ username }}</span>
                    </NuxtLink>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    props: {
        username: {
            type: String,
            default: 'Pengguna' // Nilai default jika username tidak diberikan
        }
    },
    data() {
        return {
            mobileMenuOpen: false,
        };
    },
};
</script>

<style scoped>
/* Style kustom bisa ditambahkan di sini jika diperlukan */
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>