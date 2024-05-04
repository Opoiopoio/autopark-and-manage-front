<template>
  <CardsContainer :items="items">
    <template #item="{ item }">
      <CardIcon :name="item.name" :url="item.url" />
    </template>
  </CardsContainer>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { CardsContainer } from '@/components/side-toolbar'
import CardIcon from '@/components/CardIcon.vue'
import { useIconStore } from '@/store'

const store = useIconStore()

const items = computed(() => Object.values(store.items))

console.log()

onMounted(async () => {
  await store.get()
})
</script>
