import { defineComponent, h } from 'vue';
import { iconModules } from '@/icons'


export default defineComponent({
  name: 'FontIcon',
  props: {
    icon: {
      type: String,
      default: ''
    },
  },
  render() {
    const locationIcon = iconModules[this.icon]
    if (!locationIcon) return console.warn('图标不存在');

    const attrs = this.$attrs;
    return h(locationIcon, {
      ...attrs
    }
    );
  }
})