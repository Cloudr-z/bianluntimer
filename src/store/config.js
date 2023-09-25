import { defineStore } from "pinia";
import pinia from "./store.js";
// 创建store,命名规则： useXxxxStore
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
export const useConfigsStore = defineStore("configs", {
  state: () => {
    return {
      configs: {},
    };
  },
  getters: {},
  actions: {
    getConfigs(uuid) {
      return this.configs[uuid];
    },
    addConfig(config) {
      let uuid = crypto.randomUUID();
      this.configs[uuid] = config;
      console.log(this.configs, uuid);
      return uuid;
    },
    updateConfig(uuid, config) {
      this.configs[uuid] = config;
    },
  },
});
export function setupConfig() {
  return useConfigsStore(pinia);
}
