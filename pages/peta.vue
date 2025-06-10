<template>
    <AppHeader />
    <div class="bg-white min-h-screen py-8 md:py-12">
        <div class="container mx-auto px-4 max-w-5xl text-center">
            <h1 class="text-3xl font-bold text-teal-600 mb-6">Lokasi Sawah DABE</h1>

            <ClientOnly fallback-tag="div" fallback="<p>Memuat Peta...</p>">
                <div class="h-[500px] w-full border rounded-lg shadow-lg">
                    <l-map ref="map" v-model:zoom="zoom" :center="center">
                        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                            name="OpenStreetMap"
                            attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"></l-tile-layer>

                        <l-marker v-for="location in locations" :key="location.id"
                            :lat-lng="[location.lat, location.lng]">
                            <l-popup>
                                <div class="font-bold">{{ location.name }}</div>
                                <p>{{ location.address }}</p>
                            </l-popup>
                        </l-marker>
                    </l-map>
                </div>
            </ClientOnly>

        </div>
    </div>
    <AppFooter />
</template>

<script setup>
// Import semua yang kita butuhkan
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { ref } from 'vue';

// =================================================================================
// KODE PERBAIKAN IKON (WAJIB ADA)
// =================================================================================
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
// =================================================================================


// State awal peta
const zoom = ref(12);
const center = ref([-7.7956, 110.3695]); // Titik tengah di Yogyakarta

// --- DATA LOKASI ANDA ---
// Di sinilah Anda mengelola semua lokasi sawah Anda.
// Cukup tambah/ubah data di dalam array ini.
const locations = ref([
    {
        id: 1,
        name: 'Kantor Pusat DABE',
        address: 'Jl. Malioboro, Yogyakarta',
        lat: -7.7928, // Latitude
        lng: 110.3659, // Longitude
    },
    {
        id: 2,
        name: 'Sawah Contoh - Bantul',
        address: 'Area Sawah, Bantul, DIY',
        lat: -7.8823,
        lng: 110.3291,
    },
    {
        id: 3,
        name: 'Sawah Mitra - Sleman Utara',
        address: 'Area Sawah, Pakem, Sleman, DIY',
        lat: -7.6780,
        lng: 110.4132,
    }
]);
</script>
