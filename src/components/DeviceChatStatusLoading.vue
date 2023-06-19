<script setup>
import { onMounted, ref } from 'vue';
import IconWifiLow from './icons/IconWifiLow.vue';
import IconWifiMedium from './icons/IconWifiMedium.vue';
import IconWifiNone from './icons/IconWifiNone.vue';
import { computed } from 'vue';
import IconWifiHigh from './icons/IconWifiHigh.vue';
import { useChatP2P } from '../stores/chatp2p';


// refs
const loadingState = ref(0)

// stores
const useChatP2PStore = useChatP2P()

// computed
const isLoading = computed(() => {
    if (useChatP2PStore.chatConnect.connecting) {
        setInterval(() => {
            loadingState.value += 1
    
            if (loadingState.value == 4) loadingState.value = 0
        }, 500)
    }
})

// mounted hook
onMounted(() => {
    isLoading
})
</script>

<template>
    <main>
        <IconWifiNone v-if="loadingState == 0" class="w-6 h-6 text-zinc-300" />
        <IconWifiLow v-if="loadingState == 1" class="w-6 h-6 text-zinc-300" />
        <IconWifiMedium v-if="loadingState == 2" class="w-6 h-6 text-zinc-300" />
        <IconWifiHigh v-if="loadingState == 3" class="w-6 h-6 text-zinc-300" />
    </main>
</template>