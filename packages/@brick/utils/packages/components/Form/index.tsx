import { defineComponent } from 'vue'
import { brickInput, brickSelect,brickDate } from './components'
import { useFormData } from './hooks';

export default defineComponent({
  name: 'Form',
  props: {
    config: {
      type: Array,
      default: () => ([])
    },
    inline: {
      type: Boolean,
      default: false
    },
    optionsData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: { brickInput,brickSelect,brickDate },
  setup(props) {
    const { model,template,formRef,getFields, resetFileds } = useFormData(props)

    return {
      model,template,formRef,
      getFields,resetFileds
    } 
  },

  render() {
    return (
      <>
        <el-form inline={this.inline} model={this.model} ref='formRef'>
          {
            this.template.map(((item:any) => {
              if (item.type === 'input') {
                return (
                  <el-form-item label={item.text} prop={item.name} col={item.col}>
                    <brickInput item={item}/>
                  </el-form-item>
                )
              } else if (item.type === 'select' || item.type === 'mulSelect') {
                return (
                  <el-form-item label={item.text} prop={item.name} col={item.col}>
                    <brickSelect item={item} optionsData={this.optionsData}/>
                  </el-form-item>
                )
              } else if (item.type === 'date') {
                return (
                  <el-form-item label={item.text} prop={item.name} col={item.col}>
                    <brickDate item={item} />
                  </el-form-item>
                )
              }
            }))
          }
        </el-form>
      </>
    )
  }
})