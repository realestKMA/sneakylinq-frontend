<script setup>
import AppInputField from './AppInputField.vue';
import IconCheck from './icons/IconCheck.vue';
import AppButton from './AppButton.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
    <main>

        <div class="w-10/12 mx-auto flex flex-col gap-y-6 md:w-auto md:mx-0">

            <!-- input field -->
            <AppInputField v-model:model-value="alias" label="Alias" />
            <!-- input field -->

            <!-- input checks -->
            <div class="flex flex-col gap-y-1">
                <span class="inline-flex gap-x-2 items-center">
                    <IconCheck class="w-5 h-5 text-zinc-400" :stroke-width="3" />
                    <p class="text-xs text-zinc-400">Alias must be a mix of alphanumeric characters</p>
                </span>

                <span class="inline-flex gap-x-2 items-center">
                    <IconCheck class="w-5 h-5 text-zinc-400" :stroke-width="3" />
                    <p class="text-xs text-zinc-400">Minimum of 4 characters</p>
                </span>

                <span class="inline-flex gap-x-2 items-center">
                    <IconCheck class="w-5 h-5 text-zinc-400" :stroke-width="3" />
                    <p class="text-xs text-zinc-400">Maximum of 15 characters</p>
                </span>
            </div>
            <!-- input checks -->

            <p class="text-xs text-zinc-600 md:text-sm">
                This alias is used to uniquely identify you on this space.<br>
                It is assigned to you for a duration of 4 hours and can be<br>
                changed within this period.
            </p>

            <RouterLink :to="{name: 'dashboard'}">
                <AppButton label="Proceed with alias" type="button" :disabled="false" />
            </RouterLink>

        </div>
    </main>
</template>