<template>
  <div class="card-object">
    <div class="card-object__image-container" @click="onImageClick">
      <div class="card-object__image-aligner">
        <img class="card-object__image" :src="icon" :alt="name" />
      </div>
    </div>
    <h4 class="card-object__name">Название: {{ name }}</h4>
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
import { computed, defineComponent } from 'vue'
import { IObject } from '@/model'
import { processTaskColors } from '@/utils'
import CardObjectTechnical from './Technical.vue'
import { useMapStore } from '@/store'

const store = useMapStore()

const props = withDefaults(defineProps<Partial<IObject>>(), { complete_status: () => 0 })

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

  width: calc(100% - 40px);

  min-height: calc(100% - 40px);
  max-height: 100%;

  padding: 20px;
  --items-margin: 0 20px;
}

.card-object_popup {
  padding: 0;
  width: 300px;
  height: 100%;
}

.card-object_popup > .card-object__name,
.card-object_popup > .card-object__manager,
.card-object_popup > .card-object__edited_date {
  margin: 10px 0;
}

.card-object__image-container {
  cursor: pointer;

  width: 100%;
  height: 50%;
  --min-height: 174px;
  min-height: var(--min-height);
}

.card-object__image-aligner {
  display: flex;
  align-items: center;
  height: 100%;
  min-height: var(--min-height);
  width: 100%;
}

.card-object__image {
  /* object-fit: none; */
  /* position: absolute;
  top: 50%;
  transform: translateY(-50%); */
  /* margin: var(--items-margin); */
  border-radius: var(--brd-radius);
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.card-object__name {
  margin: var(--items-margin);
  margin-top: 10px;
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
