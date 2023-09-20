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

      <!-- <Timer class="center" ref="timer" :countDown="currentStep.time1"></Timer> -->
      <div class="digital flex justify-center" v-if="slide.type === 'single'">
        {{ countDownToMinSec(currentTime) }}
      </div>
      <div class="flex justify-around">
        <div class="digital" v-if="slide.type === 'dual'">
          {{ countDownToMinSec(slide.time1) }}
        </div>
        <div class="digital" v-if="slide.type === 'dual'">
          {{ countDownToMinSec(slide.time2) }}
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
          v-if="slide.type === 'single'"
          @click="start"
        >
          启动
        </button>
        <button
          class="text-slate-100 border border-slate-100 rounded-sm p-1 mr-5"
          v-if="slide.type === 'dual'"
        >
          启动正方
        </button>
        <button
          class="text-slate-100 border border-slate-100 rounded-sm p-1 mr-5"
          v-if="slide.type === 'dual'"
        >
          启动反方
        </button>
        <button
          class="text-slate-100 border border-slate-100 rounded-sm p-1 mr-5"
          @click="pause"
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
      currentTime: this.slide.time1,
      interval: null,
      isRunning: false,
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

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.currentTime -= 100;

        let newSilde = { ...this.slide };
        newSilde.time1 = this.currentTime;
        this.$emit("update:slide", newSilde);
        if (this.currentTime <= 0) {
          this.pause();
        }
      }, 100);
    },
    pause() {
      clearInterval(this.interval);
      this.isRunning = false;
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
