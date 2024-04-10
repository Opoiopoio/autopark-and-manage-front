<template>
  <div class="toolbar">
    <MapToolbarItem tittle="Объекты" />
    <MapToolbarItem tittle="Техника" />
  </div>
</template>

<script setup lang="ts">
import MapToolbarItem from './MapToolbarItem.vue'
</script>

<style>
.toolbar {
  border-radius: 0.5rem;
  border: solid #fff 0.5px;
  opacity: 0.9;

  z-index: 400;

  position: fixed;
  right: 20px;
  top: 20px;

  background-color: var(--bg-color);

  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-items: center;

  gap: 12.5px;
  padding: 12.5px;
}
</style>
