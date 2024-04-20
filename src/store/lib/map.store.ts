import leaflet, { Marker, Map } from 'leaflet'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { MarkerQueue } from '@/utils'

const markerQueue = new MarkerQueue()

export const useMapStore = defineStore('map', () => {
  const map = ref<Map>()
  function setMap(elem: HTMLDivElement) {
    if (map.value == null) {
      map.value = leaflet
        .map(elem, { zoomControl: false })
        .setView([55.751574, 37.573856], 15)

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            // 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            '',
        })
        .addTo(map.value)

      markerQueue.process(map.value)
    }
  }

  function flyTo(location: [number, number]) {
    document.querySelector('#show-button')?.dispatchEvent(new MouseEvent('click'))

    try {
      map.value?.flyTo(location, 15)
    } catch (error) {
      console.error(error)
    }
  }

  function addMarker(marker: Marker) {
    if (!map.value) {
      markerQueue.add(marker)
    } else marker.addTo(map.value)
  }
  function removeMarker(marker: Marker) {
    map.value?.removeLayer(marker)
  }

  return { map, setMap, flyTo, addMarker, removeMarker }
})
