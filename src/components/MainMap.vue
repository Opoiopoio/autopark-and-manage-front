<template>
  <div id="map" ref="mapRef"></div>
</template>

<script setup lang="ts">
// import leaflet from 'leaflet'
import { useMapStore } from '@/store'
import 'leaflet/dist/leaflet.css'

import { onMounted, ref } from 'vue'

const store = useMapStore()

const mapRef = ref<HTMLDivElement>()

onMounted(() => {
  try {
    if (!mapRef.value) return
    store.setMap(mapRef.value)
  } catch (error) {
    console.error(error)
  }
  // const image = new MarkerIcon() as string

  // const iconMarker = leaflet.icon({
  //   iconUrl: image,
  //   iconSize: [32, 32],
  //   iconAnchor: [16, 32],
  // })

  // const marker = leaflet
  //   .marker([55.751574, 37.573856], { icon: iconMarker, draggable: true })
  //   .bindTooltip('<div>Ваш текст подсказки</div>')

  // store.dispatch('object/addToMap', marker)

  // store.dispatch('addObjectToMap', store.getters.objects.marker)
  //   .addTo(map)

  document.querySelector('[href="https://leafletjs.com"]')?.remove()
})
</script>

<style>
#map {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
