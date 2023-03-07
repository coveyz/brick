import { reactive } from 'vue';
import { attr,watermarkInfoType } from '../../types';


const watermarkInfo: watermarkInfoType = reactive({
  container: new WeakMap(),
  observeInfo: new WeakMap(),
})


/** 🚀 写入 canvas 信息 */
const writeInfo = (ctx: CanvasRenderingContext2D, str: string, x: number, y: number) => {
  ctx.beginPath();
  ctx.fillText(str, x, y);
  ctx.closePath();
}

const cretaeImageWithmark = (str: string, node: HTMLElement, attr?: attr) => {
  const width = node.clientWidth,
    height = node.clientHeight,
    canvas = document.createElement('canvas')

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const rotate = attr?.rotate as number;
  ctx.font = attr?.font as string;
  ctx.fillStyle = attr?.fillStyle as string;
  ctx.rotate((rotate * Math.PI) / 180);
  for (let x = -width; x < 3 * width; x += (width / 6)) {
    for (let y = -height; y < 3 * height; y += (height / 6)) {
      writeInfo(ctx, str, x, y);
    }
  }

  return canvas.toDataURL('image/png');
}

/** 🚀 处理 节点变动时候 是删除 container 内容 还是 继续生成水印 */
const handleWatermark = (node: HTMLElement) => {
  const info = watermarkInfo['container'].get(node);
  useBlobWatermark(info?.text, node, info)
}

/** 🚀 监听DOM 操作 */
const obserWatermarkContainer = (node: HTMLElement) => {
  if (!node) return null;

  let observe = watermarkInfo['observeInfo'].get(node);

  const cb = (mutationList: any, observe: any) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'attributes') {
        handleWatermark(node)
      }
    }
  }

  if (!observe) {
    observe = new MutationObserver(cb)
    watermarkInfo['observeInfo'].set(node, observe)
  }

  observe.observe(node, {
    attributes: true
  })

}

// 🚀 设置 背景图 水印
export const useBlobWatermark = (str: string = '水印', node: HTMLElement, attr?: attr) => {
  const hasNode = watermarkInfo['container'].has(node);

  if (hasNode) {
    const observe = watermarkInfo['observeInfo'].get(node);
    observe?.disconnect();
  }

  watermarkInfo['container'].set(node, { text: str, ...attr });

  const picWatermark = cretaeImageWithmark(str, node, attr)
  const styles = `
    background: url(${picWatermark})!important;
  `
  node.setAttribute('style', styles)

  obserWatermarkContainer(node)
}

/** 🚀 删除背景水印 */
export const useClearBlobWatermark = (node: HTMLElement) => {
  if (!watermarkInfo['container'].has(node)) {
    return console.warn('blob-当前节点 不存在 水印👮');
  }

  const observe = watermarkInfo['observeInfo'].get(node);
  observe?.disconnect();

  watermarkInfo['observeInfo'].delete(node);
  watermarkInfo['container'].delete(node)

  node.style.background = ''
}

