export interface attr {
  type?: 'children' | 'blob'
  font?:string
  fillStyle?: string /** 填充绘制图形的颜色，默认  */
  rotate?: number
  zIndex?: number
    /** 是否让水印无法删除，默认`false`，开启后在控制台操作对应的 `Elements` 也无法删除 */
  forever?: boolean
}

type watermarkCacheInfo = attr & { text: string }


export type watermarkInfoType = {
  container: WeakMap<HTMLElement, watermarkCacheInfo>
  observeInfo: WeakMap<HTMLElement, MutationObserver>
}