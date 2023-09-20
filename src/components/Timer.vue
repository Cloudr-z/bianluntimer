<template>
  <div class="container">
    <span class="digital">{{ countDownToMinSec }}</span>
  </div>
</template>

<script>
export default {
  props: {
    countDown: {
      type: Number,
      default: 5 * 60 * 1000,
    },
  },
  data() {
    return {
      startFlag: false,
    };
  },
  components: {},
  computed: {
    countDownToMinSec() {
      const min = Math.floor(this.countDown / 1000 / 60);
      const sec =
        Math.floor((this.countDown / 1000) % 60) < 10
          ? "0" + Math.floor((this.countDown / 1000) % 60)
          : Math.floor((this.countDown / 1000) % 60);
      return `${min}:${sec}`;
    },
  },
  mounted() {
    this.countDown = this.time;
  },
  methods: {
    start() {
      if (this.startFlag) return;
      this.startFlag = true;
      this.countDownStart();
    },
    countDownStart() {
      this.countDown -= 100;
      if (this.countDown > 0 && this.startFlag) {
        setTimeout(() => {
          this.countDownStart();
        }, 100);
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
  color: #fff;
}
</style>
