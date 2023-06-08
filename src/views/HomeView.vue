<script setup>
import { ref } from 'vue';
import AppLogo from '../components/AppLogo.vue';
import ProceedWithQRCode from '../components/ProceedWithQRCode.vue'
import ProceedWithAlias from '../components/ProceedWithAlias.vue'

</script>

<template>
  <main class="w-full h-full bg-white flex flex-col items-center justify-center selection:bg-black selection:text-white">

    <section class="w-full h-full flex flex-grow items-center justify-center overflow-hidden md:gap-x-10 lg:gap-x-20">

      <!-- proceed with qr code -->
      <ProceedWithQRCode />
      <!-- proceed with qr code -->
  
      <!-- divide -->
      <div class="h-full hidden flex-col gap-y-4 items-center justify-center md:flex">
        <div class="h-48 w-px bg-zinc-200"></div>
        <p class="text-xl text-zinc-200">Or</p>
        <div class="h-48 w-px bg-zinc-200"></div>
      </div>
      <!-- divide -->
  
      <!-- proceed with alias -->
      <ProceedWithAlias class="w-full md:w-auto" />
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
