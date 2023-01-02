import type { VNode } from 'vue';

declare global {
  /**
   * 对应 setting 生命文件
   */
  interface ServerConfigs {
    Theme?: string;
    DarkMode?: boolean;
  }
}