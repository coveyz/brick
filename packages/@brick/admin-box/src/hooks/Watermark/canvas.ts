import { reactive } from 'vue';
import { attr, watermarkInfoType } from './type';


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

/** 🚀 生成水印 */
const generateWatermark = (str: string, node: HTMLCanvasElement, attr?: attr) => {
  const ctx = node.getContext('2d') as CanvasRenderingContext2D
  const rotate = attr?.rotate as number;
  ctx.font = attr?.font as string;
  ctx.fillStyle = attr?.fillStyle as string;

  ctx.rotate((rotate * Math.PI) / 180);
  const width = node.width, height = node.height;
  for (let x = -width; x < 3 * width; x += (width / 6)) {
    for (let y = -height; y < 3 * height; y += (height / 6)) {
      writeInfo(ctx, str, x, y);
    }
  }
}

/** 🚀 生成水印 canvas */
const generateWatermarkContainer = (str: string, node: HTMLElement, attr?: attr) => {
  const width = node.clientWidth, height = node.clientHeight, canvas = document.createElement('canvas'),
    zIndex = attr?.zIndex,
    styles = `
      width: ${width}px; height: ${height}px;
      z-index: ${zIndex}; pointer-events: none;
      position: absolute;top: 0; left: 0;
      `;
  canvas.width = width;
  canvas.height = height;
  canvas.setAttribute('id', 'page-watermark');
  canvas.setAttribute('style', styles);
  generateWatermark(str, canvas, attr);
  node.append(canvas);
  return canvas
}

/** 🚀 处理 节点变动时候 是删除 container 内容 还是 继续生成水印 */
const handleWatermarkContainer = (targetNode: HTMLElement) => {
  const info = watermarkInfo['container'].get(targetNode);

  if (info?.forever) {
    targetNode.innerHTML = '';
  } else {
    useCanvasWatermark(info?.text, targetNode, info)
  }

}

/** 🚀 兼容DOM 变动 */
const obserWatermarkContainer = (targetNode: any) => {
  if (!targetNode) return null
  let observe = watermarkInfo['observeInfo'].get(targetNode);

  const cb = (mutationList: any, observe: any) => {
    for (const mutation of mutationList) {
      //* 不允许修改 style 
      if (mutation.type === 'attributes') {
        return handleWatermarkContainer(targetNode)
      }
      const { removedNodes = [] } = mutation
      const watermarkNode = Array.from(removedNodes).find((node: any) => node.id === "page-watermark");
      //* 如果 删除水印的话 内容全删
      if (watermarkNode) {
        return handleWatermarkContainer(targetNode)
      }
    }
  };

  if (!observe) {
    observe = new MutationObserver(cb)
    watermarkInfo['observeInfo'].set(targetNode, observe)
  }

  observe.observe(targetNode, {
    attributes: true,
    childList: true,
    subtree: true
  });
}


/**🚀 设置水印 */
export const useCanvasWatermark = (str: string = '水印', node: HTMLElement, attr?: attr) => {
  const container = watermarkInfo['container'];
  // 避免重复 创建 canvas 和 修改 observe 死循环
  if (container.has(node)) {
    const observe = watermarkInfo['observeInfo'].get(node);
    observe?.disconnect();
    node.childNodes.forEach((child: any) => {
      if (child['id'] === 'page-watermark') {
        node.removeChild(child)
      }
    })
  }

  node.setAttribute('style', `position: relative`)
  watermarkInfo['container'].set(node, { text: str, ...attr }); //* 保存当前节点存在 

  const watermarkContainer = generateWatermarkContainer(str, node, attr)
  obserWatermarkContainer(watermarkContainer.parentNode)
}


/** 🚀删除水印 */
export const useClearCanvasWatermark = (node: HTMLElement) => {
  if (!watermarkInfo['container'].has(node)) {
    return console.warn('children-当前节点 不存在 水印👮')
  }

  console.log('watermarkInfo=>', watermarkInfo['container'].has(node))

  // 取消监听
  const observe = watermarkInfo['observeInfo'].get(node);
  observe?.disconnect();

  watermarkInfo['observeInfo'].delete(node);
  watermarkInfo['container'].delete(node)

  // 删除水印;
  node.childNodes.forEach((child: any) => {
    if (child['id'] === 'page-watermark') {
      node.removeChild(child)
    }
  })
}