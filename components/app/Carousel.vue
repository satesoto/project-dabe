<template>
  <Carousel
    :itemsToShow="1"
    :wrapAround="true"
    :autoplay="autoplay"
    :transition="500"
    class="rounded-xl overflow-hidden"
  >
    <Slide v-for="(item, index) in items" :key="index">
      <div class="relative h-64 md:h-80 w-full">
        <img
          :src="item.image"
          :alt="item.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-4 text-lg font-semibold">
          {{ item.title }}
        </div>
      </div>
    </Slide>
  </Carousel>
</template>

<script setup lang="ts">
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const props = defineProps<{
  items: {
    title: string;
    image: string;
  }[];
  autoplay?: number; // ms, ex: 3000 = 3s
}>();
</script>

<style scoped>
/* Tambahan gaya jika diperlukan */
</style>
