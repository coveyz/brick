import { defineStore } from 'pinia';
import { getItem } from '@/utils/tools';
import setting from '@/setting';

export const useThemeStore = defineStore('admin-theme', {
  state: () => ({
    // theme: getItem('layout') ?? setting.Theme
    theme: getItem('layout')?.theme ?? setting['Theme']
  }),
  actions: {
    setEpThemeColor: (newColor: string): void => {

    }
  }
})