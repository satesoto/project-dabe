<template>
  <UCarousel
    v-slot="{ item }"
    :items="slides"
    class="w-full rounded-lg overflow-hidden shadow-lg"
    :ui="{
      item: 'w-full',
      container: 'h-auto',
    }"
    :autoplay="true"
    :autoplayTimeout="5000"
    :loop="true"
    indicators
  >
    <div
      class="flex flex-col md:flex-row items-center bg-teal-500 text-white px-6 py-12 md:py-16"
    >
      <div class="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h1 class="text-3xl lg:text-4xl font-bold leading-tight mb-4">
          {{ item.title }}
        </h1>
        <p class="text-2xl lg:text-4xl font-bold">
          {{ item.subtitle }}
        </p>
      </div>
      <div class="md:w-1/2 flex justify-center md:justify-end">
        <img
          :src="item.image"
          alt="Gambar Hero"
          class="rounded-lg shadow-lg max-w-xs sm:max-w-sm md:max-w-md"
        />
      </div>
    </div>
  </UCarousel>
</template>

<script setup lang="ts">
const slides = [
  {
    title: "Beli Beras Lebih Murah Di DABE!",
    subtitle: "Langsung Dari Petani, Cek!",
    image: "https://placehold.co/400x300/a0aec0/ffffff?text=Petani+Panen",
  },
  {
    title: "Tebasan Langsung Dari Sawah",
    subtitle: "Harga Terbaik Untuk Kamu!",
    image: "https://placehold.co/400x300/38b2ac/ffffff?text=Tebasan+Langsung",
  },
  {
    title: "Dukung Petani Lokal",
    subtitle: "Beras Segar, Langsung Dari Lahan!",
    image: "https://placehold.co/400x300/2c7a7b/ffffff?text=Dukung+Petani",
  },
];
</script>
