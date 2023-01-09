import { defineComponent, h } from 'vue'
import { iconType } from './types'
import { FontIcon, IconifyIconOnline } from '../index'

export const useRenderIcon = (icon: any, attrs?: iconType) => {
  // console.log('useRenderIcon=>', typeof icon, icon)
  //* 组件形式 svg
  if (typeof icon === 'function' || typeof icon?.render === 'function') {
    return icon;
  }
  else {
    //* 本地 & 线上
    return defineComponent({
      name: "Icon",
      render() {
        const IconComp = icon && icon.includes(':') ? IconifyIconOnline : FontIcon
        return h(IconComp, {
          icon,
          ...attrs
        });
      }
    });
  }
}