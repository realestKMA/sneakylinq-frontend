import { reactify, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useBase = defineStore("base", () => {

    // urls
    // const baseUrl = "http://127.0.0.1:5173"
    // const baseWSUrl = "ws://127.0.0.1:8000/"
    const baseUrl = "http://192.168.1.103:5173"
    const baseWSUrl = "ws://192.168.1.103:8000"
    
    // storage
    const did = useLocalStorage("did")
    const device = useLocalStorage("device", {})
    const scannedDevice = useLocalStorage("scanned-device", {})

    // refs
    const disconnect = ref(false)

    // events
    const deviceEventTypes = {
        DEVICE_CONNECT: "device.connect",
        DEVICE_NOTIFY: "device.notify",
        DEVICE_SETUP: "device.setup",
    }

    const scanEventTypes = {
        SCAN_CONNECT: "scan.connect",
        SCAN_NOTIFY: "scan.notify",
        SCAN_SETUP: "scan.setup",
    }

    const chatEventTypes = {
        CHAT_SETUP: "chat.setup",
        CHAT_MESSAGE: "chat.message",
        CHAT_CONNECT: "chat.connect",
    }



    return { 
        baseUrl, baseWSUrl, did, device, scannedDevice,
        deviceEventTypes, scanEventTypes, chatEventTypes,
        disconnect
    }
})