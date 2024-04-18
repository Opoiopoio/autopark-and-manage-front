import { Map, Marker } from 'leaflet'

export class MarkerQueue {
  private _queue: Marker[]
  constructor() {
    this._queue = []
  }

  add(marker: Marker) {
    this._queue.push(marker)
  }

  process(map: Map) {
    this._queue.forEach((marker) => {
      marker.addTo(map)
    })
    this._queue = []
  }
}
