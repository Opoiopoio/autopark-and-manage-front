<template>
  <div class="toolbar">
    <MapToolbarTree name="Объекты" :items="objects" />
    <MapToolbarTree name="Техника" :items="techich" />
    <input type="text" placeholder="Адрес" />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MapToolbar',
})
</script>

<script setup lang="ts">
import { reactive, defineComponent } from 'vue'
import MapToolbarTree from './Tree.vue'

const objects = reactive(['gz-gon'])
const techich = reactive(['maz', 'kamaz', 'qewr', 'qwer', 'qwer'])
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

  background-color: var(--main-color);

  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-items: center;

  gap: 12.5px;
  padding: 12.5px;
}
</style>
