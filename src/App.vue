<script setup lang="ts">
import MainMap from './components/MainMap.vue'
import { MapToolbar } from './components/map-toolbar'
import { SideToolbar } from './components/side-toolbar'
</script>

<template>
  <div>
    <MainMap />
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
