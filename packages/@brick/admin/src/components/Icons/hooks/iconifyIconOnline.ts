import { defineComponent, h } from 'vue'
import { Icon as IconifyIcon } from "@iconify/vue";

export default defineComponent({
  components: { IconifyIcon },
  props: {
    icon: {
      type: String,
      default: ""
    }
  },
  render() {
    const attrs = this.$attrs
    return h(IconifyIcon, {
      icon: `${this.icon}`,
      class: 'svg-icon',
      style: attrs?.style
        ? Object.assign(attrs.style, { outline: "none" })
        : { outline: "none" },
      ...attrs
    }, {
      default: () => []
    }
    )
  }
})