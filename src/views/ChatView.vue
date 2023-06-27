<script setup>
import { RouterView } from 'vue-router'
import SideNav from '../components/SideNav.vue';
import IconBarLeft from '../components/icons/IconBarLeft.vue';
import IconCloseSmall from '../components/icons/IconCloseSmall.vue';
import IconHouseOne from '../components/icons/IconHouseOne.vue';
import { RouterLink } from 'vue-router';
import { useBase } from '../stores/base';
import AppToggle from '../components/AppToggle.vue';
import IconWifiHigh from '../components/icons/IconWifiHigh.vue';
import IconWifiOff from '../components/icons/IconWifiOff.vue';
import DeviceChatStatusLoading from '../components/DeviceChatStatusLoading.vue';
import { useChatP2P } from '../stores/chatp2p';
import DashBoardChat from '../components/DashBoardChat.vue';

// stores
const useBaseStore = useBase()
const useChatP2PStore = useChatP2P()

// computed
const toggleStatus = () => {
    if (useChatP2PStore.chatConnect.connected) return useChatP2PStore.disconnect()
    else return useChatP2PStore.connect()
}
</script>

<template>
    <main class="relative w-full h-full font-roboto">

        <!-- home link/button, large screens -->
        <div
            class="fixed w-full flex top-0 right-0 items-center justify-between px-8 py-6 z-10 md:w-8/12 lg:w-9/12 2xl:w-10/12">

            <!-- toggle sidenav, only available on small screens -->
            <button type="button" @click="useBaseStore.leftMobileMenu = true"
                class="block bg-transparent border border-zinc-200 rounded p-1 duration-300 group hover:bg-black md:hidden">
                <IconBarLeft class="w-6 h-6 text-zinc-800 duration-300 group-hover:text-white" />
            </button>
            <!-- toggle sidenav, only available on small screens -->


            <div class="flex items-center gap-x-4 md:justify-end md:flex-1">
                <!-- toggle user online/offline status -->
                <AppToggle :enabled="useChatP2PStore.chatConnect.connected" @click="toggleStatus()"
                    :disabled="useChatP2PStore.chatConnect.connecting">
                    <template #text>
                        <p :class="useChatP2PStore.chatConnect.connected ? 'text-white' : 'text-zinc-400'"
                            class="duration-1000">{{ useChatP2PStore.chatConnect.connected ? 'Online' : 'Offline' }}</p>
                    </template>
                    <template #icon>
                        <DeviceChatStatusLoading v-if="useChatP2PStore.chatConnect.connecting"
                            :loading="useChatP2PStore.chatConnect.connecting" />
                        <IconWifiHigh v-else-if="useChatP2PStore.chatConnect.connected"
                            :class="useChatP2PStore.chatConnect.connected ? 'text-black' : 'text-zinc-300'"
                            class="w-6 h-6 duration-1000" />
                        <IconWifiOff
                            v-else-if="!useChatP2PStore.chatConnect.connecting && !useChatP2PStore.chatConnect.connected"
                            class="w-6 h-6 text-zinc-300" />
                    </template>
                </AppToggle>
                <!-- toggle user online/offline status -->

                <RouterLink :to="{ name: 'dashboardwelcome' }" v-slot="{ isExactActive }" class="group">
                    <span :class="isExactActive ? 'bg-black' : 'bg-transparent'"
                        class="block p-1 border border-zinc-200 rounded duration-300 group-hover:bg-black">
                        <IconHouseOne :class="isExactActive ? 'text-white' : 'text-zinc-800'"
                            class="w-6 h-6 duration-300 group-hover:text-white" />
                    </span>
                </RouterLink>
            </div>
        </div>
        <!-- home link/button, large screens -->


        <div class="w-full h-full flex">

            <!-- side nav large screens -->
            <div class="hidden md:block md:w-4/12 lg:w-3/12 2xl:w-2/12">
                <SideNav />
            </div>
            <!-- side nav large screens -->

            <!-- side nav mobile -->
            <Transition enter-from-class="opacity-0 -translate-x-16" enter-active-class="duration-300"
                leave-to-class="opacity-0 -translate-x-16" leave-active-class="duration-300">
                <div v-if="useBaseStore.leftMobileMenu" class="absolute top-0 w-full flex z-50 md:hidden">
                    <div class="w-9/12">
                        <SideNav />
                    </div>

                    <!-- close side nav button -->
                    <div class="w-3/12 bg-black/20 backdrop-blur" @click="useBaseStore.leftMobileMenu = false">
                        <button type="button" @click="useBaseStore.leftMobileMenu = false"
                            class="bg-transparent rounded p-1 duration-300 group mt-5 ml-5">
                            <IconCloseSmall class="w-10 h-10 text-white duration-150 group-hover:text-white" />
                        </button>
                        <!-- close side nav button -->

                    </div>
                </div>
            </Transition>
            <!-- side nav mobile -->

            <div class="w-full md:w-8/12 lg:w-9/12 2xl:w-10/12">
                <DashBoardChat />
            </div>

    </div>

</main>
</template>
