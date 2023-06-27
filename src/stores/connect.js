import { defineStore } from "pinia";
import { reactive } from "vue";
import { useBase } from "./base";
import { useRouter } from "vue-router";
import { useNotify } from "./notify";


export const useConnect = defineStore('connect', () => {

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

    //
    const alias = reactive({
        loading: false,
        error: null,
        success: false,
        connected: false,
    })

    // websocket
    let ws;

    // actions
    function connect() {
        qrcode.loading = true
        qrcode.error = alias.error = null
        qrcode.scanned = qrcode.success = qrcode.expired = false
        alias.success = alias.loading = alias.connected = false

        // set expire to true after 60 seconds
        setTimeout(() => {
            qrcode.expired = true
        }, 60000);

        ws = new WebSocket(`${useBaseStore.baseWSUrl}/ws/connect/`, [useBaseStore.did])

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)

            if (data?.status) {
                alias.connected = true

                // device connected and alias already set
                if ((data?.event == useBaseStore.deviceEventTypes.DEVICE_CONNECT) && ('alias' in data['data'])) {
                    useBaseStore.device = data

                    qrcode.error = null
                    qrcode.loading = qrcode.scanned = qrcode.expired = false
                    qrcode.success = true

                    // delay then navigate to user dashboard
                    setTimeout(() => {
                        qrcode.success = false
                        router.push({ name: "dashboardwelcome" })
                        ws.close()
                    }, 2000)
                }

                // device connectd
                else if (data?.event == useBaseStore.deviceEventTypes.DEVICE_CONNECT) {
                    useBaseStore.device = data

                    qrcode.value = `${useBaseStore.baseUrl}/connect/scan/${useBaseStore.did}/`
                    qrcode.error = null
                    qrcode.loading = qrcode.scanned = qrcode.expired = false
                }

                // device scanned successfully
                else if (data?.event == useBaseStore.scanEventTypes.SCAN_CONNECT) {
                    qrcode.error = null
                    qrcode.loading = qrcode.expired = false
                    qrcode.scanned = true

                    setTimeout(() => {
                        qrcode.scanned = false
                    }, 10000)
                }

                // device alias setup via qrcode
                else if (data?.event == useBaseStore.scanEventTypes.SCAN_SETUP) {
                    useBaseStore.device = data

                    qrcode.error = null
                    qrcode.loading = qrcode.scanned = qrcode.expired = false
                    qrcode.success = true

                    // delay then navigate to user dashboard
                    setTimeout(() => {
                        qrcode.success = false
                        router.push({ name: "dashboardwelcome" })
                        ws.close()
                    }, 2000)
                }

                // device alias setup via alias on connect view
                else if (data?.event == useBaseStore.deviceEventTypes.DEVICE_SETUP) {
                    useBaseStore.device = data
                    
                    alias.success = true
                    alias.error = null

                    // delay then navigate to user dashboard
                    setTimeout(() => {
                        alias.success = false
                        router.push({ name: "dashboardwelcome" })
                        ws.close()
                    }, 2000)
                }
            }
            else {
                if (data?.event == useBaseStore.scanEventTypes.SCAN_SETUP) {
                    qrcode.loading = qrcode.scanned = qrcode.success = qrcode.expired = false
                    qrcode.error = data['message']
                }
                else if (data?.event == useBaseStore.deviceEventTypes.DEVICE_SETUP) {
                    alias.loading = alias.connected =false
                    alias.error = data['message']
                }
            }
        }

        ws.onerror = () => {
            qrcode.scanned = qrcode.success = qrcode.expired = qrcode.loading = false
            alias.success = alias.loading = alias.connected = false
            alias.error = null
            qrcode.error = true
        }
    }

    function send(data) {
        alias.loading = true
        alias.error = null

        ws.send(JSON.stringify(data))
    }


    return { qrcode, alias, connect, send }

})