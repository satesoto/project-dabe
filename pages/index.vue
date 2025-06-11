<template>
  <AppHeader />
  <div class="bg-white font-inter mt-12">
    <!-- Mengubah mt-6 menjadi mt-20 (5rem) untuk mengakomodasi header sticky dengan tinggi h-20 -->

    <!-- Hero Section -->
    <section class="container mx-auto opacity-0 animate-fadeIn">
      <div class="px-4 sm:px-6 lg:px-8">
        <!-- Wrapper for horizontal padding, matching main content -->
        <div
          class="py-12 md:py-16 flex flex-col md:flex-row items-center bg-teal-500 text-white rounded-lg px-4 sm:px-6 lg:px-8 shadow-lg"
        >
          <!-- px-4 sm:px-6 lg:px-8 here is for the banner's internal content padding -->
          <div
            class="md:w-1/2 text-center md:text-left mb-8 md:mb-0 animate-slideInLeft"
          >
            <h1
              class="text-3xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4"
            >
              Beli Beras Lebih Murah Di DABE!
            </h1>
            <p class="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Langsung Dari Petani, Cek!
            </p>
          </div>
          <div
            class="md:w-1/2 flex justify-center md:justify-end animate-slideInRight"
          >
            <!-- Ganti dengan URL gambar petani yang relevan -->
            <img
              src="https://placehold.co/400x300/a0aec0/ffffff?text=Petani+Panen"
              alt="Petani memegang padi"
              class="rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- Main Content Area -->
    <main
      class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 opacity-0 animate-fadeIn animation-delay-300"
    >
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Featured Product Section (Kiri) -->

        <!-- Product Grid (Kanan) -->
        <section class="w-full">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">
            Semua Produk
          </h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6"
          >
            <!-- Product Card Component atau Loop -->
            <NuxtLink
              v-for="(product, index) in paginatedProducts"
              :key="product.id"
              :to="`/produk/${product.id}`"
              class="product-card-link block"
            >
              <div
                class="product-card bg-white rounded-lg shadow-md overflow-hidden opacity-0 animate-fadeInUp h-full flex flex-col"
                :style="{ animationDelay: `${index * 100 + 600}ms` }"
              >
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-48 object-cover"
                />
                <div class="p-4 flex flex-col flex-grow">
                  <h3
                    class="text-lg font-semibold text-gray-800 mb-1 truncate"
                    :title="product.name"
                  >
                    {{ product.name }}
                  </h3>
                  <p class="text-xl font-bold text-teal-600 mb-2">
                    {{ formatCurrency(product.price) }}
                  </p>
                  <div
                    class="flex items-center text-sm text-gray-600 mb-1 mt-auto"
                  >
                    <!-- mt-auto pushes this to bottom -->
                    <svg
                      class="w-4 h-4 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>
                    <span>{{ product.rating }}</span>
                    <span class="mx-1">|</span>
                    <span>{{ product.location }}</span>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Pagination Controls -->
          <div
            class="mt-12 flex justify-center items-center space-x-2"
            v-if="totalPages > 1"
          >
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>

            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-md',
                currentPage === page
                  ? 'bg-teal-500 text-white border border-teal-500'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>

            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Berikutnya
            </button>
          </div>
        </section>
      </div>
    </main>
  </div>
  <AppFooter />
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { productsData } from "../src/api/products";
import type { Product } from "../src/api/products";

const currentPage = ref(1);
const itemsPerPage = ref(32); // Tampilkan 6 produk per halaman

const products = ref<Product[]>(productsData);

// Computed property untuk produk yang dipaginasi
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return products.value.slice(start, end);
});

// Computed property untuk total halaman
const totalPages = computed(() => {
  return Math.ceil(products.value.length / itemsPerPage.value);
});

// Fungsi navigasi paginasi
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const goToPage = (page: number) => {
  currentPage.value = page;
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("Rp", "Rp "); // Menambahkan spasi setelah Rp dan memastikan tidak ada desimal
};

// Set judul halaman dan meta deskripsi
useHead({
  title: "Beranda - DABE | Beli Beras Langsung Dari Petani",
  meta: [
    {
      name: "description",
      content:
        "Temukan berbagai jenis beras berkualitas langsung dari petani dengan harga terbaik di DABE. Belanja mudah, aman, dan mendukung petani lokal.",
    },
  ],
});
</script>

<style scoped>
/* Gaya spesifik untuk komponen ini jika diperlukan,
   namun usahakan semaksimal mungkin menggunakan kelas Tailwind */
/* Pastikan font Inter sudah diimpor di file CSS utama Anda atau di index.html */
.font-inter {
  font-family: "Inter", sans-serif;
}

.product-card-link {
  text-decoration: none; /* Menghilangkan garis bawah default dari link */
}

.product-card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 20px -3px rgba(0, 0, 0, 0.15),
    0 6px 10px -4px rgba(0, 0, 0, 0.1);
}

/* Animasi Kustom */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slideInLeft {
  animation: slideInLeft 0.7s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  /* Added delay */
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slideInRight {
  animation: slideInRight 0.7s 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    forwards;
  /* Added delay */
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}
</style>
/* Tambahkan kelas delay lain jika diperlukan */
