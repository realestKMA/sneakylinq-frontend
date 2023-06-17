import { defineStore } from 'pinia'
import { useBase } from './base'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export const useDisconnect = defineStore('disconnect', () => {

  // stores
  const useBaseStore = useBase()

  // route and router
  const router = useRouter()

  const disconnect = reactive({
    open: false,
    loading: false,
  })

  function connectToDisconnect() {
    disconnect.loading = false

    const ws = new WebSocket(`${useBaseStore.baseWSUrl}/ws/disconnect/`, [useBaseStore.did])

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)

      if (data?.status) {
        disconnect.loading = true

        // clear device data and close websocket connection
        ws.close(1000)

        setTimeout(() => {
          disconnect.loading = false
          
          // navigate to connect view
          router.push({ name: "connect" })

          // clear device data from localStorage
          useBaseStore.device = {}

          // close disconnect modal
          disconnect.open = false
        }, 1000)

      }

      else {
        useBaseStore.did = null

        setTimeout(() => {
          ws.close()
          disconnect.loading = false

          // navigate to connect view
          router.push({ name: "connect" })
          // clear device data from localStorage
          useBaseStore.device = {}

          // close disconnect modal
          disconnect.open = false
        }, 1000)
      }
    }

  }

  return { disconnect, connectToDisconnect }
})
