<script setup>
import { useBase } from '../stores/base';
import { useChatP2P } from '../stores/chatp2p';
import ChatAlias from './ChatAlias.vue';
import DeviceAlias from './DeviceAlias.vue';
import IconAddPlus from './icons/IconAddPlus.vue';
import { RouterLink, useRouter } from 'vue-router';

// stores
const useBaseStore = useBase()
const useChatP2PStore = useChatP2P()

// router & route
const router = useRouter()

// methods
const linqWith = (chat) => {
    useBaseStore.leftMobileMenu = false
    useChatP2PStore.activeChat = chat
    router.push({name: 'chat', params: {did: chat.did}})
}
</script>


<template>
    <main class="h-screen min-h-[30rem] w-full bg-black flex flex-col divide-y divide-zinc-700">
        
        <!-- device alias -->
        <DeviceAlias />
        <!-- device alias -->

        <div class="flex flex-col p-4 gap-y-1">

            <!-- new chat -->
            <RouterLink
                :to="{name: 'newlinq'}"
                @click="useBaseStore.leftMobileMenu = false"
                v-if="useChatP2PStore.chatConnect.connected"
                class="flex items-center gap-x-2 text-zinc-400 bg-transparent p-3 rounded-sm duration-150 hover:bg-zinc-800 hover:text-white md:p-2">
                    <IconAddPlus class="w-5 h-5" />
                    <p class="text-base md:text-lg">New chat</p>
            </RouterLink>
            <!-- new chat -->

            <ChatAlias
                v-for="chat in useChatP2PStore.chatMessages"
                :alias="chat.alias"
                :did="chat.did"
                :key="chat.did"
                @clicked-main="linqWith(chat)"
                @clicked-delete="useChatP2PStore.deleteChat(chat.did), useBaseStore.leftMobileMenu = false"/>
        </div>

    </main>
</template>