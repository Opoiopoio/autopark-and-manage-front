<template>
  <div ref="sideToolbarRef" class="side-toolbar" @animationend="animationEnd">
    <div class="show-button-container">
      <div class="show-button" @click="onShowButtonClick">
        <div ref="arrowRef" class="arrow">
          <CallabseArrow transform="rotate(90)" :x-offset="-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CallabseArrow from './CollabseArrow.vue'

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
  bottom: 0px;

  height: 100%;
  width: 0;

  z-index: 450;

  background-color: var(--bg-color);

  opacity: 0.9;
}

.side-toolbar.opening {
  animation: increase-width;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
}

.side-toolbar.save-opening {
  width: 80vw;
}

.side-toolbar.closing {
  animation: increase-width;
  animation-duration: 1.5s;
  animation-direction: reverse;
  animation-fill-mode: forwards;
}

.show-button-container {
  position: relative;

  height: 100%;
  width: 0px;
}

.show-button {
  position: absolute;

  top: 50%;
  right: -32px;
  transform: translateY(-50%);

  height: 64px;
  width: 64px;

  background-color: var(--bg-color);

  border: solid #fff 0.5px;
  border-radius: 100px;

  z-index: 300;
}

.arrow {
  transform-origin: center;
  height: 64px;
  width: 64px;
}

.arrow.rotating {
  animation: rotating;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

.arrow.save-rotate {
  transform: rotate(180deg);
}

.arrow.reverse-rotating {
  animation: rotating;
  animation-duration: 0.3s;
  animation-direction: reverse;
  animation-fill-mode: forwards;
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
    width: 80vw;
  }
}
</style>
