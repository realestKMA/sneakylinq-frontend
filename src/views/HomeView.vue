<script setup>
import bgImg from '../assets/images/bg.jpg'
import AppLogo from '../components/AppLogo.vue';
import { RouterLink } from 'vue-router';

const data = {
  inlineStyles: {
    backgroundImage: `url(${bgImg})`,
  }
}

</script>

<template>
    <main class="w-full h-full bg-cover bg-center bg-no-repeat bg-black" :style="data.inlineStyles">

        <div class="w-full h-full flex items-end justify-start">

            <div class="w-9/12 flex flex-col p-10 sm:w-8/12 md:p-14 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12">
                <AppLogo stroke-color="white" class="text-4xl sm:text-5xl" />

                <p class="text-xs text-white font-cherry mt-3 sm:text-sm">
                    Chat with anyone from anywhere at anytime :)
                </p>

                <RouterLink :to="{name: 'connect'}" class="mt-8 py-3 border border-white group bg-black rounded overflow-hidden duration-300 hover:bg-white">
                    <p class="text-base text-white text-center font-cherry duration-300 group-hover:text-black">Linq up</p>
                </RouterLink>
            </div>

        </div>

    </main>
</template>