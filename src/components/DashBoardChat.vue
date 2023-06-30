<script setup>
import { useChatP2P } from '../stores/chatp2p';
import AppChatTextField from './AppChatTextField.vue';
import IconPaperPlane from './icons/IconPaperPlane.vue';
import { ref, computed, onMounted, watch } from 'vue';

// props
const props = defineProps({
    did: { type: String, required: true }
})

// stores
const useChatP2PStore = useChatP2P()

// refs
const message = ref("")
const chatbox = ref(null)

// computed
const isTyping = computed(() => {
    return message.value.length > 0;
})

const toAlias = computed(() => {
    return useChatP2PStore.chatMessages.find(
        (chat) => chat.did == props.did
    ).alias
})

// methods
const sendChat = () => {
    useChatP2PStore.send({to: toAlias.value, message: message.value})

    message.value = ''
}

const scrollToBottom = () => {
    chatbox.value.scroll({
        top: chatbox.value.scrollHeight,
        behavior: "smooth"
    })
}

// watchers
watch(
    () => useChatP2PStore.activeChat,
    () => { scrollToBottom() },
    {deep: true}
)

onMounted(() => {
    scrollToBottom()
})
</script>


<template>
    <main ref="chatbox" class="w-full h-full overflow-auto">

        <div class="h-full w-10/12 mx-auto flex flex-col md:w-9/12 lg:w-8/12">

            <!-- chats messages -->
            <div class="relative w-full flex-grow flex flex-col justify-end gap-y-4">
                <!-- fade effect -->
                <div class="sticky top-0 w-full h-60 bg-gradient-to-t from-transparent via-white/90 to-white md:h-20"></div>
                <!-- fade effect -->

                <TransitionGroup
                    enter-from-class="translate-y-5 opacity-0"
                    enter-active-class="duration-500"
                    leave-active-class="duration-500">
                    <p
                        v-for="(chat, index) in useChatP2PStore.activeChat.messages"
                        :key="index"
                        :class="chat.type == 'send' ? 'bg-zinc-100 self-end' : 'bg-black text-white'"
                        class="p-2 rounded w-7/12 text-sm whitespace-pre-wrap break-words selection:bg-cyan-500 md:text-base md:w-6/12 lg:w-5/12">
                        {{ chat.data }}
                    </p>
                </TransitionGroup>

            </div>
            <!-- chats messages -->

            <div
                class="sticky bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/90 to-transparent flex flex-col pt-10 pb-6 gap-y-6">

                <!-- chat input -->
                <form @submit.prevent class="flex items-center justify-between gap-x-4">
                    <AppChatTextField
                        class="w-full"
                        max="200"
                        :placeholder="useChatP2PStore.chatConnect.connected ? 'Send a message...':'Chat is offline'"
                        :disabled="!useChatP2PStore.chatConnect.connected || useChatP2PStore.chatNewMessage.sending"
                        v-model:model-value="message" />

                    <button
                        type="submit"
                        @click="sendChat"
                        :disabled="!isTyping"
                        class="group cursor-pointer disabled:cursor-not-allowed">
                            <IconPaperPlane
                                :class="isTyping ? 'text-black' : 'text-zinc-300'"
                                class="w-12 h-12 duration-300 group-hover:text-black group-disabled:text-zinc-300"
                                stroke-width="1.5" />
                    </button>
                </form>
                <!-- chat input -->

                <!-- chat linq with -->
                <span class="flex items-center justify-center gap-x-1">
                    <p class="text-xs text-zinc-400">Linq with</p>
                    <p class="text-xs text-black font-medium">{{ useChatP2PStore.activeChat.alias }}</p>
                </span>
                <!-- chat linq with -->

            </div>
            <!-- chat input and linq -->
        </div>

    </main>
</template>