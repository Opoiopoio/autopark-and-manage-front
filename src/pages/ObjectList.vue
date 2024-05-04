<template>
  <CardsContainer :items="items">
    <template #item="{ item }">
      <CardObject
        :complete_status="item.complete_status"
        :edited_date="item.edited_date"
        :icon="item.icon"
        :location="item.location"
        :manager="item.manager"
        :technical="item.technical"
        :name="item.name"
      />
    </template>
  </CardsContainer>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { CardsContainer } from '@/components/side-toolbar'
import { CardObject } from '@/components/card-object'
import { useObjectStore } from '@/store'

const store = useObjectStore()

const items = computed(() => Object.values(store.items))

onMounted(async () => {
  await store.get()
})
</script>
