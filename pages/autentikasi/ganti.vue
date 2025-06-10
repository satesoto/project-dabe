<template>
  <div class="w-screen h-screen bg-[conic-gradient(from_22deg,#41b49f_50%,#22AB97_50%)]">
    <div class="min-h-screen flex justify-center items-center font-[Poppins]">
      <div class="p-8 bg-white flex flex-col gap-4 z-10 rounded-md w-full max-w-[430px]">
        <div class="flex flex-col gap-4">
          <h1 class="text-xl font-bold text-center">Lupa Kata Sandi?</h1>
          <p class="text-center text-sm mb-4 text-gray-500">
            Masukkan email Anda untuk atur ulang kata sandi
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm text-gray-500">Email</label>
            <input
              v-model="email"
              type="email"
              class="bg-[#48967E0F] border p-3 font-semibold rounded-md shadow-md outline-none focus:border-[#22AB97]"
              placeholder="context@dabe.com"
            />
          </div>

          <div class="flex flex-col gap-4">
            <button @click="sendResetLink" class="py-2 w-full font-bold rounded-md bg-[#22AB97] text-white hover:bg-[#1b9786]">
              Kirim
            </button>
            <a href="/login" class="text-sm text-center text-[#22AB97]">Kembali ke Halaman Masuk</a>
          </div>

          <p v-if="success" class="text-green-600 text-sm text-center">{{ success }}</p>
          <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')
const success = ref('')
const error = ref('')
const config = useRuntimeConfig()

const sendResetLink = async () => {
  try {
    success.value = ''
    error.value = ''

    await $fetch('/password/forgot', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { email: email.value }
    })

    success.value = 'Link reset berhasil dikirim. Silakan cek email Anda.'
  } catch (err) {
    error.value = err?.data?.message || 'Gagal mengirim link reset.'
  }
}
</script>
