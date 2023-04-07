import type { FormInstance } from 'element-plus'
export interface baseFormConfigurationType {
  name: string,
  text: string,
  type: string,
  disabled: boolean
}

export type FormDataType = {
  model: { [x: string]: string | number | any[] },
  template: any[],
  formRef: FormInstance
}