<script setup>
import { RouterView } from 'vue-router'
import { v4 as uuid4 } from 'uuid'
import { useBase } from './stores/base'

// stores
const useBaseStore = useBase()

// methods
const setDeviceID = () => {
  const did = useBaseStore.did || uuid4();

  useBaseStore.did = did
}

// created hook, implicit
setDeviceID()
</script>

<template>
  <main class="w-screen min-w-full h-screen min-h-[30rem] font-roboto duration-300 overflow-x-hidden  selection:bg-black selection:text-white">
    <RouterView />
  </main>
</template>
