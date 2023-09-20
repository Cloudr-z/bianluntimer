<template>
  <component
    :is="type"
    :key="index"
    :slide.sync="steps[index]"
    :basicInfo="basicInfo"
    @update:slide="steps.splice(index, 1, $event)"
    @prev="slide(-1)"
    @next="slide(1)"
  ></component>
</template>

<script>
import SlideCardDual from "./SlideCardDual.vue";
import SlideCard from "./SlideCard.vue";
export default {
  data() {
    return {
      basicInfo: {
        debateTitle: "辩题辩题辩题辩题辩题辩题辩题",
        debateTeam1: "xxx队",
        debateTeam2: "yyy队",
      },
      steps: [
        {
          type: "dual",
          sectionName: "对辩",
          player1: "正方一辩",
          player2: "反方一辩",
          time1: 180 * 1000,
          time2: 180 * 1000,
        },
        {
          type: "single",
          sectionName: "立论",
          player1: "正方",
          time1: 180 * 1000,
        },
        {
          type: "none",
          sectionName: "总结",
        },
      ],
      index: 0,
    };
  },
  components: { SlideCard, SlideCardDual },
  methods: {
    slide(num) {
      if (this.index + num < 0 || this.index + num > this.steps.length - 1)
        return;
      this.index += num;
    },
  },
  computed: {
    type() {
      let dict = {};
      dict.dual = SlideCardDual;
      dict.single = SlideCard;
      dict.none = SlideCard;
      return dict[this.steps[this.index].type];
    },
  },
};
</script>

<style scoped lang="scss"></style>
