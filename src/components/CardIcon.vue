<template>
  <div class="card-icon">
    <!-- <div class="card-icon__flex"> -->
    <div class="card-icon__image-container">
      <img :src="url" :alt="name" />
      <h4>{{ name }}</h4>
    </div>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
defineProps({ name: String, url: String })
</script>

<style>
.card-icon {
  --brd-radius: 7px;

  width: calc(100% - 40px);
  height: calc(100% - 40px);

  padding: 20px;
  --items-margin: 0 20px;
}

.card-icon__image-container {
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
}

.card-icon__image-container > img {
  border-radius: var(--brd-radius);
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
}

.card-icon__image-container > h4 {
  position: absolute;

  color: var(--ft-light-color);

  bottom: 20px;
  margin: var(--items-margin);
}
</style>
