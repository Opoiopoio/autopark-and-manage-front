<template>
  <div
    class="toolbar-tree"
    ref="toolbarTreeRef"
    @click="onClick"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <h5>{{ tittle }}</h5>
    <div class="toolbar-tree__collabse-arrow" ref="collabseArrowRef">
      <CollabseArrow />
    </div>
    <div ref="toolbarTreeItemsRef" class="toolbar-tree__items">
      <div class="toolbar-tree__item">Элемент 1</div>
      <div class="toolbar-tree__item">Элемент 2</div>
      <div class="toolbar-tree__item">Элемент 3</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CollabseArrow from './CollabseArrow.vue'
defineProps({ tittle: String })

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
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
}

.toolbar-tree__items {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100%;
  overflow: auto;
  max-height: 200px;
  z-index: 1;
}

.toolbar-tree__item {
  padding: 10px;
  cursor: pointer;
}

.toolbar-tree__items.opened {
  display: block;
}

/* .reverse-rotated {
  animation: rotate 0.3s ease;
  animation-direction: reverse;
}

.rotated {
  animation: rotate 0.3s ease;
  animation-fill-mode: forwards;
} */

.toolbar-tree__collabse-arrow {
  display: flex;
  flex-direction: row;
  align-items: center;
}

/* @keyframes rotate {
  to {
    transform: rotate(90deg);
  }
}

@keyframes rotate-reverse {
  to {
    transform: rotate(-90deg);
  }
} */
</style>
