<template>
  <div class="container">
    <span class="digital">{{ countDownToMinSec }}</span>
    <p>{{ name }}</p>
    <button
      @click="
        this.startFlag = true;
        countDownStart();
      "
    >
      开始
    </button>
    <button @click="countDownPause">暂停</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countDown: 5 * 60 * 1000,
      name: "总时间",
      startFlag: false,
    };
  },
  components: {},
  computed: {
    countDownToMinSec() {
      const min = Math.floor(this.countDown / 1000 / 60);
      const sec =
        Math.floor((this.countDown / 1000) % 60) == 0
          ? "00"
          : Math.floor((this.countDown / 1000) % 60);
      return `${min}:${sec}`;
    },
  },
  methods: {
    countDownStart() {
      this.countDown -= 1000;
      if (this.countDown > 0 && this.startFlag) {
        setTimeout(() => {
          this.countDownStart();
        }, 1000);
      }
    },
    countDownPause() {
      this.startFlag = false;
    },
  },
};
</script>

<style scoped>
.digital {
  font-size: 200px;
  font-family: "DSDIGI";
}
</style>
