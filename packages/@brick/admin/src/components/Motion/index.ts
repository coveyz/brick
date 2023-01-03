import { defineComponent, h, resolveDirective, withDirectives } from 'vue';

// 🍌 封装 @vueuse/motion 动画库 v-motion
export default defineComponent({
  name: 'Motion',
  props: {
    delay: {
      type: Number,
      default: 50
    }
  },
  render() {
    const { delay } = this
    const motion = resolveDirective('motion');
    // console.log('Motion=>', motion)

    return withDirectives(
      h('div', {}, {
        default: () => [(this.$slots as any).default()]
      }),
      [
        [
          motion, {
            initial: { opacity: 0, y: 100 },
            enter: {
              opacity: 1, y: 0,
              transition: {
                delay: delay
              }
            }
          }
        ]
      ]
    )

  }
})