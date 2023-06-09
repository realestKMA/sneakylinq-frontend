<script setup>
import AppButton from './AppButton.vue';
import AppInputField from './AppInputField.vue';
import AppLogo from './AppLogo.vue';

</script>


<template>
    <main class="w-10/12 mx-auto h-full bg-white flex flex-col gap-y-16 items-center justify-center selection:bg-black selection:text-white md:w-8/12 lg:w-10/12 2xl:w-8/12">

        <AppLogo class="text-5xl text-black" />

        <div class="w-full flex flex-col gap-10 md:w-full lg:w-7/12 xl:w-6/12">
            <AppInputField label="Alias" />


            <p class="text-xs text-zinc-600 md:text-sm">
                Provide the alias of whoever you want to linq up with,
                ask them to go login and provide you with their alias.
            </p>

            <RouterLink :to="{name: 'dashboardchat'}">
                <AppButton label="Linq up" type="button" :disabled="false" />
            </RouterLink>
        </div>

    </main>
</template>