import { baseFormConfigurationType } from './base'

export type baseDateType = "date" | "year" | "month" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange"

export interface DateConfigurationType extends baseFormConfigurationType {
  value: string
  dateType: baseDateType
  format?: string
  valueFormat?: string
  rangeSeparator?: string
  startPlaceholder?: string
  endPlaceholder?: string
}

