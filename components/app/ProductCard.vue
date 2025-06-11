<template>
    <NuxtLink :to="`/produk/${product.id}`" class="product-card-link block">
        <div class="product-card bg-white rounded-lg shadow-md overflow-hidden opacity-0 animate-fadeInUp h-full flex flex-col"
            :style="animationStyle">
            <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-lg font-semibold text-gray-800 mb-1 truncate" :title="product.name">
                    {{ product.name }}
                </h3>
                <p class="text-xl font-bold text-teal-600 mb-2">{{ formattedPrice }}</p>
                <div class="flex items-center text-sm text-gray-600 mb-1 mt-auto">
                    <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                    </svg>
                    <span>{{ product.rating }}</span>
                    <span class="mx-1">|</span>
                    <span>{{ product.location }}</span>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Product {
    id: string | number;
    name: string;
    price: number;
    image: string;
    rating: number | string;
    location: string;
}

const props = defineProps<{
    product: Product;
    index?: number; // Optional: jika masih ingin menggunakan index untuk delay animasi
}>();

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value).replace('Rp', 'Rp ');
};

const formattedPrice = computed(() => formatCurrency(props.product.price));

const animationStyle = computed(() => {
    if (props.index !== undefined) {
        return { animationDelay: `${props.index * 100 + 600}ms` };
    }
    return {};
});
</script>

<style scoped>
.product-card-link {
    text-decoration: none;
}

.product-card {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.product-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 20px -3px rgba(0, 0, 0, 0.15), 0 6px 10px -4px rgba(0, 0, 0, 0.1);
}

.animate-fadeInUp {
    /* Pastikan animasi ini didefinisikan secara global atau di sini jika perlu */
    opacity: 0;
    /* Inisialisasi untuk animasi */
    animation: fadeInUp 0.6s ease-out forwards;
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
</style>