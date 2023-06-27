import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useBase = defineStore("base", () => {

    // urls
    // const baseUrl = "http://127.0.0.1:5173"
    // const baseWSUrl = "ws://127.0.0.1:8000/"
    const baseUrl = "http://192.168.1.103:5173"
    const baseWSUrl = "ws://192.168.1.103:8000"
    
    // storage
    const did = useStorage("did")
    const device = useStorage("device", {})
    const scannedDevice = useStorage("scanned-device", {})

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

    // data
    const leftMobileMenu = ref(false)


    return { 
        baseUrl, baseWSUrl, did, device, scannedDevice,
        deviceEventTypes, scanEventTypes, chatEventTypes,
        leftMobileMenu
    }
})