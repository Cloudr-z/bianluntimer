<template>
  <div>
    <div class="slide-panel">
      <div class="slide-head">
        <div class="slide-item red">
          <span>正方</span>
          <span class="player">{{ basicInfo.debateTeam1 }}</span>
        </div>
        <div class="slide-item blue">
          <span>反方</span>
          <span class="player">{{ basicInfo.debateTeam2 }}</span>
        </div>
      </div>

      <p class="slide-title2 center">{{ basicInfo.debateTitle }}</p>

      <p class="slide-title center">{{ slide.sectionName }}</p>

      <div class="flex justify-around">
        <div class="digital" v-if="slide.type === 'dual'">
          {{ countDownToMinSec(currentTime[0]) }}
        </div>
        <div class="digital" v-if="slide.type === 'dual'">
          {{ countDownToMinSec(currentTime[1]) }}
        </div>
      </div>

      <div class="flex justify-center absolute bottom-10 w-full">
        <button
          class="text-slate-100 border border-slate-100 rounded-sm p-1 mr-5"
          @click="$emit('prev')"
        >
          上一环节
        </button>
        <button
          class="text-slate-100 border border-slate-100 rounded-sm p-1 mr-5"
          v-if="slide.type === 'dual'"
          @click="start(0)"
        >
          启动正方
        </button>
        <button
          class="text-slate-100 border border-slate-100 rounded-sm p-1 mr-5"
          v-if="slide.type === 'dual'"
          @click="start(1)"
        >
          启动反方
        </button>
        <button
          class="text-slate-100 border border-slate-100 rounded-sm p-1 mr-5"
          @click="
            pause(0);
            pause(1);
          "
        >
          暂停
        </button>
        <button
          class="text-slate-100 border border-slate-100 rounded-sm p-1 mr-5"
          @click="$emit('next')"
        >
          下一环节
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slide: {
      type: Object,
      default: () => {},
    },

    basicInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentTime: [this.slide.time1, this.slide.time2],
      interval: [null, null],
      isRunning: [false, false],
    };
  },
  methods: {
    countDownToMinSec(ms) {
      const min = Math.floor(ms / 1000 / 60);
      const sec =
        Math.floor((ms / 1000) % 60) < 10
          ? "0" + Math.floor((ms / 1000) % 60)
          : Math.floor((ms / 1000) % 60);
      return `${min}:${sec}`;
    },

    start(index) {
      if (this.isRunning[index]) return;
      if (this.isRunning[1 - index]) this.pause(1 - index);
      this.isRunning[index] = true;
      this.interval[index] = setInterval(() => {
        this.currentTime[index] -= 100;

        let newSilde = { ...this.slide };
        newSilde.time1 = this.currentTime[0];
        newSilde.time2 = this.currentTime[1];

        this.$emit("update:slide", newSilde);
        if (this.currentTime[index] <= 0) {
          this.pause(index);
        }
      }, 100);
    },
    pause(index) {
      clearInterval(this.interval[index]);
      this.isRunning[index] = false;
    },
  },
  watch: {
    currentTime: {
      handler(val) {
        if (val[0] <= 0) {
          this.pause(0);
          this.start(1);
        }
        if (val[1] <= 0) {
          this.pause(1);
          this.start(0);
        }
      },
      deep: true,
    },
  },
  components: {},
  computed: {
    // currentStep() {
    //   console.log(this.debate.steps[this.count - 1]);
    //   return { ...this.debate.steps[this.count - 1] };
    // },
  },
};
</script>

<style scoped>
.digital {
  font-size: 200px;
  font-family: "DSDIGI";
  color: #fff;
}
.red {
  background-color: rgb(179, 37, 37);
  > span {
    float: left;
  }
}
.blue {
  background-color: rgb(3, 105, 161);
  > span {
    float: right;
  }
}
.slide-panel {
  background: radial-gradient(
      50% 100% at center bottom,
      rgb(57, 76, 86),
      rgb(14, 17, 17)
    )
    0% 0% / cover;
  height: 100vh;
  overflow: hidden;
  width: 100%;
  .slide-title {
    font-size: 73.8333px;
    top: 230.729px;
    color: rgb(255, 255, 255);
    text-align: center;
  }

  .slide-title2 {
    font-size: 50px;
    top: 230.729px;
    color: rgb(3, 105, 161);
    text-align: center;
  }

  .slide-head {
    margin-top: 70px;
    height: 10%;
    background-color: #fff;
    display: flex;
    .slide-item {
      flex: 1;
      width: auto;
      > span {
        font-size: 30px;
        font-weight: 900;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 5px;
        margin-top: 12px;
        margin-left: 20px;
        margin-right: 20px;
        padding-left: 3px;
        padding-right: 3px;
      }
    }
  }
}
</style>
