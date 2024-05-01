<template>
  <div class="technical">
    <h4
      class="technical__header"
      :style="{ cursor: cursorOnHeader }"
      @click="onHeaderClick"
    >
      Техника: {{ techicalMarks ?? 'отсутствует' }}
    </h4>

    <div class="technical__items-container">
      <div
        class="technical__items"
        :class="{
          technical__items_showed: itemsIsShowed,
          technical__items_hiding: itemsIsHiding,
          'technical__items_showind-up': itemsIsShowing,
        }"
        @animationend="onShowAnimationEnd"
      >
        <div
          class="technical__item"
          @click="onTechnicalItemClick(technic)"
          v-for="(technic, index) in items"
          :key="index"
        >
          <p class="technical__item__mark">{{ technic.mark }}</p>
          <p class="technical__item__driver">{{ technic.driver }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CardObjectTecnical',
})
</script>

<script setup lang="ts">
import { computed, PropType, ref, defineComponent } from 'vue'
import { ITectical } from '../../model'
import { useMapStore } from '@/store'

const props = defineProps({
  items: Array as PropType<ITectical[]>,
})

const store = useMapStore()

const isShowed = computed(() => {
  return props.items?.length != 0
})

const itemsIsShowed = ref(false)
const itemsIsHiding = ref(false)
const itemsIsShowing = ref(false)

const cursorOnHeader = computed(() => (isShowed.value ? 'pointer' : 'auto'))

const techicalMarks = computed(() => {
  if (!isShowed.value) return 'отсутствует'
  return props.items?.map((item) => item.mark).join(', ')
})

function onShowAnimationEnd() {
  if (itemsIsHiding.value) {
    itemsIsShowed.value = false
    itemsIsHiding.value = false
  } else if (itemsIsShowing.value) {
    itemsIsShowed.value = true
    itemsIsShowing.value = false
  }
}

function onTechnicalItemClick(item: ITectical) {
  onHeaderClick()
  store.flyTo(item.location)
}

function onHeaderClick() {
  if (!isShowed.value) return
  else if (itemsIsShowed.value) {
    itemsIsHiding.value = true
  } else {
    itemsIsShowing.value = true
  }
}
</script>

<style>
.technical {
  margin: var(--items-margin);
  height: 21px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.technical__items-container {
  position: relative;
  display: inline-block;
  width: 100%;
  color: #fff;
}

.technical__header {
  max-width: 100%;
  margin: 0;

  overflow: hidden;
  text-overflow: ellipsis;

  white-space: nowrap;
}

.technical__items {
  display: none;

  position: absolute;
  /* top: 32px; */
  left: -1.5px;

  background-color: var(--main-color);
  min-width: 100%;
  overflow: auto;
  max-height: 200px;
  z-index: 400;

  border-radius: 0 0 0.5rem 0.5rem;

  -ms-overflow-style: none;

  scrollbar-width: none;

  border-radius: 5px;

  --an-duration: 0.3s;
  --an-fill-mode: forwards;
}

.technical__items_showind-up {
  display: block;
  animation: fade;
  animation-duration: var(--an-duration);
  animation-fill-mode: var(--an-fill-mode);
}

.technical__items_hiding {
  animation: fade;
  animation-duration: var(--an-duration);
  animation-fill-mode: var(--an-fill-mode);
  animation-direction: reverse;
}

.technical__items_showed {
  display: block;
  opacity: 1;
}

.technical__item {
  cursor: pointer;
  padding: 5px 10px;

  -webkit-transition: var(--transition-to-btns);
  -moz-transition: var(--transition-to-btns);
  -ms-transition: var(--transition-to-btns);
  -o-transition: var(--transition-to-btns);
  transition: var(--transition-to-btns);
}

.technical__item:hover {
  background-color: var(--main-color-lighten);
}

.technical__item:active {
  background-color: var(--main-color-darken);
}

.technical__item__mark,
.technical__item__driver {
  margin: 5px 0;
}
</style>
