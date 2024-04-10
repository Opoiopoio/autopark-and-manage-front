<template>
  <div class="toolbar__item">
    <h5>{{ tittle }}</h5>
    <svg
      height="20px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({ tittle: String })
</script>

<style>
.toolbar__item h5 {
  margin: 0;
}
.toolbar__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  /* background-color: #fff; */
}
</style>
