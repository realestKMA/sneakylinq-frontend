import { defineStore } from "pinia"
import { reactive } from "vue";
import { useNotify } from "./notify";
import { useBase } from "./base";
import { useRouter } from "vue-router";
import { useStorage } from "@vueuse/core";


export const useChatP2P = defineStore("chatp2p", () => {

    // stores
    const useBaseStore = useBase()
    const useNotifyStore = useNotify()

    // router & route
    const router = useRouter()

    // data
    const chatConnect = reactive({
        connecting: false,
        connected: false,
        error: null
    })

    const chatNewLinq = reactive({
        sending: false,
        error: null
    })

    const chatMessages = reactive([
        { did: 1, alias: "user_one.linq" },
        { did: 2, alias: "user_two.linq" },
        { did: 3, alias: "user_three.linq" },
        { did: 4, alias: "user_four.linq" },
        { did: 5, alias: "user_five.linq" },
    ])

    const activeChat = useStorage('active-chat', {})


    // chat message delete function
    function deleteChat(did) {
        chatMessages.splice(
            chatMessages.indexOf(chatMessages.find(
                (chat) => chat.did == did
            )
            ), 1)

        router.push({ name: 'dashboard' })
    }


    // websocket instance not initialized
    let ws;

    function connect() {
        chatConnect.connecting = true
        chatConnect.connected = false
        chatConnect.error = null

        ws = new WebSocket(`${useBaseStore.baseWSUrl}/ws/chat/p2p/`, [useBaseStore.did])

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)

            if (data?.status) {
                chatConnect.connecting = false
                chatConnect.connected = true
                chatConnect.error = null

                // device data refreshed
                if (data?.event == useBaseStore.chatEventTypes.CHAT_CONNECT) {
                    useBaseStore.device = data

                    // pop notification
                    useNotifyStore.showNotify(
                        "Chat is now online",
                        null,
                        "bad",
                        5000
                    )
                }

                // new chat message
                else if (data?.event == useBaseStore.chatEventTypes.CHAT_MESSAGE) {
                    console.log("CHAT: New message")
                    // newMessage(data?.data)
                }
            }

            else {
                if (data?.event == useBaseStore.chatEventTypes.CHAT_CONNECT) {
                    chatConnect.connecting = chatConnect.connected = false

                    // pop notification
                    useNotifyStore.showNotify(
                        data?.message,
                        null,
                        "bad",
                        5000
                    )
                }

                else if (data?.event == useBaseStore.chatEventTypes.CHAT_MESSAGE) {
                    chatNewLinq.sending = false
                    chatNewLinq.error = data?.message

                    // pop notification
                    useNotifyStore.showNotify(
                        data?.message,
                        null,
                        "bad",
                        5000
                    )
                }
            }
        }

        ws.onclose = () => {
            chatConnect.connecting = chatConnect.connected = false
            chatConnect.error = null
        }

        ws.onerror = () => {
            chatConnect.connecting = chatConnect.connected = false
            chatConnect.error = null

            // pop notification
            useNotifyStore.showNotify(
                'An error occured',
                null,
                "bad",
                5000
            )
        }
    }

    // send chat messages
    function send(data) {
        chatNewLinq.sending = true
        chatNewLinq.error = null

        ws.send(JSON.stringify(data))
    }


    // disconnect
    function disconnect() {
        ws.close(1000)

        chatConnect.connecting = chatConnect.connected = false
        chatConnect.error = null
    }


    return {
        chatConnect, chatNewLinq, chatMessages,
        activeChat,
        connect, send, disconnect, deleteChat
    }
})