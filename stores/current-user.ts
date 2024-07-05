import { defineStore } from "pinia";
import { fetchUnlockReport } from "../services/reports";

interface CurrentUser {}

interface UnlockInfo {
  remainingUnlock: number;
}

export const useCurrentUser = defineStore("currentUserStore", {
  state: () => ({
    userInfo: {} as CurrentUser,
    unlockInfo: {
      remainingUnlock: 0
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
    async unlockReport(reportId: string) {
      // call BE to verify & update state
      await fetchUnlockReport(reportId);
      this.unlockInfo.remainingUnlock--;
    }
  }
});
