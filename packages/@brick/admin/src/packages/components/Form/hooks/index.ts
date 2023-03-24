import { reactive, onMounted, toRefs, watch, ref } from 'vue'
import { FormDataType } from '@/packages/index'

const packageData = (arr: any[], target: any) => {
  for (const item of arr) {
    target[item.name] = item['value'];
  }
}

export const useFormData = (props: any) => {
  const formState:FormDataType = reactive({
    model: {},
    template: props.config || [],
    formRef: ref()
  })

  onMounted(() => {
    packageData(formState['template'], formState['model'])
  })

  watch(
    () => formState.template,
    (arr) => {
      packageData(arr, formState['model'])
    },
    {
      deep: true
    })


  const getFields = () => {
    return formState['model'];
  }


  /**
   *@description 清空 fields
   */
  const resetFileds = () => {
    formState['template'] = formState['template'].map((item: any) => {
      item['value'] = null;
      if (Array.isArray(item['value'])) {
        item['value'] = [];
      }
      else if (typeof item['value'] === 'string') {
        item['value'] = ''
      }
      else {
        item['value'] = null
      }

      return item
    })
  }

  return {
    ...toRefs(formState),
    getFields,
    resetFileds
  }
}