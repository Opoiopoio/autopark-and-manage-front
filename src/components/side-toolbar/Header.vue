<template>
  <div class="toolbar-header">
    <div class="toolbar-header__items-container">
      <h3 class="toolbar-header__item" v-for="(item, index) of items" :key="index">
        {{ item }}
      </h3>
    </div>

    <div class="toolbar-header__buttons">
      <div class="toolbar-header__add">
        <svg
          class="toolbar-header__button"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="4" y1="12" x2="20" y2="12" />
        </svg>
      </div>

      <div
        class="toolbar-header__menu"
        @mouseleave="onMouseLeave"
        @mouseover="onMouseOver"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          @click="onMenuClick"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>

        <Transition name="fade">
          <div v-if="menuIsOpened" class="toolbar-header__menu__items">
            <div
              class="toolbar-header__menu__item"
              v-for="(item, index) of menuItems"
              :key="index"
              @click="item.onClick(item.resourceStatuses, item.watchedResource)"
            >
              {{ item.title }}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'SideToolbarHeader',
})
</script>

<script setup lang="ts">
import { PropType, ref, defineComponent } from 'vue'
import { IToolbarHeaderItem } from '@/model'

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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  gap: 12.5px;
  padding-bottom: 12.5px;

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

.toolbar-header__buttons {
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: end;
  color: var(--main-color-darken);
}

.toolbar-header__button {
  height: 100%;
  cursor: pointer;
}

.toolbar-header__add {
  height: 32px;
}

.toolbar-header__menu {
  height: 32px;
  display: inline-block;
  position: relative;
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

  -webkit-transition: var(--transition-to-btns);
  -moz-transition: var(--transition-to-btns);
  -ms-transition: var(--transition-to-btns);
  -o-transition: var(--transition-to-btns);
  transition: var(--transition-to-btns);
}

.toolbar-header__menu__item:hover {
  background-color: var(--main-color-lighten);
}

.toolbar-header__menu__item:active {
  background-color: var(--main-color-darken);
}
</style>
