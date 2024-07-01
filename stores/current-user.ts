import { defineStore } from "pinia";

interface CurrentUser {}

interface UnlockInfo {
  remainingUnlock: number;
}

export const useCurrentUser = defineStore("currentUserStore", {
  state: () => ({
    userInfo: {} as CurrentUser,
    unlockInfo: {
      remainingUnlock: 1
    } as UnlockInfo
  }),
  getters: {
    remainingUnlock: (state) => state.unlockInfo.remainingUnlock
  },
  actions: {
    async fetchCurrentUser() {
      // fetch data from API and update state
      //...
    },
    async change() {
      this.unlockInfo.remainingUnlock = 1;
    }
  }
});
