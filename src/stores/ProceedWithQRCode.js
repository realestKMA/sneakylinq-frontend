import { defineStore } from "pinia";
import { reactive } from "vue";
import { useBase } from "./base";

export const useProceedWithQRCode = defineStore('proceedWithQRCode',  () => {

    // stores
    const useBaseStore = useBase()

    const qrcode = reactive({
        value: "null",
        loading: false,
        scanned: false,
        error: null,
    })

    // actions
    function connect() {
        qrcode.error = null
        qrcode.loading = true
        qrcode.scanned = false
        
        const ws = new WebSocket(`${useBaseStore.baseWSUrl}/ws/connect/`, [useBaseStore.did])

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)

            if (data['status']) {

                // device connected
                if (data['event'] == 'device.connect') {
                    useBaseStore.device = data
                    qrcode.error = null
                    qrcode.loading = false
                    qrcode.scanned = false
                    qrcode.value = `${useBaseStore.baseUrl}/connect/scan/${useBaseStore.did}/`
                }

                // device scanned
                if (data['event'] == 'scan.connect') {
                    const x = 1
                }
            }
            else {
                qrcode.error = data['message']
                qrcode.loading = false
                qrcode.scanned = false
            }
        }
    }


    function scanConnect() {

    }

    
    return { qrcode, connect }

})