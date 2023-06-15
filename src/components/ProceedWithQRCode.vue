<script setup>
import QrcodeVue from 'qrcode.vue';
import IconRedo from './icons/IconRedo.vue';
import { onMounted } from 'vue';
import AppButton from './AppButton.vue';
import { useSetup } from '../stores/setup.js';
import IconCircleCheck from './icons/IconCircleCheck.vue';

// stores
const useSetupStore = useSetup()

// mounted hook
onMounted(() => {
    useSetupStore.connect()
})
</script>

<template>
    <main class="flex flex-col gap-y-10 items-center">

        <div
            :class="useSetupStore.qrcode.scanned ? 'bg-green-500':'bg-zinc-100'"
            class="relative bg-zinc-100 rounded flex items-center justify-center overflow-hidden duration-300">

            <!-- loading effect -->
            <div v-if="useSetupStore.qrcode.loading" class="absolute top-0 w-full h-full bg-zinc-100/50 backdrop-blur-sm flex flex-col gap-y-2 items-center justify-center">
                <IconRedo :class="useSetupStore.qrcode.loading ? 'animate-spin':''" class="w-8 h-8 text-black"  stroke-width="3"/>
            </div>
            <!-- loading effect -->

            <!-- error or refresh effect -->
            <div v-if="useSetupStore.qrcode.error || useSetupStore.qrcode.expired" class="absolute top-0 w-full h-full bg-zinc-100/50 backdrop-blur-sm flex flex-col gap-y-2 items-center justify-center">
                <AppButton label="Refresh" class="w-1/2" />
                <p v-if="useSetupStore.qrcode.error" class="text-xs text-black text-center">An error occured.</p>
            </div>
            <!-- error or refresh effect -->

            <!-- scanned effect -->
            <div v-if="useSetupStore.qrcode.scanned" class="absolute top-0 w-full h-full bg-zinc-100/50 backdrop-blur-sm flex flex-col gap-y-2 items-center justify-center">
                <IconCircleCheck class="w-8 h-8 text-black"  />
                <p class="text-xs text-green text-center px-10">Scanned Successfully. Please fill the form on the other device then return back here</p>
            </div>
            <!-- scanned effect -->

            <!-- qr code -->
            <QrcodeVue :value="useSetupStore.qrcode.value" :size="250" class="w-full h-full p-4"/>
            <!-- qr code -->

        </div>

        <div class="flex flex-col gap-y-2 items-center justify-center">
            <h4 class="text-black text-xl font-bold">Linq up via QR code</h4>
            <p class="text-zinc-600 text-sm text-center">
                Scan this code, visit the url and follow the<br>instructions. Do not close this page.
            </p>
        </div>

    </main>
</template>