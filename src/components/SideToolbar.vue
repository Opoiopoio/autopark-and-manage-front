<template>
  <div ref="sideToolbarRef" class="side-toolbar" @animationend="animationEnd">
    <div class="relative h-100 w-100">
      <div class="absolute h-100vh w-100">
        <SideToolbarHeader />
        <div class="content-container__body">
          <CardObject />
        </div>
      </div>

      <div class="absolute h-100vh">
        <div class="relative h-100">
          <div class="show-button-container">
            <div class="show-button" @click="onShowButtonClick">
              <div ref="arrowRef" class="arrow">
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
import { ref } from 'vue'
import CallabseArrow from './CollabseArrow.vue'
import CardObject from './CardObject.vue'
import SideToolbarHeader from './SideToolbarHeader.vue'

const sideToolbarRef = ref<HTMLDivElement>()
const arrowRef = ref<HTMLDivElement>()

function onShowButtonClick() {
  if (sideToolbarRef.value?.classList.contains('save-opening')) {
    sideToolbarRef.value.classList.add('closing')
  } else {
    sideToolbarRef.value?.classList.add('opening')
  }
}

function animationEnd(e: AnimationEvent) {
  const isRotating = arrowRef.value?.classList.contains('rotating')
  const isReverseRotating = arrowRef.value?.classList.contains('reverse-rotating')
  if (e.target == arrowRef.value && isRotating) {
    onEndRorating()
  } else if (e.target == arrowRef.value && isReverseRotating) {
    onEndReverseRotating()
  } else if (sideToolbarRef.value?.classList.contains('opening')) {
    onEndOpening()
  } else {
    onEndClosing()
  }
}

function onEndOpening() {
  sideToolbarRef.value?.classList.add('save-opening')
  sideToolbarRef.value?.classList.remove('opening')
  arrowRef.value?.classList.add('rotating')
}

function onEndClosing() {
  sideToolbarRef.value?.classList.remove('save-opening')
  sideToolbarRef.value?.classList.remove('closing')
  arrowRef.value?.classList.add('reverse-rotating')
}

function onEndRorating() {
  arrowRef.value?.classList.add('save-rotate')
  arrowRef.value?.classList.remove('rotating')
}

function onEndReverseRotating() {
  arrowRef.value?.classList.remove('save-rotate')
  arrowRef.value?.classList.remove('reverse-rotating')
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

  background-color: var(--bg-color);

  /* opacity: 0.9; */

  --an-duration: 1s;
  --an-fill-mode: forwards;
  --full-width: 90vw;
}

.side-toolbar.closing {
  animation: increase-width;
  animation-direction: reverse;
  animation-duration: var(--an-duration);
  animation-fill-mode: var(--an-fill-mode);
}

.side-toolbar.opening {
  animation: increase-width;
  animation-duration: var(--an-duration);
  animation-fill-mode: var(--an-fill-mode);
}

.side-toolbar.save-opening {
  width: var(--full-width);
}

.content-container__header {
  margin-top: 20px;

  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-items: center;

  gap: 12.5px;
  padding: 12.5px;

  padding: 10px;
}

.content-container__body {
  position: relative;
  height: 100%;
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
  top: -32px;
  right: -32px;

  height: 64px;
  width: 64px;

  /* background: linear-gradient(to right, #000 50%, #fff 0.5px, var(--bg-color) 50%); */
  background-color: #000;

  border: solid #fff 0.5px;
  border-radius: 100px;

  /* z-index: 300; */
}

.arrow {
  transform-origin: center;
  height: 64px;
  width: 64px;

  --an-duration: 0.2s;
  --an-fill-mode: forwards;
}

.arrow.rotating {
  animation: rotating;
  animation-duration: var(--an-duration);
  animation-fill-mode: var(--an-fill-mode);
}

.arrow.save-rotate {
  transform: rotate(180deg);
}

.arrow.reverse-rotating {
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
</style>
