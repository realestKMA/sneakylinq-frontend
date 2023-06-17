<script setup>
import AppLogo from '../components/AppLogo.vue';
import ProceedWithAlias from '../components/ProceedWithAlias.vue';
import { onMounted } from 'vue';
import { useScanQRcode } from '../stores/scanQRCode';
import IconQRCode from '../components/icons/IconQRCode.vue';

// props
const props = defineProps({
    did: { type: String, required: true }
})

// stores
const useScanQRcodeStore = useScanQRcode()

// mounted hook
onMounted(() => {
    useScanQRcodeStore.connect(props.did)
})
</script>

<template>
    <main class="w-full h-full bg-white flex flex-col items-center justify-center">
        
        <section class="w-full h-full flex flex-grow items-center justify-center overflow-hidden md:gap-x-10 lg:gap-x-20">

            <!-- loading effect -->
            <div v-if="useScanQRcodeStore.scanner.loading" class="w-full h-full flex items-center justify-center">
                <AppLogo :class="useScanQRcodeStore.scanner.loading ? 'animate-ping':''" class="text-4xl" />
            </div>
            <!-- loading effect -->

            <!-- proceed with alias -->
            <div v-else class="w-10/12 h-full flex flex-col justify-between items-center md:w-5/12 lg:w-4/12 xl:w-3/12">
                <div class="mt-20">
                    <IconQRCode class="w-40 h-40 text-black" />
                </div>

                <!-- linq up completed -->
                <div v-if="useScanQRcodeStore.scanner.completed" class="flex-grow flex items-center justify-center -mt-40">
                    <p class="text-base text-zinc-500 text-center">Linq up completed successfully, you should now be logged in on the other device</p>
                </div>
                <!-- linq up completed -->

                <!-- linq up error -->
                <div v-else-if="useScanQRcodeStore.scanner.error" class="flex-grow flex items-center justify-center -mt-40">
                    <p class="text-base text-zinc-500 text-center">{{ useScanQRcodeStore.scanner.error }}</p>
                </div>
                <!-- linq up error -->

                <div v-else class="flex-grow flex items-center justify-center -mt-40">
                    <ProceedWithAlias proceed-type="2" class="w-full md:w-auto" />
                </div>
            </div>
            <!-- proceed with alias -->

        </section>
        

        <!-- home footer -->
        <footer class="w-full flex flex-col items-center justify-center p-4 gap-y-2">
            <AppLogo class="text-2xl" />
            <span class="inline-flex gap-x-1 text-xs text-zinc-500">
                <p>By the</p>
                <a href="http://github.com/realestkma" class="text-cyan-400 hover:text-cyan-500">RealestKMA</a>
                <p>from the</p>
                <span>
                    <p>234</p>
                </span>
            </span>
        </footer>
        <!-- home footer -->


    </main>
</template>
