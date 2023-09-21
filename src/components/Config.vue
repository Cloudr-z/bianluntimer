<template>
  <div
    id="container"
    class="flex flex-row justify-evenly align-middle h-screen"
  >
    <!-- <div id="preview" class="w-full"></div>
    <div id="devide" class="w-1 h-1/5 border-r-stone-400 border"></div> -->
    <!-- <div id="panel" class="w-full"></div> -->
    <div class="flex flex-col p-6 w-full">
      <draggable
        :list="steps"
        item-key="id"
        ghost-class="opacity-50"
        animation="300"
        handle=".handle"
      >
        <template #item="{ element, index }">
          <div>
            <div
              class="bg-paradiso-50 w-full m-1 rounded-sm h-14 flex flex-row items-center relative -bottom-2 z-1"
              @click="showConfig(index)"
            >
              <div class="bg-paradiso-800 rounded-s-md w-8 h-full handle"></div>
              <div class="ml-4">
                <span class="text-xl text-slate-950">{{
                  goodName[index]
                }}</span>
              </div>
              <!-- <div class="ml-4">
                <span class="text-xl text-slate-950">{{ element.type }}</span>
              </div> -->
              <div
                class="ml-auto rounded-sm bg-zinc-300 pr-1 h-6 flex items-center mr-2"
              >
                <span class="bg-lime-600 text-zinc-100 rounded-s-sm mr-1 p-0.5"
                  >时</span
                >

                <span>{{ element.time1 }}</span>
                <span v-if="element.time2"> / {{ element.time2 }}</span>
              </div>
            </div>
            <a-form
              :model="element"
              autocomplete="off"
              v-show="element.showConfig"
              class="flex justify-start flex-col bg-paradiso-50 p-2 pt-3 m-1 w-full rounded-md"
            >
              <a-form-item label="环节类型">
                <a-cascader
                  :options="debateType"
                  v-model:value="element.type"
                />
              </a-form-item>
              <a-form-item label="环节名称">
                <a-input v-model:value="element.name" />
              </a-form-item>
              <a-form-item
                label="正方时间"
                v-if="element.type.indexOf('none') === -1"
              >
                <a-input v-model:value="element.time1"></a-input>
              </a-form-item>
              <a-form-item
                label="反方时间"
                v-if="element.type.indexOf('dual') > -1"
              >
                <a-input v-model:value="element.time2"></a-input>
              </a-form-item>
              <a-form-item
                label="发起人"
                v-if="element.type.indexOf('none') === -1"
              >
                <a-select v-model:value="element.u1" :options="u1Options">
                </a-select>
              </a-form-item>
              <a-form-item
                label="接受人"
                v-if="element.type.indexOf('dual') > -1"
              >
                <a-select
                  v-model:value="element.u2"
                  :options="u2Options"
                ></a-select>
              </a-form-item>
            </a-form>
          </div>
        </template>
      </draggable>
      <div class="flex flex-row mt-2">
        <div
          class="w-full m-1 rounded-md h-14 border-2 border-teal-500 border-dashed"
        >
          <div
            @click="addList"
            class="text-zinc-800 flex justify-center items-center text-2xl border-teal-700 h-full"
          >
            添加一个环节
          </div>
        </div>
        <div
          class="w-full m-1 rounded-md h-14 border-2 border-teal-500 border-dashed"
        >
          <div
            @click="jumpSilde"
            class="text-zinc-800 flex justify-center items-center text-2xl border-teal-700 h-full"
          >
            开始计时
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      debateType: [
        {
          value: "basic",
          label: "常规",
          children: [
            {
              value: "single",
              label: "单方发言",
            },

            {
              value: "dual",
              label: "自由辩论",
            },
          ],
        },
        {
          value: "base",
          label: "基类",
          children: [
            {
              value: "none",
              label: "无计时器",
            },
            {
              value: "single",
              label: "单计时器",
            },
            {
              value: "dual",
              label: "双计时器",
            },
          ],
        },
      ],
      u1Options: [
        { value: "正方一辩" },
        { value: "正方二辩" },
        { value: "正方三辩" },
      ],
      u2Options: [
        { value: "反方一辩" },
        { value: "反方二辩" },
        { value: "反方三辩" },
      ],
      steps: [
        {
          id: 1,
          type: "质询",
          name: "立论",
          u1: "正方一辩",
          u2: "反方一辩",
          time1: 180,
          time2: 180,
        },
        {
          id: 2,
          type: "质询",
          name: "立论",
          u1: "正方一辩",
          time1: 180,
        },
        {
          id: 3,
          type: "质询",
          name: "立论",
          u1: "正方一辩",
          time1: 180,
        },
        {
          id: 4,
          type: "质询",
          name: "立论",
          u1: "正方一辩",
          time1: 180,
        },
      ],
    };
  },
  components: { draggable },
  methods: {
    addList() {
      this.steps.push({
        type: [this.debateType[0].value, this.debateType[0].children[0].value],
        name: "单方发言",
        u1: "正方一辩",
        time1: 180,
      });
    },
    slide(num) {
      if (this.index + num < 0 || this.index + num > this.steps.length - 1)
        return;
      this.index += num;
    },
    showConfig(index) {
      if (this.steps[index].showConfig) {
        this.steps[index].showConfig = false;
      } else {
        this.steps.forEach((element) => {
          element.showConfig = false;
        });
        this.steps[index].showConfig = true;
      }
    },
    jumpSilde() {
      this.$router.push("/enter");
    },
  },
  mounted() {
    this.steps.forEach((element) => {
      element.showConfig = false;
    });
  },
  computed: {
    goodName() {
      return this.steps.map((item) =>
        item.u2 ? item.u1 + "-" + item.name + "-" + item.u1 : item.name
      );
    },
  },
};
</script>

<style scoped lang="scss"></style>
