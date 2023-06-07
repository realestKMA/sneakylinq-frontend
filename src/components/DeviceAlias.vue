<script setup>
import IconMoreGridSmall from './icons/IconMoreGridSmall.vue';


</script>


<template>
    <main class="bg-transparent w-full flex items-center justify-start space-x-2 px-4 py-6">

        <!-- alias initial logo -->
        <div class="bg-cyan-400 rounded-sm overflow-hidden">
            <p class="font-roboto font-bold text-white text-xs px-2 py-1 uppercase">K</p>
        </div>
        <!-- alias initial logo -->


        <!-- alias -->
        <p class="lowercase font-semibold text-stone-300">koolkat.linq</p>
        <!-- alias -->

        <!-- menu -->
        <div class="relative flex-grow flex justify-end items-center">
            <button type="button">
                <IconMoreGridSmall class="w-8 h-8 text-stone-400 duration-500 hover:text-white" />
            </button>
        </div>
        <!-- menu -->

    </main>

</template>