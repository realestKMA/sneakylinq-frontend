<script setup>
import AppButton from './AppButton.vue';
import { RouterLink } from 'vue-router';

</script>

<template>
    <main class="w-full h-full flex flex-col gap-y-10 items-center justify-center">

        <h3>Page not found</h3>

        <RouterLink :to="{name: 'connect'}">
            <AppButton label="Back Home" />
        </RouterLink>

    </main>
</template>