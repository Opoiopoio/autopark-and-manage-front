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
        <SideToolbarHeader :menu-items="headerMenuItems" :items="headerItems" />
        <div class="content-box__body">
          <SideToolbarCardsContainer :items="activeResource" template="item">
            <template #[resourceTemplates.object]="{ item }">
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
            <template #[resourceTemplates.tecnical]="{ item }">
              <CardTechnic
                :driver="item.driver"
                :icon="item.icon"
                :location="item.location"
                :mark="item.mark"
                :number="item.number"
              />
            </template>
            <template #[resourceTemplates.icon]="{ item }">
              <CardIcon :name="item.name" :url="item.url" />
            </template>
          </SideToolbarCardsContainer>
        </div>
      </div>

      <div class="absolute h-100vh">
        <div class="relative h-100">
          <div class="show-button-container">
            <div
              class="show-button"
              id="show-button"
              tabindex="1"
              @click="onShowButtonClick"
            >
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

<script lang="ts">
export default defineComponent({
  name: 'SideToolbar',
})
</script>

<script setup lang="ts">
import { computed, defineComponent, reactive, Ref, ref, watch } from 'vue'

import CallabseArrow from '../CollabseArrow.vue'
import SideToolbarHeader from './Header.vue'
import SideToolbarCardsContainer from './CardsContainer.vue'
import { CardObject } from '../card-object'
import CardTechnic from '../CardTechnic.vue'
import CardIcon from '../CardIcon.vue'
import {
  ComputedResourceItems,
  IToolbarHeaderItem,
  Resources,
  ResourceStatuses,
  ResourceTemplates,
  TemplateNames,
  ToolbarHeaderItem,
} from '@/model'

// const store = useStore()

const resourceStatuses = reactive<Record<Resources, boolean>>(new ResourceStatuses())

const resourceTemplates = computed<Record<Resources, TemplateNames>>(() => {
  const result = new ResourceTemplates(resourceStatuses)
  return result
})

let oldValue: Resources | undefined

const activeField = computed<Resources>((getter) => {
  const trueValues = Object.values(resourceStatuses).filter((value) => value == true)
  const keys = Object.keys(resourceStatuses) as Resources[]

  oldValue = getter

  if (trueValues.length == 1)
    return keys.find((key) => resourceStatuses[key]) as Resources
  else return keys.find((key) => key != getter && resourceStatuses[key]) as Resources
})

const resourceItems = new ComputedResourceItems()

const activeResource = computed(() => resourceItems[activeField.value].value)

watch(
  () => activeField,
  () => {
    if (Object.values(resourceStatuses).filter((value) => value == true).length == 1)
      return
    else if (oldValue) resourceStatuses[oldValue] = false
  },
  { deep: true }
)

const headerItems = ['Огранизация']

const headerMenuItems: Ref<IToolbarHeaderItem[]> = ref([
  new ToolbarHeaderItem('Объекты', resourceStatuses, 'object'),
  new ToolbarHeaderItem('Иконки', resourceStatuses, 'icon'),
  new ToolbarHeaderItem('Работники', resourceStatuses, 'employee'),
  new ToolbarHeaderItem('Техника', resourceStatuses, 'tecnical'),
  new ToolbarHeaderItem('Оборудование', resourceStatuses, 'equipment'),
])

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
  if (e.animationName != 'fade') return
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

  color: var(--ft-dark-color);

  padding: 30px;

  --an-duration: 0.3s;
  --an-fill-mode: forwards;
}

.content-box_showing-up {
  animation: fade;
  animation-duration: var(--an-duration);
  animation-fill-mode: var(--an-fill-mode);
  display: block;
}

.content-box_showed {
  opacity: 1;
  display: block;
}

.content-box_hiding {
  animation: fade;
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

  -webkit-transition: var(--transition-to-btns);
  -moz-transition: var(--transition-to-btns);
  -ms-transition: var(--transition-to-btns);
  -o-transition: var(--transition-to-btns);
  transition: var(--transition-to-btns);

  /* z-index: 300; */
}

.show-button:hover {
  background-color: var(--main-color-lighten);
  cursor: pointer;
}

.show-button:active {
  background-color: var(--main-color-darken);
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
  from {
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
, Resources, TemplateNames, Resources, TemplateNames
