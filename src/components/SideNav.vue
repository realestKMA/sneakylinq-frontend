<script setup>
import DeviceAlias from './DeviceAlias.vue';
import IconAddPlus from './icons/IconAddPlus.vue';
</script>


<template>
    <main class="h-screen min-h-[30rem] w-full bg-black flex flex-col divide-y divide-zinc-700">
        
        <!-- device alias -->
        <DeviceAlias />
        <!-- device alias -->

        <div class="flex flex-col p-4">

            <!-- new chat -->
            <button type="button" class="flex items-center space-x-2 text-zinc-400 bg-transparent p-2 rounded-sm duration-150 hover:bg-zinc-900 hover:text-white">
                <IconAddPlus class="w-5 h-5" />
                <p class="text-lg">New chat</p>
            </button>
            <!-- new chat -->
        </div>

    </main>
</template>