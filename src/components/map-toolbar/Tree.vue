<template>
  <div
    class="toolbar-tree"
    ref="toolbarTreeRef"
    @click="onClick"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <div class="toolbar-tree__title">
      <h5>{{ name }}</h5>
      <div class="toolbar-tree__collabse-arrow" ref="collabseArrowRef">
        <CollabseArrow height="20px" transform="rotate(90)" />
      </div>
    </div>
    <div ref="toolbarTreeItemsRef" class="toolbar-tree__items">
      <div v-for="(item, index) of items" :key="index" class="toolbar-tree__item">
        {{ item }}
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
import { onMounted, PropType, ref, defineComponent } from 'vue'
import CollabseArrow from '../CollabseArrow.vue'
defineProps({
  name: { type: String, required: true },
  items: { type: Array as PropType<Array<string>>, required: true },
})

const collabseArrowRef = ref<HTMLDivElement>()
const toolbarTreeItemsRef = ref<HTMLDivElement>()

function onMouseOver() {
  collabseArrowRef.value?.classList.add('rotated')
  toolbarTreeItemsRef.value?.classList.add('opened')
}

function onMouseLeave() {
  toolbarTreeItemsRef.value?.classList.remove('opened')
  collabseArrowRef.value?.classList.add('reverse-rotated')
  collabseArrowRef.value?.classList.remove('rotated')
  setTimeout(() => collabseArrowRef.value?.classList.remove('reverse-rotated'), 300)
}

function onClick() {
  toolbarTreeItemsRef.value?.classList.add('opened')
}

onMounted(() => {})
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

  -webkit-transition: var(--transition-to-btns);
  -moz-transition: var(--transition-to-btns);
  -ms-transition: var(--transition-to-btns);
  -o-transition: var(--transition-to-btns);
  transition: var(--transition-to-btns);
}

.toolbar-tree__item:hover {
  background-color: var(--main-color-lighten);
}

.toolbar-tree__item:active {
  background-color: var(--main-color-darken);
}

.toolbar-tree__items.opened {
  display: block;
}

.reverse-rotated {
  animation: rotate 0.3s ease;
  animation-direction: reverse;
}

.rotated {
  animation: rotate 0.3s ease;
  animation-fill-mode: forwards;
}

.toolbar-tree__collabse-arrow {
  display: flex;
  flex-direction: row;
  align-items: center;
}

@keyframes rotate {
  to {
    transform: rotate(-90deg);
  }
}

@keyframes rotate-reverse {
  to {
    transform: rotate(90deg);
  }
}
</style>
