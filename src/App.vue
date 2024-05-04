<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const mainLayout = shallowRef(route.meta.layout)

console.log(route.meta)

watch(
  () => route.meta.layoutName,
  () => {
    console.log(route.meta)
    mainLayout.value = route.meta.layout
  }
)
</script>

<template>
  <component :is="mainLayout"> <slot /></component>
</template>

<style lang="scss">
@import url('./variables.scss');
</style>
