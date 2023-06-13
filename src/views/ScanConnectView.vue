<script setup>
import { useRoute } from 'vue-router';
import AppLogo from '../components/AppLogo.vue';
import ProceedWithAlias from '../components/ProceedWithAlias.vue'
import { onMounted, ref } from 'vue';
import { useProceedWithQRCode } from '../stores/ProceedWithQRCode';

// refs
const loading = ref(false)

// props
const props = defineProps({
    did: { type: String, required: true }
})

// stores
const useProceedWithQRCodeStore = useProceedWithQRCode()

// route and router
const route = useRoute()

// mounted hook
onMounted(() => {
})
</script>

<template>
    <main class="w-full h-full bg-white flex flex-col items-center justify-center">

        <section class="w-full h-full flex flex-grow items-center justify-center overflow-hidden md:gap-x-10 lg:gap-x-20">

            <!-- loading effect -->
            <div v-if="loading" class="w-full h-full flex items-center justify-center">
                <AppLogo :class="loading ? 'animate-ping':''" class="text-4xl" />
            </div>
            <!-- loading effect -->

            <!-- proceed with alias -->
            <div v-else class="w-10/12 md:w-5/12 lg:w-4/12 xl:w-3/12">
                <ProceedWithAlias class="w-full md:w-auto" />
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
