<template>
  <div class="toolbar">
    <MapToolbarTree
      v-for="item of items"
      :key="item.title"
      :title="item.title"
      :items="item.items"
    />
    <input class="toolbar_search" type="text" placeholder="Адрес" />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MapToolbar',
})
</script>

<script setup lang="ts">
import { defineComponent } from 'vue'
import MapToolbarTree from './Tree.vue'
import { MapToolbarProps } from '@/model'

withDefaults(defineProps<MapToolbarProps>(), {
  items: () => {
    if (import.meta.env.DEV) {
      return [
        { title: 'Объекты', items: [{ name: 'gz-gon' }] },
        {
          title: 'Техника',
          items: [
            { name: 'maz' },
            { name: 'kamaz' },
            { name: 'qewr' },
            { name: 'qewr' },
            { name: 'qewr' },
          ],
        },
      ]
    }
    return []
  },
})
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

.toolbar_search {
  border: 0;
  border-radius: 3px;
}
</style>
