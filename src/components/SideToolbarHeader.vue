<template>
  <div class="toolbar-header">
    <button class="toolbar-header__items" v-for="(item, index) of items" :key="index">
      {{ item.tittle }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { IToolbarHeaderItem } from '../model/lib/component.types'

defineProps({
  items: Array as PropType<IToolbarHeaderItem[]>,
})
</script>

<style>
.toolbar-header {
  margin-top: 20px;

  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-items: center;

  gap: 12.5px;
  padding: 12.5px 0;

  justify-content: center;
}

.toolbar-header__items {
  flex-grow: 1;
}

.toolbar-header__items:hover {
  background-color: var(--main-monochrome);
}
</style>
