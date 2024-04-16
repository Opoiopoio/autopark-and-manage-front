import config from '../../config'
import { ServerResponse } from '../../model'
import store from '../../store'
class WebsocketClient {
  private readonly _ws: WebSocket
  constructor() {
    this._ws = new WebSocket(config.websocketUrl)
    this._ws.onmessage = this.onMessage()
    this._ws.onerror = this.onError()
  }

  onMessage(): (this: WebSocket, ev: MessageEvent) => void {
    return (msg) => {
      const data = new ServerResponse(JSON.parse(msg.data))

      store.dispatch(`${data.resource}/${data.type}`)
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
