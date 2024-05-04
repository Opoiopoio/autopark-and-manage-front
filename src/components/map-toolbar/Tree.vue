<template>
  <div
    class="toolbar-tree"
    @click="onClick"
    @mouseenter="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <div class="toolbar-tree__title">
      <h5>{{ title }}</h5>
      <div
        class="toolbar-tree__collabse-arrow"
        :class="{
          'toolbar-tree__collabse-arrow_opened': itemsIsOpened,
          // 'toolbar-tree__collabse-arrow_opening': itemsIsOpening,
          // 'toolbar-tree__collabse-arrow_closing': itemsIsClosing,
        }"
      >
        <CollabseArrow height="20px" transform="rotate(90)" />
      </div>
    </div>
    <div
      class="toolbar-tree__items"
      :class="{
        'toolbar-tree__items_opened': itemsIsOpened,
      }"
    >
      <div
        v-for="(item, index) of items"
        :key="index"
        @click="item.onClick"
        class="toolbar-tree__item"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MapToolbarTree',
})
</script>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import CollabseArrow from '../CollabseArrow.vue'
import { MapToolbarTreeProps } from '@/model'
defineProps<MapToolbarTreeProps>()

const itemsIsOpened = ref(false)
// const itemsIsClosing = ref(false)
// const itemsIsOpening = ref(false)

function onMouseOver() {
  itemsIsOpened.value = true
}

function onMouseLeave() {
  itemsIsOpened.value = false
}

function onClick() {
  itemsIsOpened.value = !itemsIsOpened.value
}
</script>

<style>
.toolbar-tree h5 {
  margin: 0;
}

.toolbar-tree {
  position: relative;
  display: inline-block;
}

.toolbar-tree__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
}

.toolbar-tree__items {
  display: none;

  position: absolute;
  /* top: 32px; */
  left: -1.5px;

  background-color: var(--main-color);
  min-width: 100%;
  overflow: auto;
  max-height: 200px;
  z-index: 400;

  border-radius: 0.5rem;

  scrollbar-width: none;

  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}

.toolbar-tree__items::-webkit-scrollbar {
  width: 0;
}

.toolbar-tree__item {
  padding: 10px;
  cursor: pointer;

  -webkit-transition: var(--transform-collabse-arrow);
  -moz-transition: var(--transform-collabse-arrow);
  -ms-transition: var(--transform-collabse-arrow);
  -o-transition: var(--transform-collabse-arrow);
  transition: var(--transform-collabse-arrow);
}

.toolbar-tree__item:hover {
  background-color: var(--main-color-lighten);
}

.toolbar-tree__item:active {
  background-color: var(--main-color-darken);
}

.toolbar-tree__items_opened {
  display: block;
}

.toolbar-tree__collabse-arrow_opened {
  transform: rotate(-90deg);
}

.toolbar-tree__collabse-arrow {
  display: flex;
  flex-direction: row;
  align-items: center;

  --transform-collabse-arrow: 0.3s;

  -webkit-transition: var(--transform-collabse-arrow);
  -moz-transition: var(--transform-collabse-arrow);
  -ms-transition: var(--transform-collabse-arrow);
  -o-transition: var(--transform-collabse-arrow);
  transition: var(--transform-collabse-arrow);
}

@keyframes tree-rotate {
  to {
    transform: rotate(-90deg);
  }
}
</style>
