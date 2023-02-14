import { defineStore } from 'pinia';
import { getSidebarStatus, setSidebarStatus } from '@/utils/auth';
import setting from '@/setting';

export const useAppStore = defineStore('amdin-app', {
  state: () => ({
    sidebar: {
      opened: getSidebarStatus() !== 'closed',
      withoutAnimation: false,
    },
    fixedHeader: setting['FixedHeader']
  }),
  actions: {
    TOGGLE_SIDEBAR() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;

      if (this.sidebar.opened) {
        setSidebarStatus('opened')
      } else {
        setSidebarStatus('closed')
      }

    },
    toggleSideBar() {
      console.log('store')
      this.TOGGLE_SIDEBAR()
    }
  }
})