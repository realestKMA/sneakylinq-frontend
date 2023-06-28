<script setup>
import { computed, ref } from 'vue';
import AppButton from './AppButton.vue';
import AppInputField from './AppInputField.vue';
import AppLogo from './AppLogo.vue';
import { useChatP2P } from '../stores/chatp2p';
import { useBase } from '../stores/base';
import IconCheck from './icons/IconCheck.vue';
import AppChatTextField from './AppChatTextField.vue';

// stores
const useBaseStore = useBase()
const useChatP2PStore = useChatP2P()

// refs
const alias = ref("")
const message = ref("")

// computed
const aliasIsValid = computed(() => {
    return /[a-z0-9_]+[.]linq$/.test(alias.value)
})

const aliasIsNotSelf = computed(() => {
    return aliasIsValid.value && alias.value !== useBaseStore.device?.data?.alias;
})

const allChecksPassed = computed(() => {
    return useChatP2PStore.chatConnect.connected
    && aliasIsValid.value
    && aliasIsNotSelf.value
    && message.value.length > 0;
})
</script>


<template>
    <form
        class="w-10/12 mx-auto h-full bg-white flex flex-col gap-y-16 items-center justify-center selection:bg-black selection:text-white md:w-8/12 lg:w-10/12 2xl:w-8/12">

        <AppLogo class="text-5xl text-black" />

        <div class="w-full flex flex-col md:w-full lg:w-7/12 xl:w-6/12">
            <AppInputField label="Alias (nickname)" max="20" v-model.lower="alias" />

            <p class="text-xs text-zinc-600 mt-4 md:text-sm">
                Provide the alias of whoever you want to linq up with,
                ask them to go login and provide you with their alias.
            </p>

            <!-- alias checks -->
            <div class="flex flex-col gap-y-1 mt-4">
                <span class="inline-flex gap-x-2 items-center" :class="aliasIsNotSelf ? 'text-green-500' : 'text-zinc-400'">
                    <IconCheck class="w-5 h-5 duration-300" stroke-width="3" />
                    <p class="text-xs duration-300">You cannot linq with yourself ({{ useBaseStore.device?.data?.alias }})</p>
                </span>

                <span class="inline-flex gap-x-2 items-center" :class="aliasIsValid ? 'text-green-500' : 'text-zinc-400'">
                    <IconCheck class="w-5 h-5 duration-300" stroke-width="3" />
                    <p class="text-xs duration-300">Alias must end with '.linq'</p>
                </span>
            </div>
            <!-- alias checks -->

            <AppChatTextField v-model="message" label="Mesage" class="mt-10" placeholder="Chat message..." />

            <AppButton
                type="button"
                @click="useChatP2PStore.send({to: alias, message: message})"
                :label="useChatP2PStore.chatConnect.connected ? 'Linq up':'You are offline'"
                loading-text="Linqing..."
                :disabled="!allChecksPassed" class="pt-10" />

            <!-- errors -->
            <ul v-if="useChatP2PStore.chatNewMessage.error" class="w-full border-t border-zinc-100 text-xs text-red-500 mt-10 py-5 list-disc list-inside md:text-sm">
                <li>{{ useChatP2PStore.chatNewMessage.error }}</li>
            </ul>
            <!-- errors -->

        </div>

    </form>
</template>