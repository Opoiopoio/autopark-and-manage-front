<template>
  <div class="toolbar-header">
    <div class="toolbar-header__items-container">
      <h3 class="toolbar-header__item" v-for="item of items">{{ item }}</h3>
    </div>

    <div class="toolbar-header__menu" @mouseleave="onMouseLeave" @mouseover="onMouseOver">
      <img tabindex="2" :src="menu" alt="menu" @click="onMenuClick" />
      <Transition name="fade">
        <div v-if="menuIsOpened" class="toolbar-header__menu__items">
          <div
            class="toolbar-header__menu__item"
            v-for="(item, index) of menuItems"
            :key="index"
            @click="item.onClick(item.resourceStatuses, item.watchedResource)"
          >
            {{ item.tittle }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { IToolbarHeaderItem } from '../model'
import menu from '../assets/menu.svg'

// :class="{
//           'toolbar-header__menu__items_opened': menuIsOpened,
//           'toolbar-header__menu__items_openinig': menuIsOpening,
//           'toolbar-header__menu__items_closing': menuIsClosing,
//         }"

defineProps({
  items: Array as PropType<string[]>,
  menuItems: Array as PropType<IToolbarHeaderItem[]>,
})

const menuIsOpened = ref(false)

function onMenuClick() {
  menuIsOpened.value = !menuIsOpened.value
}

function onMouseOver() {
  menuIsOpened.value = true
}

function onMouseLeave() {
  menuIsOpened.value = false
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.toolbar-header {
  margin-top: 20px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  gap: 12.5px;
  padding: 12.5px 0;

  color: var(--ft-dark-color);

  justify-content: space-between;

  /* color: var(--ft-light-color); */
}

.toolbar-header__items-container {
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}

.toolbar-header__item {
  margin: 0;
}

.toolbar-header__menu {
  height: 32px;
  display: inline-block;
  position: relative;
}

.toolbar-header__menu > img {
  height: 100%;
  cursor: pointer;
  color: var(--main-color);
}

.toolbar-header__menu__items {
  display: block;

  position: absolute;
  top: 100%;
  right: 0;

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

/* .toolbar-header__menu__items_opened {
  display: block;
} */

/* .toolbar-header__menu__items_openinig,
.toolbar-header__menu__items_closing {
  animation: fade;
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
} */

.toolbar-header__menu__items_closing {
  animation-direction: reverse;
}

.toolbar-header__menu__items::-webkit-scrollbar {
  width: 0;
}

.toolbar-header__menu__item {
  padding: 10px;
  cursor: pointer;
  width: 100%;
  color: #fff;
}

.toolbar-header__menu__item:hover {
  background-color: var(--main-monochrome);
}

.toolbar-header__menu__item:active {
  background-color: var(--main-darken);
}
</style>
