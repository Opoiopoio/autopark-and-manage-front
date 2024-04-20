<template>
  <div class="cards-container">
    <div class="cards-container__item" v-for="(item, index) of items" :key="index">
      <slot name="item" :item="item" class="cards-container__item"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'SideToolbarCardsContainer',
})
</script>

<script setup lang="ts">
import { PropType, defineComponent } from 'vue'
import { IEmployee, IIcon, IObject, ITectical } from '../../model'

defineProps({
  items: Array as PropType<Partial<IObject & ITectical & IEmployee & IIcon & object>[]>,
})
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

.cards-container__item > div {
  border-radius: var(--brd-radius);
  background-color: rgba(255, 255, 255, 0.4);

  box-shadow: 0px 2px 10px gray;
}

.cards-container::-webkit-scrollbar {
  width: 0;
}
</style>
