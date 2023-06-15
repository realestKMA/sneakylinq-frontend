import { defineStore } from "pinia";
import { reactive } from "vue";
import { useBase } from "./base";


export const useScanQRcode = defineStore('scanQRcode', () => {

    // stores
    const useBaseStore = useBase()

    //
    const scanner = reactive({
        loading: false,
        error: null,
        completed: false
    })

    const alias = reactive({
        loading: false,
        error: null,
    })


    // websocket
    let ws;

    function connect(did) {
        scanner.error = null
        scanner.loading = true

        ws = new WebSocket(`${useBaseStore.baseWSUrl}/ws/connect/scan/${did}/`)

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
    
            scanner.data = data
    
            if (data['status']) {
    
                // device connected
                if (data['event'] == useBaseStore.scanEventTypes.SCAN_CONNECT) {
                    scanner.error = null
                    scanner.loading = false

                    alias.loading = false
                    alias.error = null
                }

                else if (data['event'] == useBaseStore.scanEventTypes.SCAN_SETUP) {
                    scanner.error = null
                    scanner.loading = false
                    scanner.completed = true

                    alias.loading = false
                    alias.error = null

                    ws.close()
                }
    
            }
            else {
                scanner.loading = scanner.completed = false
                scanner.error = data['message']
    
                alias.loading = false
                alias.error = data['message']
            }
        }
    
    }


    function send(data) {
        alias.loading = true
        alias.error = null

        ws.send(JSON.stringify(data))
    }


    return { scanner, alias, connect, send }

})