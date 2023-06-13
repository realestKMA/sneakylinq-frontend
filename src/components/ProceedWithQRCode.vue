<script setup>
import QrcodeVue from 'qrcode.vue';
import IconRedo from './icons/IconRedo.vue';
import { onMounted, ref } from 'vue';
import AppButton from './AppButton.vue';
import { useProceedWithQRCode } from '../stores/ProceedWithQRCode.js';
import IconCircleCheck from './icons/IconCircleCheck.vue';

// stores
const storeProceedWithQRCode = useProceedWithQRCode()

// mounted hook
onMounted(() => {
    storeProceedWithQRCode.connect()
})
</script>

<template>
    <main class="flex flex-col gap-y-10 items-center">

        <!-- qr code -->
        <div class="relative bg-zinc-100 rounded flex items-center justify-center overflow-hidden">
            
            <!-- loading effect -->
            <div v-if="storeProceedWithQRCode.qrcode.loading ||storeProceedWithQRCode.qrcode.error" class="absolute top-0 w-full h-full bg-zinc-100/50 backdrop-blur-sm flex flex-col gap-y-2 items-center justify-center">
                <IconRedo v-if="storeProceedWithQRCode.qrcode.loading" :class="storeProceedWithQRCode.qrcode.loading ? 'animate-spin':''" class="w-8 h-8 text-black"  stroke-width="3"/>
                <AppButton v-else label="Refresh" class="w-1/2" />
                <p v-if="storeProceedWithQRCode.qrcode.error" class="text-xs text-black text-center">An error occured.</p>
            </div>
            <!-- loading effect -->

            <!-- scanned effect -->
            <div v-if="storeProceedWithQRCode.qrcode.scanned" class="absolute top-0 w-full h-full bg-zinc-100/50 backdrop-blur-sm flex flex-col gap-y-2 items-center justify-center">
                <IconCircleCheck class="w-8 h-8 text-black"  />
                <p class="text-xs text-green text-center">Scanned Successfully, please wait.</p>
            </div>
            <!-- scanned effect -->

            <QrcodeVue :value="storeProceedWithQRCode.qrcode.value" :size="250" class="w-full h-full p-4"/>
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