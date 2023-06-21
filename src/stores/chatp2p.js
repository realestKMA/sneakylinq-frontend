import { defineStore } from "pinia"
import { reactive } from "vue";
import { useNotify } from "./notify";
import { useBase } from "./base";


export const useChatP2P = defineStore("chatp2p", () => {

    // stores
    const useBaseStore = useBase()
    const useNotifyStore = useNotify()

    // data
    const chatConnect = reactive({
        connecting: false,
        connected: false,
        error: null
    })

    const chatMessage = reactive({
        sending: false,
        sent: false,
        error: null
    })

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
                }

                // new chat message
                else if (data?.event == useBaseStore.chatEventTypes.CHAT_MESSAGE) {
                    console.log("CHAT: New message")
                }
            }

            else {
                if (data?.event == useBaseStore.chatEventTypes.CHAT_CONNECT) {
                    chatConnect.connecting = chatConnect.connected = false

                    // pop notification
                    useNotifyStore.showNotify(
                        data?.message,
                        null,
                        "good",
                        5000
                    )
                }

                else if (data?.event == useBaseStore.chatEventTypes.CHAT_MESSAGE) {
                    chatMessage.sending = chatMessage.sent = false

                    // pop notification
                    useNotifyStore.showNotify(
                        data?.message,
                        null,
                        "good",
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
        }
    }

    // send chat messages
    function send(data) {
        ws.send(JSON.stringify(data))
    }


    // disconnect
    function disconnect() {
        ws.close(1000)

        chatConnect.connecting = chatConnect.connected = false
        chatConnect.error = null

    }


    return { chatConnect, chatMessage, connect, send, disconnect }
})