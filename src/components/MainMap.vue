<template>
  <div id="map" ref="mapRef"></div>
</template>

<script setup lang="ts">
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from '../assets/vue.svg'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const mapRef = ref<HTMLDivElement>()

const iconMarker = leaflet.icon({
  iconUrl: icon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
})

onMounted(() => {
  if (!mapRef.value) return
  store.commit('setMap', mapRef.value)

  const marker = leaflet
    .marker([55.751574, 37.573856], { icon: iconMarker })
    .bindTooltip('<div>Ваш текст подсказки</div>')

  store.commit('addObjects', { marker })

  store.dispatch('addObjectToMap', store.getters.objects.marker)
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
