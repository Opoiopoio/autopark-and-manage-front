<template>
  <CardsContainer :items="items">
    <template #item="{ item }">
      <CardTechnic
        :driver="item.driver"
        :icon="item.icon"
        :location="item.location"
        :mark="item.mark"
        :number="item.number"
      />
    </template>
  </CardsContainer>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { CardsContainer } from '@/components/side-toolbar'
import CardTechnic from '@/components/CardTechnic.vue'
import { useTchicalStore } from '@/store'

const store = useTchicalStore()

const items = computed(() => Object.values(store.items))

onMounted(async () => {
  await store.get()
})
</script>
