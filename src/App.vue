<script setup>
import { RouterView } from 'vue-router'
import { v4 as uuid4 } from 'uuid'
import { useBase } from './stores/base'
import { useConnect } from './stores/connect.js';
import AppLogo from './components/AppLogo.vue';
import IconLogOut from './components/icons/IconLogOut.vue';
import AppButton from './components/AppButton.vue';
import AppModalState from './components/AppModalState.vue';
import { useDisconnect } from './stores/disconnect';

// stores
const useBaseStore = useBase()
const useConnectStore = useConnect()
const useDisconnectStore = useDisconnect()

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

  <!-- loading effect -->
  <Teleport to="body">
    <Transition
        enter-from-class="scale-0 opacity-0"
        enter-active-class="transition-all duration-200"
        leave-to-class="scale-0 opacity-0"
        leave-active-class="transition-all duration-200">
        <div v-if="useConnectStore.qrcode.success" class="fixed top-0 w-full h-screen bg-black/20 backdrop-blur flex items-center justify-center z-30">
          <AppLogo :class="useConnectStore.qrcode.success ? 'animate-ping':''" class="text-4xl" />
        </div>
    </Transition>
  </Teleport>
  <!-- loading effect -->

  <!-- sign out -->
  <teleport to="body">
      <transition
        enter-from-class="scale-0 opacity-0"
        enter-active-class="transition-all duration-200"
        leave-to-class="scale-0 opacity-0"
        leave-active-class="transition-all duration-200">
        <div v-if="useDisconnectStore.disconnect.open"
          class="w-full h-screen flex items-center justify-center fixed top-0 bg-black-500/20 backdrop-blur z-30">

          <AppModalState>

            <template #icon>
              <IconLogOut class="w-7 h-7 text-black" />
            </template>

            <template #title>
              Linq Out
            </template>

            <template #details>
              All conversations will be lost and your details cleared out. Are you sure you want to linq out?
            </template>

            <template #actions>
              <AppButton
                @click.prevent="useDisconnectStore.disconnect.open = false"
                type="button"
                label="Cancle"
                :disabled="useDisconnectStore.disconnect.loading" />
                
              <AppButton
                @click.prevent="useDisconnectStore.connectToDisconnect()"
                type="button"
                label="Yes, linq out"
                :loading="useDisconnectStore.disconnect.loading" />

            </template>

          </AppModalState>

        </div>
      </transition>

    </teleport>
    <!-- sign out -->

</template>
