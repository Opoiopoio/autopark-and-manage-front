import { StoreGeneric } from 'pinia'

import config from '@/config'
import { ServerResponse } from '@/model'

import { pinia } from '@/store'

class WebsocketClient {
  private readonly _ws: WebSocket
  private readonly _storeMap: Map<string, StoreGeneric>
  constructor() {
    this._ws = new WebSocket(config.websocketUrl)
    this._ws.onmessage = this.onMessage()
    this._ws.onerror = this.onError()

    this._storeMap = new Map()

    pinia.use(({ store }) => {
      this._storeMap.set(store.$id, store)
    })
  }

  onMessage(): (this: WebSocket, ev: MessageEvent) => void {
    return (msg) => {
      const { data, resource, type } = new ServerResponse(JSON.parse(msg.data))

      const store = this._storeMap.get(resource)

      if (!store) {
        if (import.meta.env.DEV) console.warn(`Unknown Resource: ${resource}`)

        return
      }

      if (!(type in store)) {
        if (import.meta.env.DEV) console.warn(`Unknown Message Type: ${type}`)

        return
      }

      store[type](data)
    }
  }

  onError(): (this: WebSocket, ev: Event) => void {
    return (msg) => {
      msg.preventDefault()
      console.error(msg)
    }
  }
}

export const client = new WebsocketClient()
