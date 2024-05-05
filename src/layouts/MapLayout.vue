<template>
  <main>
    <MainMap />
    <MapToolbar />
    <SideToolbar> <RouterView /> </SideToolbar>
  </main>
</template>

<script setup lang="ts">
import MainMap from '@/components/MainMap.vue'
import { SideToolbar } from '@/components/side-toolbar'
import { MapToolbar } from '@/components/map-toolbar'

console.log('MapLayout')
</script>
