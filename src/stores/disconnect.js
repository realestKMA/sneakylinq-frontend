import { defineStore } from 'pinia'
import { useBase } from './base.js'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useChatP2P } from './chatp2p.js'

export const useDisconnect = defineStore('disconnect', () => {

  // stores
  const useBaseStore = useBase()
  const useChatP2PStore = useChatP2P()

  // route and router
  const router = useRouter()

  const disconnect = reactive({
    open: false,
    loading: false,
  })

  function connectToDisconnect() {
    disconnect.loading = false

    // disconnect chat first
    if (useChatP2PStore.chatConnect.connected) {
      useChatP2PStore.disconnect()
    }

    const ws = new WebSocket(`${useBaseStore.baseWSUrl}/ws/disconnect/`, [useBaseStore.did])

    ws.onmessage = () => {
      disconnect.loading = true

      // close websocket connection
      ws.close(1000)

      setTimeout(() => {
        disconnect.open = disconnect.loading = false

        // reset device data alias to linq 
        useBaseStore.device.data.alias = ''

        // navigate to connect view
        router.push({ name: "connect" })
      }, 1000)
    }

    ws.onerror = () => {
      disconnect.loading = true

      setTimeout(() => {
        // reset device data alias to linq 
        useBaseStore.device.data.alias = ''

        disconnect.open = disconnect.loading = false

        // navigate to connect view
        router.push({ name: "connect" })
      }, 1000)
    }

  }

  return { disconnect, connectToDisconnect }
})
