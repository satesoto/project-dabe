<template>
  <div class="max-w-5xl mx-auto p-6">
    <!-- Breadcrumb & Tombol -->
    <div class="flex justify-between items-center mb-4">
      <span class="text-sm text-gray-600"
        >Seller Operation &gt; <b>Produk Saya</b></span
      >
      <button
        class="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
      >
        + Tambah Produk
      </button>
    </div>

    <!-- Tabel Produk -->
    <div class="bg-white rounded shadow overflow-x-auto">
      <table class="w-full table-auto">
        <thead class="bg-gray-100 text-left text-sm text-gray-600">
          <tr>
            <th class="px-4 py-3">Produk</th>
            <th class="px-4 py-3">Stok</th>
            <th class="px-4 py-3">Harga</th>
            <th class="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="produk in produkList"
            :key="produk.id"
            class="border-t text-sm"
          >
            <td class="px-4 py-3 flex items-center gap-3">
              <img :src="produk.foto" class="w-12 h-12 object-cover rounded" />
              <span>{{ produk.nama }}</span>
            </td>
            <td class="px-4 py-3">{{ produk.stok }}</td>
            <td class="px-4 py-3">
              Rp{{ produk.harga.toLocaleString("id-ID") }}
            </td>
            <td class="px-4 py-3 flex gap-2">
              <button
                @click="editProduk(produk.id)"
                class="text-gray-600 hover:text-emerald-500"
              >
                ✏️
              </button>
              <button
                @click="hapusProduk(produk.id)"
                class="text-red-500 hover:text-red-600"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center gap-2 mt-6">
      <button class="text-gray-400" disabled>&lt;</button>
      <button class="bg-emerald-500 text-white px-3 py-1 rounded">1</button>
      <button class="text-gray-500 hover:underline">2</button>
      <button class="text-gray-500 hover:underline">3</button>
      <span class="text-gray-400">...</span>
      <button class="text-gray-500 hover:underline">&gt;</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const produkList = ref([
  {
    id: 1,
    nama: "Tani Makmur - Beras Premium Grade A",
    stok: 12,
    harga: 17000,
    foto: "/dummy/beras.jpg",
  },
  {
    id: 1,
    nama: "Tani Makmur - Beras Premium Grade A",
    stok: 12,
    harga: 17000,
    foto: "/dummy/beras.jpg",
  },
  {
    id: 1,
    nama: "Tani Makmur - Beras Premium Grade A",
    stok: 12,
    harga: 17000,
    foto: "/dummy/beras.jpg",
  },
]);

function editProduk(id) {
  console.log("Edit produk ID:", id);
  // arahkan ke /produk/:id/edit
}

function hapusProduk(id) {
  console.log("Hapus produk ID:", id);
  // Tampilkan konfirmasi dan hapus dari backend atau state
}
</script>
