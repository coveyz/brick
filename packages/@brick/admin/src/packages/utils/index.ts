
export const throttleAndDebounce = (fn: any, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>
  let called = false;

  return () => {
    if (timeout) clearTimeout(timeout);
    if (!called) {
      fn();
      called = true;
      setTimeout(() => {
        called = false
      }, delay);
    } else {
      timeout = setTimeout(fn, delay)
    }
  }
}

/**
 * 
 * @description 判断当前数据类型
 */
export const currentDataType = (item: any) => {
  return Object.prototype.toString.call(item).slice(8, -1)
}