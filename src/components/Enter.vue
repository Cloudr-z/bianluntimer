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
import { setupConfig } from "../store/config.js";
export default {
  setup() {
    const configs = setupConfig();
    return { configs };
  },
  props: {
    // basicInfo: {
    //   type: Object,
    //   default: () => ({}),
    // },
    // steps: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  data() {
    return {
      basicInfo: {
        debateTitle: "辩题辩题辩题辩题辩题辩题辩题",
        debateTeam1: "xxx队",
        debateTeam2: "yyy队",
      },
      index: 0,
      steps: [],
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
      return (
        (this.steps.length > this.index && dict[this.steps[this.index].type]) ||
        "div"
      );
    },
  },
  mounted() {
    let uuid = this.$route.params.uuid;
    this.steps = this.configs.getConfigs(uuid);
    console.log(this.steps);
  },
};
</script>

<style scoped lang="scss"></style>
