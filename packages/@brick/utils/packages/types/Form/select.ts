import { baseFormConfigurationType } from './base'

export type SelectItemType = {
  label: string,
  value: string | number
}

export type SelectItemOptionsType = SelectItemType[]

export interface SelectConfigurationType extends baseFormConfigurationType {
  value: string | number
  options: string | any[]
}

export interface MultipleSelectConfigurationType extends baseFormConfigurationType {
  value: Array<string | number>
  options: string | any[]
}
