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
@import url('./variables.scss');
</style>
