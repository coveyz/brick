import { Ref } from 'vue';
import { attr } from './type';
import { useCanvasWatermark, useClearCanvasWatermark } from './canvas';
import { useBlobWatermark, useClearBlobWatermark } from './blob';

const defaultAttrs: attr = {
  type: 'canvas',
  font: '20px YaHei',
  fillStyle: 'rgba(0, 0, 0, 0.15)',
  rotate: -10,
  zIndex: 100000,
  forever: false, //* 无法删除 默认 false
}

const hasWatermark = new WeakMap();

export const useWatermark = (appendEl?: Ref<HTMLElement | null>) => {
  const setWatermark = (str: string, attr?: attr | undefined): void => {
    const node = appendEl?.value ? appendEl.value : document.body,
      newAttr = Object.assign(defaultAttrs, attr);

    // 🚀 判断 当前是否存在 水印 虽在的话 判断类型是否不同
    if (hasWatermark.has(node)) {
      const type = hasWatermark.get(node);
      console.log('has-type=>', type);
      if (type !== attr?.type) {
        return console.log('❓ 已经有水印了 先删了 在做吧');
      }
    }

    //🚀 保存 node 水印类型
    const type = attr?.type || 'children';
    hasWatermark.set(node, type);

    //🚀 全局水印 如果是BODY的话 水印不得删除
    if (node.tagName === 'BODY') {
      newAttr['forever'] = false
    }

    if (attr?.type === 'children') {
      return useCanvasWatermark(str, node, newAttr)
    } else if (attr?.type === 'blob') {
      return useBlobWatermark(str, node, newAttr)
    } else {
      return useCanvasWatermark(str, node, newAttr)
    }
  }

  const clearWatermark = (): void => {
    const node = appendEl?.value ? appendEl.value : document.body;

    hasWatermark.delete(node); 
    useClearCanvasWatermark(node);
    useClearBlobWatermark(node);
  }

  return { setWatermark, clearWatermark }
}