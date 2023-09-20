<template>
  <div class="container">
    <Timer></Timer>
    <Timer></Timer>
  </div>
</template>

<script setup>
import Timer from "./Timer.vue";
</script>

<script>
export default {
  data() {
    return {};
  },
  components: { Timer },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
