import config from '../../config'
import { ServerResponse } from '../../model'

class WebsocketClient {
  private readonly _ws: WebSocket
  constructor() {
    this._ws = new WebSocket(config.websocketUrl)
  }

  onMessage() {
    return (msg: string) => {
      const data = new ServerResponse(JSON.parse(msg))
    }
  }
}
