<template>
  <div class="container">
    <div class="config-panel" v-if="count === 0">
      <div class="list-panel">
        <div class="list-item" v-for="(step, index) in steps" :key="index">
          <span class="list-icon">{{ index + 1 }}</span>
          <div class="item-wrapper">
            <p class="list-item-name">
              {{ `${step.type}-${step.name}` }}
            </p>
            <div class="list-item-time">
              {{ `${step.u1}·${step.time1}·${step.time2}·${step.u2}` }}
            </div>
          </div>
        </div>
      </div>
      <div class="toolbar-panel">
        <div class="toolbar-item" @click="addList">新增</div>
        <div class="toolbar-item" @click="slide(1)">开始</div>
      </div>
    </div>
    <div class="slide-panel" v-if="count > 0">
      <div class="slide-head">
        <div class="slide-item red">
          <span>正方</span>
          <span class="player">{{ currentStep.u1 }}</span>
        </div>
        <div class="slide-item blue">
          <span>反方</span>
          <span class="player">{{ currentStep.u2 }}</span>
        </div>
      </div>
      <p class="slide-title center">{{ currentStep.name }}</p>
      <Timer class="center" ref="timer" time="180000"></Timer>
      <div class="toolbar">
        <div class="next-button" @click="slide(-1)">prev</div>
        <div class="next-button" @click="countBegin">开始</div>
        <div class="next-button" @click="countPause">暂停</div>
        <div class="next-button" @click="slide(1)">next</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Timer from "./Timer.vue";
</script>
<script>
export default {
  data() {
    return {
      steps: [
        {
          type: "质询",
          name: "立论",
          u1: "正方一辩",
          u2: "反方一辩",
          time1: 180,
          time2: 180,
        },
        {
          type: "质询",
          name: "立论",
          u1: "正方一辩",
          u2: "反方一辩",
          time1: 180,
          time2: 180,
        },
      ],
      count: 0,
    };
  },
  components: {},
  methods: {
    addList() {
      this.steps.push({
        type: "质询",
        name: "立论",
        u1: "正方一辩",
        u2: "反方一辩",
        time1: 180,
        time2: 180,
      });
    },
    slide(num) {
      this.count += num;
    },
    enter() {
      this.count++;
    },
    countBegin() {
      this.$refs.timer.start();
    },
    countPause() {
      this.$refs.timer.countDownPause();
    },
  },
  computed: {
    currentStep() {
      console.log(this.steps[this.count - 1]);
      return { ...this.steps[this.count - 1] };
    },
  },
};
</script>

<style scoped>
.player {
  border: none !important;
}
.center {
  text-align: center;
}
.toolbar {
  position: absolute;
  bottom: 0;
  right: 10%;
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-evenly;
}
.next-button {
  color: #fff;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  font-weight: 900;
  cursor: pointer;
}

/* .slide-panel {
  background-image: url("../assets/image/background.png");
  background-size: 100%;
  background-repeat: no-repeat;
  height: 100vh;
} */
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
  .slide-title {
    font-size: 73.8333px;
    top: 230.729px;
    color: rgb(255, 255, 255);
    text-align: center;
  }

  .slide-head {
    margin-top: 100px;
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

.toolbar-panel {
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100px;
  border-top: 1px solid #ccc;
  background: #fff;
  .toolbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100%;
    cursor: pointer;
  }
}

.config-panel {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 80%;
  min-height: 500px;
  background-color: #fff;

  .list-panel {
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-height: 600px;
    overflow-y: scroll;
    .list-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      padding: 10px;

      box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.12);
      .list-icon {
        flex: 0 0 50px;
      }
      .item-wrapper {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        .list-item-name {
          text-align: left;
          font-size: 1.25rem; /* h5 */
          font-size: 1rem; /* body-1 */
          margin-left: 0.5rem; /* ml-2 */
          margin-left: 0.75rem; /* ml-md-3 */
          font-weight: 900; /* black */
        }
        .list-item-time {
          text-align: left;
          font-size: 1rem; /* body-2 */
          margin-left: 0.25rem; /* ml-1 */
        }
      }
    }
  }
}
</style>
