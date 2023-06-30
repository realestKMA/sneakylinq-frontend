import { defineStore } from "pinia"
import { reactive } from "vue";
import { useNotify } from "./notify";
import { useBase } from "./base";
import { useRoute, useRouter } from "vue-router";
import { useStorage } from "@vueuse/core";


export const useChatP2P = defineStore("chatp2p", () => {

    // stores
    const useBaseStore = useBase()
    const useNotifyStore = useNotify()

    // router & route
    const route = useRoute()
    const router = useRouter()

    // storage
    const activeChat = useStorage('active-chat', {})
    const onMessage = useStorage('on-message', {})

    // data to activate chat
    const chatConnect = reactive({ connecting: false, connected: false, error: null })

    const chatNewMessage = reactive({ sending: false, error: null })

    // holds all conversations
    // syntax: { did: 1, alias: "user_one.linq", messages: {type: 'send/received', data: ''} },
    const chatMessages = useStorage('chat-messages', [])

    function newChat(data) {
        if (chatMessages.value.find((chat) => chat.did == data.data.did)) {
            updateChat(data)
        }
        else {
            chatMessages.value.push({
                did: data.data.did,
                alias: data.data.alias,
                messages: [{ type: data.message, data: data.data.message }]
            })

            // update active chat data and navigate to the new chat
            // if initiated by user
            if (data.message == 'send') {
                activeChat.value = chatMessages.value.find((chat) => chat.did == data.data.did)
                router.push({ name: 'chat', params: { did: data.data.did } })
            }

            // notify the receiving user of new chat
            if (data.message == 'received') {
                useNotifyStore.showNotify(`New chat from ${data.data.alias}`, null, "good", 5000)
            }
        }
    }

    function updateChat(data) {
        const linq = chatMessages.value.find((chat) => chat.did == data.data.did)

        // update chat messages with linq
        linq.messages.push({ type: data.message, data: data.data.message })

        // if linq alias is changed
        if (linq.alias !== data.data.alias) {
            // update linq alias
            linq.alias = data.data.alias

            // notify user of linq alias changed
            useNotifyStore.showNotify(`This linq change their alias to ${data.data.alias}`, null, "good", 10000)
        }

        // update active chat messages if currently opened
        if (route.params.did == linq.did) {
            activeChat.value = linq
        }

        // if linqing with a user in the chat list but the user
        // changed their alias
        if (data.message == 'send' && !route.fullPath.endsWith(linq.did)) {
            activeChat.value = linq
            router.push({ name: 'chat', params: { did: data.data.did } })
        }
    }

    function deleteChat(did) {
        chatMessages.value.splice(
            chatMessages.value.indexOf(chatMessages.value.find(
                (chat) => chat.did == did
            )
            ), 1)

        activeChat.value = {}
        router.push({ name: 'dashboard' })
    }

    function onWsMessage(data) {
        if (data.status) {
            chatConnect.connecting = false
            chatConnect.connected = true
            chatConnect.error = null

            // device data refreshed
            if (data?.event == useBaseStore.chatEventTypes.CHAT_CONNECT) {
                useBaseStore.device = data

                // pop notificationu
                useNotifyStore.showNotify("Chat is now online", null, "bad", 5000)
            }

            // new chat message
            else if (data?.event == useBaseStore.chatEventTypes.CHAT_MESSAGE) {
                newChat(data)

                chatNewMessage.sending = false
                chatNewMessage.error = null
            }
        }

        else {
            if (data?.event == useBaseStore.chatEventTypes.CHAT_CONNECT) {
                chatConnect.connecting = chatConnect.connected = false

                // pop notification
                useNotifyStore.showNotify(data?.message, null, "bad", 5000)
            }

            else if (data?.event == useBaseStore.chatEventTypes.CHAT_MESSAGE) {
                chatNewMessage.sending = false
                chatNewMessage.error = data?.message

                // pop notification
                useNotifyStore.showNotify(data?.message, null, "bad", 5000)
            }
        }
    }

    // websocket instance not initialized
    let ws;

    function connect() {
        chatConnect.connecting = true
        chatConnect.connected = false
        chatConnect.error = null

        ws = new WebSocket(`${useBaseStore.baseWSUrl}/ws/chat/p2p/`, [useBaseStore.did])

        ws.onmessage = (e) => {
            onMessage.value = e.data
            onWsMessage(JSON.parse(onMessage.value))
        }

        ws.onclose = () => {
            chatConnect.connecting = chatConnect.connected = false
            chatConnect.error = null
        }

        ws.onerror = () => {
            chatConnect.connecting = chatConnect.connected = false
            chatConnect.error = null

            // pop notification
            useNotifyStore.showNotify('An error occured', null, "bad", 5000
            )
        }
    }

    // send chat messages
    function send(data) {
        chatNewMessage.sending = true
        chatNewMessage.error = null

        ws.send(JSON.stringify(data))
        ws.onmessage = (e) => {
            onMessage.value = e.data
            onWsMessage(JSON.parse(onMessage.value))
        }
    }

    // disconnect
    function disconnect() {
        ws.close(1000)

        chatConnect.connecting = chatConnect.connected = false
        chatConnect.error = null
    }


    return {
        chatConnect, chatNewMessage, chatMessages,
        activeChat,
        connect, send, disconnect, deleteChat
    }
})