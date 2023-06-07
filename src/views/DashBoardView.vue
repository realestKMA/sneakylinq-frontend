<script setup>
import { RouterView } from 'vue-router'
import SideNav from './components/SideNav.vue';
import IconBarLeft from './components/icons/IconBarLeft.vue';
import IconCloseSmall from './components/icons/IconCloseSmall.vue';
import { ref } from 'vue';

const toggleMenu = ref(false)
</script>

<template>
  <main class="relative w-full h-full font-roboto">

    <!-- open menu button, active on small screens -->
    <div class="absolute top-0 w-full z-10 flex items-center p-4 md:hidden">
      <button type="button" @click="toggleMenu = true"
        class="block bg-transparent border border-stone-200 rounded p-1 duration-300 group hover:bg-black">
        <IconBarLeft class="w-7 h-7 text-stone-800 duration-300 group-hover:text-white" />
      </button>
    </div>
    <!-- open menu button, active on small screens -->


    <div class="w-full h-full flex">

      <!-- side nav large screens -->
      <div class="hidden md:block md:w-4/12 lg:w-3/12 2xl:w-2/12">
        <SideNav />
      </div>
      <!-- side nav large screens -->

      <!-- side nav mobile -->
      <Transition enter-from-class="opacity-0 -translate-x-16" enter-active-class="duration-300"
        leave-to-class="opacity-0 -translate-x-16" leave-active-class="duration-300">
        <div v-if="toggleMenu" class="absolute top-0 w-full flex z-50 md:hidden">
          <div class="w-9/12">
            <SideNav />
          </div>
          
          <!-- close side nav button -->
          <div class="w-3/12 bg-black/20" @click="toggleMenu = false">
            <button type="button" @click="toggleMenu = false"
              class="bg-transparent rounded p-1 duration-300 group mt-5 ml-5">
              <IconCloseSmall class="w-10 h-10 text-stone-800 duration-150 group-hover:text-white" />
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
