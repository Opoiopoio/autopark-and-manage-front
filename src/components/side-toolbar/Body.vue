<template>
  <div class="body-manager">
    <SideToolbarCardsContainer v-if="object" :items="resourceItems.object.value">
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
    </SideToolbarCardsContainer>
    <SideToolbarCardsContainer v-if="tecnical" :items="resourceItems.tecnical.value">
      <template #item="{ item }">
        <CardTechnic
          :driver="item.driver"
          :icon="item.icon"
          :location="item.location"
          :mark="item.mark"
          :number="item.number"
        />
      </template>
    </SideToolbarCardsContainer>
    <SideToolbarCardsContainer v-if="icon" :items="resourceItems.icon.value">
      <template #item="{ item }">
        <CardIcon :name="item.name" :url="item.url" />
      </template>
    </SideToolbarCardsContainer>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'SideToolbarBody',
})
</script>

<script setup lang="ts">
import { computed, defineComponent, watch } from 'vue'
import SideToolbarCardsContainer from './CardsContainer.vue'
import { CardObject } from '../card-object'
import CardTechnic from '../CardTechnic.vue'
import CardIcon from '../CardIcon.vue'
import {
  ComputedResourceItems,
  IResurceStatuses,
  Resources,
  UpdateResourceValue,
} from '@/model'

const props = defineProps<IResurceStatuses>()

const emit = defineEmits<{
  'update:resource': [value: UpdateResourceValue]
}>()

let oldValue: Resources | undefined

const activeResource = computed<Resources>((getter) => {
  const trueValues: boolean[] = Object.values(props).filter((value) => value == true)
  const keys = Object.keys(props) as Resources[]

  oldValue = getter

  if (trueValues.length == 1) return keys.find((key) => props[key]) as Resources
  else return keys.find((key) => key != getter && props[key]) as Resources
})

const resourceItems = new ComputedResourceItems()

watch(
  () => activeResource,
  () => {
    if (Object.values(props).filter((value) => value == true).length == 1) return
    else if (oldValue) emit('update:resource', { resource: oldValue, value: false })
  },
  { deep: true }
)
</script>

<style>
.body-manager {
  height: 100%;
}
</style>
