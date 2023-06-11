<script setup>
import QrcodeVue from 'qrcode.vue';
</script>

<template>
    <main class="flex flex-col gap-y-10 items-center">

        <!-- qr code -->
        <div class="bg-zinc-100 rounded flex items-center justify-center">
            <QrcodeVue :value="'https://justgotplayfulnrrich.ng'" :size="250" class="w-full h-full p-4"/>
        </div>
        <!-- qr code -->

        <div class="flex flex-col gap-y-2 items-center justify-center">
            <h4 class="text-black text-xl font-bold">Proceed with QR code</h4>
            <p class="text-zinc-600 text-sm text-center">
                Scan this code, visit the url and follow the<br>instructions. Do not close this page.
            </p>
        </div>

    </main>
</template>