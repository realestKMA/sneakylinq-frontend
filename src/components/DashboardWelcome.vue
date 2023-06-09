<script setup>
import AppLogo from './AppLogo.vue';
import IconAddPlus from './icons/IconAddPlus.vue';
import { RouterLink } from 'vue-router';

const data = [
    {id: 1, value: "alias.linq has been assigned to this device for a period of 4 hours."},
    {id: 2, value: "Chat securely with anyone from anywhere at anytime"},
    {id: 3, value: "Messages are never saved, just transmitted"},
    {id: 4, value: "Share your alias with others so they can sneaky chat you without knowing who you are"},
    {id: 5, value: "Group chat coming soon :)"},
]
</script>


<template>
    <main class="w-10/12 mx-auto h-full bg-white flex flex-col gap-y-16 items-center justify-center selection:bg-black selection:text-white md:w-8/12 lg:w-10/12 2xl:w-8/12">

        <AppLogo class="text-5xl text-black" />

        <div class="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <span  v-for="hint in data" :key="hint.id" class="flex text-center justify-center bg-zinc-100 rounded-sm px-4 py-6">
                <p class="text-zinc-700 text-sm">{{ hint.value }}</p>
            </span>

            <!-- start new chat button -->
            <RouterLink :to="{name: 'newlinq'}" class="py-10 flex items-center justify-center gap-x-2 border-2 border-dashed border-zinc-200 rounded-sm duration-150 group overflow-hidden hover:border-zinc-800 hover:bg-zinc-800 hover:shadow-xl">
                <IconAddPlus class="w-5 h-5 text-zinc-500 duration-150 group-hover:text-white" />
                <p class="text-zinc-500 font-medium text-sm duration-150 group-hover:text-white">New chat</p>
            </RouterLink>
            <!-- start new chat button -->
        </div>

    </main>
</template>