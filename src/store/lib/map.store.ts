import { Module } from 'vuex'
import leaflet, { Marker, Map } from 'leaflet'
import { MapState } from '../../model'

export const mapModule: Module<MapState, MapState> = {
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
          .setView([55.751574, 37.573856], 15)

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
  actions: {
    flyTo(context, location: [number, number]) {
      document.querySelector('#show-button')?.dispatchEvent(new MouseEvent('click'))

      try {
        context.state.map?.flyTo(location, 15)
      } catch (error) {
        console.error(error)
      }
    },

    addMarker(context, marker: Marker) {
      const map = context.state.map

      console.log(map)

      if (!map) {
        this.watch(
          (state) => state.map,
          (value) => {
            console.log('watch', value)
            marker.addTo(value as Map)
          },
          { once: true }
        )
        return
      }
      marker.addTo(map)
    },

    removeMarker(context, marker: Marker) {
      context.state.map?.removeLayer(marker)
    },
  },
}
