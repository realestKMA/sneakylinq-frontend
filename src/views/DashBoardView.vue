<script setup>
import { RouterView } from 'vue-router'
import SideNav from '../components/SideNav.vue';
import IconBarLeft from '../components/icons/IconBarLeft.vue';
import IconCloseSmall from '../components/icons/IconCloseSmall.vue';
import IconHouseOne from '../components/icons/IconHouseOne.vue';
import { RouterLink } from 'vue-router';
import { useBase } from '../stores/base';

// stores
const useBaseStore = useBase()
</script>

<template>
    <main class="relative w-full h-full font-roboto">

        <!-- sidenav and home button/link -->
        <div class="fixed top-0 w-full z-20 flex items-center justify-between px-8 py-6 md:hidden">

            <!-- toggle sidenav open, only available on small screens -->
            <button type="button" @click="useBaseStore.leftMobileMenu = true"
                class="block bg-transparent border border-zinc-200 rounded p-1 duration-300 group hover:bg-black">
                <IconBarLeft class="w-7 h-7 text-zinc-800 duration-300 group-hover:text-white" />
            </button>
            <!-- toggle sidenav open, only available on small screens -->

            <!-- home link/button -->
            <RouterLink
                :to="{ name: 'dashboardwelcome' }"
                v-slot="{ isExactActive }"
                class="block bg-transparent group">
                    <span
                        :class="isExactActive ? 'bg-black':'bg-transparent'"
                        class="block p-1 border border-zinc-200 rounded duration-300 group-hover:bg-black">
                            <IconHouseOne
                                :class="isExactActive ? 'text-white':'text-zinc-800'"
                                class="w-7 h-7 duration-300 group-hover:text-white" />
                    </span>
            </RouterLink>
            <!-- home link/button -->

        </div>
        <!-- sidenav and home button/link -->

        <!-- home link/button, large screens -->
        <RouterLink
            :to="{ name: 'dashboardwelcome' }"
            v-slot="{isExactActive}"
            class="hidden fixed top-10 right-10 group md:block">
                <span
                    :class="isExactActive ? 'bg-black':'bg-transparent'"
                    class="block p-1 border border-zinc-200 rounded duration-300 group-hover:bg-black">
                    <IconHouseOne
                        :class="isExactActive ? 'text-white':'text-zinc-800'"
                        class="w-7 h-7 duration-300 group-hover:text-white" />
                </span>
        </RouterLink>
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
                            <IconCloseSmall class="w-10 h-10 text-zinc-800 duration-150 group-hover:text-white" />
                        </button>
                        <!-- close side nav button -->

                    </div>
                </div>
            </Transition>
            <!-- side nav mobile -->

            <div class="w-full md:w-8/12 lg:w-9/12 2xl:w-10/12">
                <RouterView />
            </div>

        </div>

    </main>
</template>
