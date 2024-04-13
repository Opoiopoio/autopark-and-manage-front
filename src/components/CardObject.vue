<template>
  <div class="card-object">
    <div class="card-object__image-container">
      <img :src="image" :alt="name" />
      <h4>{{ name }}</h4>
    </div>
    <div class="tectical-container"></div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import icon from '../assets/vue.svg'
import { ITectical } from '../model'
defineProps({
  name: String,
  image: { type: String, default: () => icon },
  manager: String,
  technical: Array as PropType<ITectical[]>,
  location: Object as PropType<[number, number]>,
})
</script>

<style>
.card-object {
  --brd-radius: 20px;
  border: solid 1px #fff;
  border-radius: var(--brd-radius);

  width: 100%;
  height: 100%;
}

.card-object__image-container {
  position: relative;
  width: calc(100% - 40px);
  height: 60%;
  border-radius: var(--brd-radius);
  padding: 20px;
}

.card-object__image-container > img {
  position: relative;
  width: 100%;
  height: 100%;
}

.card-object__image-container > h4 {
  position: relative;

  bottom: 20px;
  left: 20px;
}
</style>
