import type { VNode } from 'vue';
import { RouteLocationNormalized,RouteRecordRaw } from 'vue-router'

declare global {
  interface ServerConfigs {
    Theme?: string;
    DarkMode?: boolean;
    Title?: string;
    FixedHeader?:boolean;
  }

  interface toRouteType extends RouteLocationNormalized {
    meta: {
      title?: string;
      icon?: string;
      affix?: boolean;
      hidden?: boolean;
      alwaysShow?: boolean;
      roles?: string[];
    };
  }
}