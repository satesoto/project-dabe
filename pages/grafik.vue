<template>
    <AppHeader />
    <div class="bg-slate-100 min-h-screen p-4 md:p-8">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div class="flex flex-col gap-6">
                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <p class="text-slate-500 text-sm">Nilai Rupiah</p>
                    <div class="flex items-end justify-between mt-1">
                        <p class="text-3xl font-bold text-slate-800">16.293,01 <span class="text-xl">IDR</span></p>
                        <span
                            class="bg-green-100 text-green-700 text-sm font-semibold px-2 py-1 rounded-full">+2%</span>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm">
                    <p class="text-slate-500 text-sm">Harga Beras</p>
                    <div class="flex items-end justify-between mt-1">
                        <p class="text-3xl font-bold text-slate-800">12.613 <span class="text-xl">/kg</span></p>
                        <span class="bg-red-100 text-red-700 text-sm font-semibold px-2 py-1 rounded-full">-4%</span>
                    </div>
                </div>
            </div>

            <div class="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                <AppChartsLine />
            </div>

            <div class="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="h-80">
                    <AppChartsBar />
                </div>
                <div class="h-80">
                    <AppChartsDonut />
                </div>
            </div>

        </div>
    </div>
    <AppFooter />
</template>


<style scoped>
/* Scoped styles jika diperlukan */
</style>