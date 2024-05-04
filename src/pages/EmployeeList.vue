<template>
  <CardsContainer :items="items">
    <template #item="{ item }">
      <CardEmployee
        :id="item.id"
        :name="item.name"
        :position="item.position"
        :marker_color="item.marker_color"
      />
    </template>
  </CardsContainer>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { CardsContainer } from '@/components/side-toolbar'
import CardEmployee from '@/components/CardEmployee.vue'
import { useEmployeeStore } from '@/store'

const store = useEmployeeStore()

const items = computed(() => Object.values(store.items))

onMounted(async () => {
  await store.get()

  console.log('store', store)

  console.log(items.value)
})
</script>
