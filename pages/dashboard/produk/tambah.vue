<template>
  <ProductForm @submit="handleTambah" />
</template>

<script setup>
import ProductForm from "@/components/produk/ProductForm.vue";

function handleTambah(data) {
  console.log("Produk baru:", data);
  // Kirim ke API atau simpan ke state
}
</script>
