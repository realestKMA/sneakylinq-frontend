<script setup>
const props = defineProps({
  strokeColor: {type: String, default: "black"}
})
</script>

<template>
    <p
      :class="props.strokeColor == 'black' ? 'outline-text-black':'outline-text-white'"
      class="font-cherry font-black outline-text text-black/0">Sneaky Linq</p>
</template>

<style>
.outline-text {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.outline-text-black {
  -webkit-text-stroke: 2px rgb(0, 0, 0, 1);
}

.outline-text-white {
  -webkit-text-stroke: 2px rgb(255, 255, 255, 1);
}
</style>