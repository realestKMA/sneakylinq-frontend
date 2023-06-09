<script setup>
import AppInputField from './AppInputField.vue';
import IconCheck from './icons/IconCheck.vue';
import AppButton from './AppButton.vue';
import { computed, ref } from 'vue';
import { useScanQRcode } from '../stores/scanQRCode';
import { useConnect } from '../stores/connect';

// props
const props = defineProps({
    proceedType: {type: Number, default: 1}
})

// refs
const alias = ref("")

// stores
const useScanQRcodeStore = useScanQRcode()
const useConnectStore = useConnect()

// computed
const aliasIsMinLen = computed(() => {
    return alias.value.length >= 4;
})

const aliasIsMaxLen = computed(() => {
    return aliasIsMinLen.value && alias.value.length <= 15
})

const aliasIsAlphaNum = computed(() => {
    let isAlphaNum = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9_]+$/.test(alias.value)
    let isAlpha = /[A-Za-z]+$/.test(alias.value)

    return isAlphaNum || isAlpha
})

const aliasIsValid = computed(() => {
    return (aliasIsMinLen.value && aliasIsMaxLen.value && aliasIsAlphaNum.value);
})
</script>

<template>
    <form @submit.prevent class="mx-auto flex flex-col gap-y-6 md:w-auto md:mx-0">

        <!-- input field -->
        <AppInputField v-model:model-value="alias" label="Alias (nickname)" v-model.lower="alias" max="15" />
        <!-- input field -->


        <p class="text-xs text-zinc-600 md:text-sm">
            This alias is used to uniquely identify you on this space.
            It is assigned to you for a duration of 4 hours and can be
            changed within this period.
        </p>

        <!-- input checks -->
        <div class="flex flex-col gap-y-1">
            <span class="inline-flex gap-x-2 items-center" :class="aliasIsMinLen ? 'text-green-500' : 'text-zinc-400'">
                <IconCheck class="w-5 h-5 duration-300" stroke-width="3" />
                <p class="text-xs duration-300">Minimum of 4 characters</p>
            </span>

            <span class="inline-flex gap-x-2 items-center" :class="aliasIsMaxLen ? 'text-green-500' : 'text-zinc-400'">
                <IconCheck class="w-5 h-5" stroke-width="3" />
                <p class="text-xs">Maximum of 15 characters</p>
            </span>
            <span class="inline-flex gap-x-2 items-center" :class="aliasIsAlphaNum ? 'text-green-500' : 'text-zinc-400'">
                <IconCheck class="w-5 h-5" stroke-width="3" />
                <p class="text-xs">Alias can contain letters, numers and undescore but not numbers only.</p>
            </span>
        </div>
        <!-- input checks -->

        <AppButton
            :label="props.proceedType == 1 ? 'Linq up here': 'Linq up'"
            type="submit"
            @click="props.proceedType == 1 ? useConnectStore.send({alias: alias}) : useScanQRcodeStore.send({alias: alias})"
            loading-text="Linqing..."
            :loading="useScanQRcodeStore.alias.loading || useConnectStore.alias.loading"
            :disabled="!aliasIsValid || useScanQRcodeStore.alias.loading || useConnectStore.alias.loading" />

        <!-- errors -->
        <ul v-if="useScanQRcodeStore.alias.error || useConnectStore.alias.error" class="w-full border-t border-zinc-100 text-xs text-red-500 py-5 list-disc list-inside md:text-sm">
            <li>
                {{ useScanQRcodeStore.alias.error || useConnectStore.alias.error }}
            </li>
        </ul>
        <!-- errors -->


    </form>
</template>