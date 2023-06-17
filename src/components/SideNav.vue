<script setup>
import { useBase } from '../stores/base';
import ChatAlias from './ChatAlias.vue';
import DeviceAlias from './DeviceAlias.vue';
import IconAddPlus from './icons/IconAddPlus.vue';
import { RouterLink } from 'vue-router';

// stores
const useBaseStore = useBase()

// data
const aliases = [
    {id: 0, alias: "yo_swerve.linq"},
    {id: 1, alias: "cinccinatinnnnn.linq"},
    {id: 2, alias: "pusha_t.linq"},
    {id: 3, alias: "codename.linq"},
    {id: 4, alias: "bangerly.linq"},
]
</script>


<template>
    <main class="h-screen min-h-[30rem] w-full bg-black flex flex-col divide-y divide-zinc-700">
        
        <!-- device alias -->
        <DeviceAlias />
        <!-- device alias -->

        <div class="flex flex-col p-4">

            <!-- new chat -->
            <RouterLink :to="{name: 'newlinq'}" @click="useBaseStore.leftMobileMenu = false" class="flex items-center gap-x-2 text-zinc-400 bg-transparent p-3 rounded-sm duration-150 hover:bg-zinc-800 hover:text-white md:p-2">
                <IconAddPlus class="w-5 h-5" />
                <p class="text-base md:text-lg">New chat</p>
            </RouterLink>
            <!-- new chat -->

            <ChatAlias
                v-for="chat in aliases"
                :alias="chat.alias"
                :key="chat.id"
                @click="useBaseStore.leftMobileMenu = false" />
        </div>

    </main>
</template>