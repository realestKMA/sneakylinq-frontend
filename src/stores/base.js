import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";


export const useBase = defineStore("base", () => {

    // urls
    // const baseUrl = "http://127.0.0.1:5173"
    // const baseWSUrl = "ws://127.0.0.1:8000/"
    const baseUrl = "http://192.168.1.103:5173"
    const baseWSUrl = "ws://192.168.1.103:8000"
    
    // storage
    const did = useLocalStorage("did")
    const device = useLocalStorage("device", {})


    return { baseUrl, baseWSUrl, did, device }
})