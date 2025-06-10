<template>
  <section class="w-full h-screen flex justify-center items-center bg-white font-[Poppins]">
    <div class="w-full max-w-[1400px] grid grid-cols-2 gap-12 px-16">
      <!-- KIRI: Gambar + Teks -->
      <div class="flex flex-col items-center justify-center text-center">
        <img src="../assets/img/register.png" alt="Register" class="w-full max-w-[600px] h-auto object-contain mb-8" />
        <p class="text-2xl font-semibold text-gray-800 leading-snug">
          Yuk, Beli Beras Langsung Dari Sawah,<br />
          Harga Adil Untuk Semua
        </p>
      </div>

      <!-- KANAN: Formulir -->
      <div class="bg-white p-12 border rounded-xl shadow-xl w-full max-w-[520px]">
        <h1 class="text-3xl font-bold text-center">Daftar Sekarang</h1>
        <p class="text-center text-base mb-6 text-md">
          Sudah punya akun DABE? <a href="#" class="text-[#22AB97] font-semibold">Masuk</a>
        </p>

        <!-- Tombol Google (opsional, bisa aktifkan nanti) -->
        <button
          class="py-2 w-full shadow-md border border-gray-300 font-bold rounded-md flex items-center justify-center text-[#7C817FC2] mb-5">
          <img src="../assets/img/google.png" alt="" />Google
        </button>

        <div class="relative mb-6">
          <hr />
          <p class="absolute bg-white px-3 text-sm left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500">atau</p>
        </div>

        <!-- Formulir -->
        <form @submit.prevent="registerUser" class="space-y-5">
          <div>
            <label class="text-sm text-gray-500">Nama Pengguna</label>
            <input v-model="name" type="text" placeholder="Dabeyy"
              class="w-full p-4 rounded-md border shadow-md bg-[#48967E0F] font-medium outline-none focus:border-[#22AB97]" />
          </div>
          <div>
            <label class="text-sm text-gray-500">Email</label>
            <input v-model="email" type="email" placeholder="context@dabe.com"
              class="w-full p-4 rounded-md border shadow-md bg-[#48967E0F] font-medium outline-none focus:border-[#22AB97]" />
          </div>
          <div>
            <label class="text-sm text-gray-500">Kata Sandi</label>
            <input v-model="password" type="password" placeholder="********"
              class="w-full p-4 rounded-md border shadow-md bg-[#48967E0F] font-medium outline-none focus:border-[#22AB97]" />
          </div>
          <div>
            <label class="text-sm text-gray-500">Konfirmasi Kata Sandi</label>
            <input v-model="password_confirmation" type="password" placeholder="********"
              class="w-full p-4 rounded-md border shadow-md bg-[#48967E0F] font-medium outline-none focus:border-[#22AB97]" />
          </div>

          <button type="submit"
            class="mt-6 w-full py-3 bg-[#22AB97] text-white text-lg font-bold rounded-md shadow-md hover:bg-[#1b9786] transition-all">
            Daftar
          </button>
        </form>

        <p class="text-center text-sm mt-4">
          Dengan mendaftar, saya menyetujui
          <a href="#" class="text-[#22AB97] font-bold">Syarat & Ketentuan</a> serta
          <a href="#" class="text-[#22AB97] font-bold">Kebijakan Privasi DABE</a>
        </p>

        <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
        <p v-if="success" class="text-green-600 text-center mt-4">{{ success }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const error = ref('')
const success = ref('')

const config = useRuntimeConfig()

const registerUser = async () => {
  try {
    const { data, error: fetchError } = await useFetch('/user/register', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
        konfirmasi_password: password_confirmation.value
      }
    })

    if (fetchError.value) {
      throw new Error(fetchError.value.data?.message || 'Registrasi gagal')
    }

    success.value = 'Registrasi berhasil, silakan cek email!'
    error.value = ''
  } catch (err) {
    error.value = err.message
    success.value = ''
  }
}
</script>
