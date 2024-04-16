<script setup lang="ts">
import MoscowMap from './components/MainMap.vue'
import MapToolbar from './components/MapToolbar.vue'
import SideToolbar from './components/SideToolbar.vue'
</script>

<template>
  <div>
    <MoscowMap />
    <MapToolbar />
    <SideToolbar />
  </div>
</template>

<style lang="scss">
:root {
  --main-color: #396ca3;
  --main-monochrome: lighten(var(--main-color), 5%);
  --main-darken: #2061b5;
  --sub-color: #a3396c;
  --accent-color: #6ca339;
}
</style>
