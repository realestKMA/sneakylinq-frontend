import { defineStore } from "pinia";
import { reactive } from "vue";
import { useBase } from "./base";
import { useRouter } from "vue-router";


export const useScanQRcode = defineStore('scanQRcode', () => {

    // stores
    const useBaseStore = useBase()

    // route & router
    const router = useRouter()

    //
    const scanner = reactive({
        loading: false,
        error: null,
        completed: false,
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
        alias.error = null
        alias.loading = false

        ws = new WebSocket(`${useBaseStore.baseWSUrl}/ws/connect/scan/${did}/`)

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
            
            if (data['status']) {
    
                // device connected
                if (data['event'] == useBaseStore.scanEventTypes.SCAN_CONNECT) {
                    scanner.error = null
                    scanner.loading = false

                    alias.loading = false
                    alias.error = null
                }

                // device alias accepted
                else if (data['event'] == useBaseStore.scanEventTypes.SCAN_SETUP) {
                    scanner.error = null
                    scanner.loading = false
                    
                    alias.loading = false
                    alias.error = null
                    
                    ws.close()

                    setTimeout(() => {
                        scanner.completed = true
                    }, 1000)

                    // navigate to home view
                    setTimeout(() => {
                        router.push({name: 'home'})
                    }, 4000)
                }
    
            }
            else {
                if (data['event'] == useBaseStore.scanEventTypes.SCAN_CONNECT) {
                    scanner.loading = scanner.completed = false
                    scanner.error = data['message']
                }
                else if (data['event'] == useBaseStore.scanEventTypes.SCAN_SETUP) {
                    alias.loading = false
                    alias.error = data['message']
                }
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