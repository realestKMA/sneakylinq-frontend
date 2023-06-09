<script setup>
import AppChatInput from './AppChatInput.vue'
import IconPaperPlane from './icons/IconPaperPlane.vue';
</script>


<template>
    <main class="w-full h-full">

        <div class="h-full w-11/12 mx-auto flex flex-col md:w-8/12 lg:w-7/12">

            <!-- chats messages -->
            <div class="relative w-full flex-grow border-4 border-cyan-500 overflow-auto">
                <!-- fade effect -->
                <div class="sticky top-0 w-full h-40 bg-gradient-to-t from-white/60 via-white/90 to-white backdrop-blur-sm">
                </div>
                <!-- fade effect -->
                <div v-for="n in [1,2,3,4,5,6,7,8,9,10,11,12]" class="w-40 h-40 bg-red-500"></div>
            </div>
            <!-- chats messages -->

            <div class="w-full flex flex-col pt-10 pb-6 gap-y-6">

                <!-- chat input -->
                <form @submit.prevent class="flex items-center justify-between gap-x-4">
                    <AppChatInput class="w-full" />

                    <button type="submit" class="group">
                        <IconPaperPlane class="w-12 h-12 text-zinc-300 duration-300 hover:text-cyan-500" stroke-width="1.5" />
                    </button>
                </form>
                <!-- chat input -->

                <!-- chat linq with -->
                <span class="flex items-center justify-center gap-x-1">
                    <p class="text-xs text-zinc-400">Linq with</p>
                    <p class="text-xs text-cyan-400 font-medium">yo_swerve.linq</p>
                </span>
                <!-- chat linq with -->

            </div>
            <!-- chat input and linq -->
        </div>

    </main>
</template>