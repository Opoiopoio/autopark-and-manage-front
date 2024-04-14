<template>
  <div class="cards-container">
    <div class="cards-container__item" v-for="(item, index) of items" :key="index">
      <slot name="item" :item="item" class="cards-container__item"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { IObject, ITectical } from '../model'

const props = defineProps({
  items: Array as PropType<Partial<IObject & ITectical>[]>,
})

console.log(props.items)
</script>

<style>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 15px;
  overflow: auto;

  justify-content: center;

  scrollbar-width: none;

  padding: 20px;
}

.cards-container::-webkit-scrollbar {
  width: 0;
}

@media screen {
}
</style>
