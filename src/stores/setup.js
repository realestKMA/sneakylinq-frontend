import { defineStore } from "pinia";
import { reactive } from "vue";
import { useBase } from "./base";
import { useRouter } from "vue-router";


export const useSetup = defineStore('setup', () => {

    // stores
    const useBaseStore = useBase()

    // route & router
    const router = useRouter()

    //
    const qrcode = reactive({
        value: "null",
        loading: false,
        scanned: false,
        error: null,
        expired: false,
        success: false,
    })

    // websocket
    let ws;
    
    // actions
    function connect() {
        qrcode.error = null
        qrcode.loading = true
        qrcode.scanned = false
        
        ws = new WebSocket(`${useBaseStore.baseWSUrl}/ws/connect/`, [useBaseStore.did])
        
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)

            if (data['status']) {

                // device connected and alias already set
                if (data['event'] == useBaseStore.deviceEventTypes.DEVICE_CONNECT && 'alias' in data['data']) {
                    useBaseStore.device = data
                    qrcode.error = null
                    qrcode.loading = qrcode.scanned = false
                    qrcode.success = true

                    // delay then navigate to user dashboard
                    setTimeout(() => {
                        qrcode.success = false
                        router.push({name: "dashboardwelcome"})
                        ws.close()
                    }, 5000)
                }

                else if (data['event'] == useBaseStore.deviceEventTypes.DEVICE_CONNECT) {
                    useBaseStore.device = data
                    qrcode.error = null
                    qrcode.loading = qrcode.scanned = false
                    qrcode.value = `${useBaseStore.baseUrl}/connect/scan/${useBaseStore.did}/`
                }

                // device scanned
                else if (data['event'] == useBaseStore.scanEventTypes.SCAN_CONNECT) {
                    qrcode.error = null
                    qrcode.loading = false
                    qrcode.scanned = true

                    setTimeout(() => {
                        qrcode.scanned = false
                    }, 10000)
                }

                // device alias set
                else if (data['event'] == useBaseStore.scanEventTypes.SCAN_SETUP) {
                    useBaseStore.device = data
                    qrcode.error = null
                    qrcode.loading = qrcode.scanned = false
                    qrcode.success = true

                    // delay then navigate to user dashboard
                    setTimeout(() => {
                        qrcode.success = false
                        router.push({name: "dashboardwelcome"})
                        ws.close()
                    }, 5000)
                }
            }
            else {
                qrcode.loading = qrcode.scanned = qrcode.success = qrcode.expired = false
                qrcode.error = data['message']
            }
        }
    }


    return { qrcode, connect }

})