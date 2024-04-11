<template>
  <svg
    :height="height"
    :viewBox="viewBox"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :transform="transform"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  height: String,
  transform: String,
  xOffset: { type: Number, default: () => 0 },
})

const viewBox = computed(() => `0 ${props.xOffset} 24 24`)
</script>
