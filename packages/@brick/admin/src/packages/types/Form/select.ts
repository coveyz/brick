import { baseFormConfigurationType } from './base'

export interface SelectConfigurationType extends baseFormConfigurationType {
  value: string | number | any[],
  options: string | any[]
}


export type SelectItemType = {
  label: string,
  value: string | number
}

export type SelectItemOptionsType = SelectItemType[]