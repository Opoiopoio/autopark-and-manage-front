<template>
  <div id="map" ref="mapRef"></div>
</template>

<script setup lang="ts">
// import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// import { MarkerIcon } from '../utils'

const store = useStore()

const mapRef = ref<HTMLDivElement>()

onMounted(() => {
  if (!mapRef.value) return
  store.commit('setMap', mapRef.value)

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
