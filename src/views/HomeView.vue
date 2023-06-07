<script setup>
import { ref } from 'vue';
import AppInputField from '../components/AppInputField.vue';


const alias = ref('')
</script>

<template>
  <main class="w-full h-full bg-white flex items-center justify-center gap-x-20 selection:bg-black selection:text-white">

    <!-- proceed with qr code -->
    <div class="flex flex-col gap-10 items-center justify-center">

      <!-- qr code -->
      <div class="w-72 h-72 bg-stone-100 rounded"></div>
      <!-- qr code -->

      <div class="flex flex-col gap-2 items-center justify-center">
        <h4 class="text-black text-xl font-bold">Proceed with QR code</h4>
        <p class="text-stone-600 text-sm text-center">
          Scan this code, visit the url and follow the<br>instructions. Do not close this page.
        </p>
      </div>

    </div>
    <!-- proceed with qr code -->

    <!-- divide -->
    <div class="h-full flex flex-col gap-4 items-center justify-center">
      <div class="h-48 w-px bg-stone-200"></div>
      <p class="text-xl text-stone-200">Or</p>
      <div class="h-48 w-px bg-stone-200"></div>
    </div>
    <!-- divide -->

    <!-- proceed with alias -->
    <div class="flex flex-col border">

      <!-- input field -->
      <AppInputField v-model:model-value="alias" />
      <!-- input field -->

    </div>
    <!-- proceed with alias -->
    
  </main>
</template>
