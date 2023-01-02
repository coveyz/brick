import { reactive, toRefs } from 'vue';
import { useThemeStore } from '@/store/modules/theme';
import { getItem, setItem } from '@/utils/tools';

export const useDataThemeChange = () => {
  const state = reactive({
    dataTheme: getItem('layout')?.darkMode
  })

  // todo🍌 设置主体颜色
  const setLayoutThemeColor = (theme: "default") => {
    setItem('layout', { ...getItem('layout'), theme })
  }

  // 🍌 日间,黑夜 主体切换
  const dataThemeChange = () => {
    // 🍌 如果是 light 夜间模式， 默认切换到default;
    if (useThemeStore().theme === 'light' && state.dataTheme) {
      console.log('default');
      setLayoutThemeColor('default');
    } else {
      setLayoutThemeColor(useThemeStore().theme)
    }

    if (state.dataTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    ...toRefs(state),
    dataThemeChange
  }
}

