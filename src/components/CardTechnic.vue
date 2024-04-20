<template>
  <div class="card-techic">
    <div class="card-techic__image-container" @click="onImageClick">
      <img :src="icon" :alt="techic" />
      <h4>{{ techic }}</h4>
    </div>
    <h4 class="card-techic__driver">Руководитель: {{ driverName }}</h4>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MapToolbar',
})
</script>

<script setup lang="ts">
import { useMapStore } from '@/store'
import { computed, defineComponent, PropType } from 'vue'

const props = defineProps({
  driver: String,
  icon: String,
  location: Object as PropType<[number, number]>,
  mark: String,
  number: String,
})

const store = useMapStore()

const techic = computed(() => `${props.mark ?? ''} ${props.number ?? ''}`)

const driverName = computed(() => props.driver ?? 'Не указан')

function onImageClick() {
  if (!props.location) return

  store.flyTo(props.location)
}
</script>

<style>
.card-techic {
  --brd-radius: 7px;

  width: calc(100% - 40px);
  height: calc(100% - 40px);

  padding: 20px;
  --items-margin: 0 20px;
}

.card-techic__image-container {
  position: relative;

  cursor: pointer;

  width: 100%;
  height: 70%;
}

.card-techic__image-container > img {
  /* margin: var(--items-margin); */
  border-radius: var(--brd-radius);
  width: 100%;
  height: auto;
  max-height: 100%;
}

.card-techic__image-container > h4 {
  position: absolute;

  color: var(--ft-light-color);

  bottom: 20px;
  margin: var(--items-margin);
}

.card-techic__driver {
  margin: var(--items-margin);
  margin-top: 10px;
}
</style>
