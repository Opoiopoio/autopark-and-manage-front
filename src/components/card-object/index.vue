<template>
  <div class="card-object">
    <div class="card-object__image-container" @click="onImageClick">
      <img :src="image" :alt="name" />
      <h4>{{ name }}</h4>
    </div>
    <h4 class="card-object__manager">Руководитель: {{ manager }}</h4>
    <CardObjectTechnical :items="technical" />
    <div class="card-object__complete-status">
      <p
        class="card-object__complete-status__note"
        :style="{ color: completeStatusFontColor }"
      >
        {{ complete_status }}%
      </p>
      <div
        class="card-object__complete-status__fill"
        :style="completeStatusNoteStyle"
      ></div>
    </div>
    <p class="card-object__edited_date">
      Дата изменения: {{ edited_date?.toLocaleString() }}
    </p>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CardObject',
})
</script>

<script setup lang="ts">
import { computed, PropType, defineComponent } from 'vue'
import { ITectical } from '../../model'
import { processTaskColors } from '../../utils'
import CardObjectTechnical from './Technical.vue'
import { useMapStore } from '@/store'

const store = useMapStore()

const props = defineProps({
  name: String,
  image: String,
  manager: String,
  technical: Array as PropType<ITectical[]>,
  location: Object as PropType<[number, number]>,
  complete_status: { type: Number, default: () => 0 },
  edited_date: Date,
})

function onImageClick() {
  if (!props.location) return

  store.flyTo(props.location)
}

const completeStatusFontColor = computed(() => {
  if (props.complete_status >= 53) return 'white'
  return undefined
})

const completeStatusNoteStyle = computed(() => {
  return {
    backgroundColor: processTaskColors.get(props.complete_status),
    width: `${props.complete_status}%`,
  }
})
</script>

<style>
.card-object {
  --brd-radius: 7px;
  border-radius: var(--brd-radius);

  width: calc(100% - 40px);
  height: calc(100% - 40px);

  background-color: rgba(255, 255, 255, 0.4);

  box-shadow: 0px 2px 10px gray;

  padding: 20px;
  --items-margin: 0 20px;
}

.card-object__image-container {
  position: relative;

  cursor: pointer;

  width: 100%;
  height: 50%;
}

.card-object__image-container > img {
  /* margin: var(--items-margin); */
  border-radius: var(--brd-radius);
  width: 100%;
  height: auto;
}

.card-object__image-container > h4 {
  position: absolute;

  color: var(--ft-light-color);

  bottom: 20px;
  margin: var(--items-margin);
}

.card-object__manager {
  margin: var(--items-margin);
  margin-top: 10px;
}

.card-object__complete-status {
  position: relative;
  height: 30px;
  max-width: 100%;

  border-radius: var(--brd-radius);
  border: solid 1px #fff;

  margin: var(--items-margin);

  --brd-radius: 5px;
}

.card-object__complete-status__note {
  position: absolute;
  top: 50%;
  left: 50%;

  margin: 0;

  transform: translate(-50%, -50%);
}

.card-object__complete-status__fill {
  border-radius: var(--brd-radius);
  height: 100%;
}

.card-object__edited_date {
  margin: var(--items-margin);
  /* padding-top: 20px; */
}
</style>
