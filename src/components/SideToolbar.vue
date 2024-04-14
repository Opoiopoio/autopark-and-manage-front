<template>
  <div
    class="side-toolbar"
    :class="{
      'side-toolbar_opened': isOpened,
      'side-toolbar_opening': isOpening,
      'side-toolbar_closing': isClosing,
    }"
    @animationend="onToolbarAnimationEnd"
    @keyup.esc="onShowButtonClick"
  >
    <div class="relative h-100 w-100">
      <div
        class="content-box"
        @animationend="onContentAnimationEnd"
        :class="{
          'content-box_showed': contentIsShowed,
          'content-box_showing-up': contentIsShowingUp,
          'content-box_hiding': contentIsHiding,
        }"
      >
        <SideToolbarHeader :items="headerItems" />
        <div class="content-box__body">
          <CardsContainer :items="objects" template="item">
            <template #item="{ item }">
              <CardObject
                :complete_status="item.complete_status"
                :edited_date="item.edited_date"
                :image="item.icon"
                :location="item.location"
                :manager="item.manager"
                :technical="item.technical"
                :name="item.name"
              />
            </template>
          </CardsContainer>
        </div>
      </div>

      <div class="absolute h-100vh">
        <div class="relative h-100">
          <div class="show-button-container">
            <div class="show-button" @click="onShowButtonClick">
              <div
                @animationend="onArrowAnimationEnd"
                class="arrow"
                :class="{
                  arrow_rotated: arrowIsRotated,
                  arrow_rotating: arrowIsRotating,
                  'arrow_reverse-rotating': arrowIsReverseRotating,
                }"
              >
                <CallabseArrow transform="rotate(90)" :x-offset="-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import { useStore } from 'vuex'

import CallabseArrow from './CollabseArrow.vue'
import SideToolbarHeader from './SideToolbarHeader.vue'
import CardsContainer from './CardsContainer.vue'
import CardObject from './card-object/CardObject.vue'

import { IObject, IToolbarHeaderItem } from '../model'
// import { ITectical } from '../model'

const store = useStore()

const headerItems: Ref<IToolbarHeaderItem[]> = ref([
  { tittle: 'Объекты' },
  { tittle: 'Иконки' },
  { tittle: 'Работники' },
  { tittle: 'Техника' },
  { tittle: 'Оборудование' },
])

store.dispatch('technical/get')
store.dispatch('object/get')

// const technical = computed(() => {
//   const technic = store.getters['technical/technical']
//   return Object.values<ITectical>(technic)
// })

const objects = computed(() => {
  const technic = store.getters['object/objects']
  return Object.values<IObject>(technic)
})

const isOpened = ref(false)
const isClosing = ref(false)
const isOpening = ref(false)

const contentIsShowed = ref(false)
const contentIsShowingUp = ref(false)
const contentIsHiding = ref(false)

const arrowIsRotated = ref(false)
const arrowIsRotating = ref(false)
const arrowIsReverseRotating = ref(false)

function onShowButtonClick() {
  if (isOpened.value) {
    contentIsHiding.value = true
    isClosing.value = true
  } else {
    isOpening.value = true
  }
}

function onToolbarAnimationEnd(e: AnimationEvent) {
  if (e.animationName != 'increase-width') return
  else if (isOpening.value) {
    isOpened.value = true
    isOpening.value = false
    arrowIsRotating.value = true
    contentIsShowingUp.value = true
  } else {
    isOpened.value = false
    isClosing.value = false

    arrowIsReverseRotating.value = true
  }
}

function onContentAnimationEnd(e: AnimationEvent) {
  if (e.animationName != 'show-content') return
  else if (contentIsShowingUp.value) {
    contentIsShowed.value = true
    contentIsShowingUp.value = false
  } else if (contentIsHiding.value) {
    contentIsShowed.value = false
    contentIsHiding.value = false
  }
}

function onArrowAnimationEnd(e: AnimationEvent) {
  if (e.animationName != 'rotating') return
  else if (arrowIsRotating.value) {
    arrowIsRotated.value = true
    arrowIsRotating.value = false
  } else if (arrowIsReverseRotating.value) {
    arrowIsReverseRotating.value = false
    arrowIsRotated.value = false
  }
}
</script>

<style>
.side-toolbar {
  position: fixed;

  right: 0px;
  top: 0px;

  width: 0px;
  height: 100%;

  z-index: 450;

  backdrop-filter: blur(20px);
  /* opacity: 0.9; */

  --an-duration: 1s;
  --an-fill-mode: forwards;
  --full-width: 90vw;
}

.side-toolbar_closing {
  animation: increase-width;
  animation-direction: reverse;
  animation-duration: var(--an-duration);
  animation-fill-mode: var(--an-fill-mode);
}

.side-toolbar_opening {
  animation: increase-width;
  animation-duration: var(--an-duration);
  animation-fill-mode: var(--an-fill-mode);
}

.side-toolbar_opened {
  width: var(--full-width);
}

.content-box {
  position: absolute;
  height: calc(100% - 60px);
  width: calc(100% - 60px);
  display: none;

  padding: 30px;

  --an-duration: 0.3s;
  --an-fill-mode: forwards;
}

.content-box_showing-up {
  animation: show-content;
  animation-duration: var(--an-duration);
  animation-fill-mode: var(--an-fill-mode);
  display: block;
}

.content-box_showed {
  opacity: 1;
  display: block;
}

.content-box_hiding {
  animation: show-content;
  animation-duration: var(--an-duration);
  animation-fill-mode: var(--an-fill-mode);
  animation-direction: reverse;
}

.content-box__body {
  height: calc(100% - 55px);
  margin: 0;
  display: flex;
  flex-direction: column;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.h-100 {
  height: 100%;
}

.w-100 {
  width: 100%;
}

.h-100vh {
  height: 100vh;
}

.show-button-container {
  position: absolute;
  top: 50%;

  transform: translateY(-50%);
}

.show-button {
  position: absolute;
  top: -22.5px;
  right: -22.5px;

  height: 45px;
  width: 45px;

  /* background: linear-gradient(to right, #000 50%, #fff 0.5px, var(--bg-color) 50%); */
  background-color: var(--main-color);

  border: solid #fff 0.5px;
  border-radius: 100px;

  /* z-index: 300; */
}

.show-button:hover {
  background-color: var(--main-monochrome);
}

.arrow {
  transform-origin: center;
  height: 100%;
  width: 100%;

  --an-duration: 0.2s;
  --an-fill-mode: forwards;
}

.arrow_rotating {
  animation: rotating;
  animation-duration: var(--an-duration);
  animation-fill-mode: var(--an-fill-mode);
}

.arrow_rotated {
  transform: rotate(180deg);
}

.arrow_reverse-rotating {
  animation: rotating;
  animation-direction: reverse;
  animation-duration: var(--an-duration);
  animation-fill-mode: var(--an-fill-mode);
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

@keyframes increase-width {
  from {
    width: 0px;
  }

  to {
    width: var(--full-width);
  }
}

@keyframes show-content {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
