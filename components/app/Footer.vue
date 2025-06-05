<template>
  <footer class="bg-teal-500 text-white">
    <div class="container mx-auto px-4 py-10 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="mb-6 md:mb-0">
          <a href="#" class="text-white text-3xl font-bold flex items-center mb-4">
            <svg class="h-10 w-auto mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            DABE
          </a>
          <p class="text-sm leading-relaxed">
            Jl. Laksda Adisucipto,
            <br />Papringan, Caturtunggal,
            <br />Kec. Depok, Kabupaten
            <br />Sleman, Daerah Istimewa
            <br />Yogyakarta 55281
          </p>
        </div>

        <div class="mb-6 md:mb-0">
          <h5 class="text-xl font-semibold mb-4 uppercase">Tentang DABE</h5>
          <p class="text-sm leading-relaxed">
            DABE adalah platform digital yang menghubungkan petani kakao dan pembeli besar secara langsung demi harga lebih adil, proses lebih cepat, dan pertanian yang berkelanjutan.
          </p>
        </div>

        <div class="mb-6 md:mb-0">
          <h5 class="text-xl font-semibold mb-4 uppercase">Tautan Cepat</h5>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-teal-200 transition-colors duration-200">Tentang Kami</a></li>
            <li><a href="#" class="hover:text-teal-200 transition-colors duration-200">Fitur</a></li>
            <li><a href="#" class="hover:text-teal-200 transition-colors duration-200">Kolaborator</a></li>
            <li><a href="#" class="hover:text-teal-200 transition-colors duration-200">Hubungi Kami</a></li>
          </ul>
        </div>

        <div>
          <h5 class="text-xl font-semibold mb-4 uppercase">Hubungi Kami</h5>
          <p class="text-sm mb-3">
            Jangan ragu untuk menghubungi kami!
          </p>
          <ul class="space-y-1 text-sm">
            <li>Email: <a href="mailto:contact@dabe.com" class="hover:text-teal-200 transition-colors duration-200">contact@dabe.com</a></li>
            <li>Instagram: <a href="#" class="hover:text-teal-200 transition-colors duration-200">dabeid</a></li>
            <li>Facebook: <a href="#" class="hover:text-teal-200 transition-colors duration-200">dabe</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-teal-600 text-center py-4">
      <p class="text-sm text-teal-100">&copy; {{ new Date().getFullYear() }} DABE. Semua Hak Dilindungi.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterLayout',
};
</script>

<style scoped>
/* Style kustom bisa ditambahkan di sini jika diperlukan */
</style>