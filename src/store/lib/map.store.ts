import { Module } from 'vuex'
import leaflet from 'leaflet'
import { MapModule } from '../../model'

export const mapModule: Module<MapModule, MapModule> = {
  state: {
    map: null,
  },
  getters: {
    map(state) {
      return state.map
    },
  },
  mutations: {
    setMap(state, elem: HTMLDivElement) {
      if (state.map == null) {
        state.map = leaflet
          .map(elem, { zoomControl: false })
          .setView([55.751574, 37.573856], 10)
        leaflet
          .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              // 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
              '',
          })
          .addTo(state.map)
      }
    },
  },
}
