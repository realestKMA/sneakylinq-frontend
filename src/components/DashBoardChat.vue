<script setup>
import AppButton from './AppButton.vue';
import AppChatTextField from './AppChatTextField.vue';
import IconPaperPlane from './icons/IconPaperPlane.vue';
import { ref, computed, onMounted } from 'vue';

// refs
const message = ref("")
const chatbox = ref(null)

const chats = [
    {id: 1, type: "send", msg: "Hello to you too!"},
    {id: 2, type: "receive", msg: "Hello to you too!"},
    {id: 3, type: "send", msg: "Hello to you too!"},
    {id: 4, type: "receive", msg: "Hello to you too!"},
    {id: 5, type: "send", msg: "Hello to you too!"},
    {id: 6, type: "receive", msg: "Hello to you too!"},
    {id: 7, type: "send", msg: "Hello to you too!"},
    {id: 8, type: "receive", msg: "Hello to you too!"},
    {id: 9, type: "send", msg: "Hello to you too!"},
    {id: 10, type: "receive", msg: "Hello to you too!"},
    {id: 11, type: "send", msg: "Hello to you too!"},
    {id: 12, type: "receive", msg: "Hello to you too!"},
    {id: 13, type: "send", msg: "Hello to you too!"},
    {id: 14, type: "receive", msg: "Hello to you too!"},
    {id: 15, type: "send", msg: "Hello to you too!"},
    {id: 16, type: "receive", msg: "Hello to you too!"},
    {id: 17, type: "send", msg: "Hello to you too!"},
    {id: 18, type: "receive", msg: "Hello to you too!"},
    {id: 19, type: "send", msg: "Hello to you too!"},
    {id: 20, type: "receive", msg: "Hello to you too!"},
]

// computed
const isTyping = computed(() => {
    return message.value.length > 0;
})

onMounted(() => {
    chatbox.value.scroll({
        top: chatbox.value.scrollHeight,
        behavior: "smooth"
    })
})
</script>


<template>
    <main ref="chatbox" class="w-full h-full overflow-auto">

        <div class="h-full w-10/12 mx-auto flex flex-col md:w-9/12 lg:w-8/12">

            <!-- chats messages -->
            <div class="relative w-full flex-grow flex flex-col gap-y-4">
                <!-- fade effect -->
                <div class="sticky top-0 w-full h-40 bg-gradient-to-t from-transparent via-white/90 to-white md:h-20"></div>
                <!-- fade effect -->

                <p
                    v-for="chat in chats"
                    :key="chat.id"
                    :class="chat.type == 'send' ? 'bg-zinc-100 self-end':'bg-cyan-400 text-white'"
                    class="p-2 rounded w-5/12 text-sm md:text-base md:w-6/12 lg:w-5/12">
                    {{ chat.msg }}
                </p>

            </div>
            <!-- chats messages -->

            <div class="sticky bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/90 to-transparent flex flex-col pt-10 pb-6 gap-y-6">

                <!-- chat input -->
                <form @submit.prevent class="flex items-center justify-between gap-x-4">
                    <AppChatTextField class="w-full" placeholder="Send a message..." v-model:model-value="message" />

                    <button type="submit" class="group">
                        <IconPaperPlane
                            :class="isTyping ? 'text-cyan-500 animate-pulse':'text-zinc-300'"
                            class="w-12 h-12 duration-300 hover:text-cyan-500" stroke-width="1.5" />
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