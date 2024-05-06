import axios from 'axios'
import { ReqeustQueueItem } from '@/model'
import { useAuthStore } from '@/store'

export class ReqeustQueue {
  private _queue: ReqeustQueueItem[]
  private _processPromise?: Promise<void>
  get processPromise() {
    return this._processPromise
  }
  constructor() {
    this._queue = []
  }

  add(item: ReqeustQueueItem) {
    this._queue.push(item)
  }

  run(token: string): Promise<void>
  run(token: null, error: unknown): Promise<void>
  async run(token: string | null, error?: unknown) {
    const authStore = useAuthStore()
    const promises = this._queue.map(async (resolvers) => {
      if (token) {
        resolvers.config.headers.Authorization = `Bearer ${authStore.accessToken}`
        try {
          const response = await axios(resolvers.config)
          resolvers.resolve(response)
        } catch (error) {
          resolvers.reject(error)
        }
      } else {
        resolvers.reject(error)
      }
    })

    this._processPromise = Promise.all(promises).then()
    await this._processPromise

    this._processPromise = undefined
  }
}
