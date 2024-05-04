<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <div class="card-employee">
    <h4 class="card-employee__name">ФИО: {{ name }}</h4>
    <h4 class="card-employee__position">Должность: {{ position }}</h4>
    <h4 v-if="marker_color" class="card-employee__marker-color">
      <color-picker v-model:pureColor="markerColor" />
    </h4>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

import { IEmployee } from '@/model'

const props = defineProps<Partial<IEmployee>>()

const markerColor = computed(() => props.marker_color)
</script>

<style>
.card-employee {
  --brd-radius: 7px;

  width: calc(100% - 40px);
  height: calc(100% - 40px);

  padding: 20px;
  --items-margin: 0 20px;
}

.card-employee__marker-color {
  height: 100%;
}

.card-employee__marker-color:before {
  content: 'Цвет маркера: ';
}

.vc-colorpicker.white {
  background-color: #dedede !important;
}

.current-color {
  border-radius: 5px;
}

.card-employee__name {
  margin-top: 0;
}

.card-employee__marker-color {
  margin-bottom: 0;
}
</style>
