import type { VNode } from 'vue';
import { RouteLocationNormalized } from 'vue-router'

declare global {
  interface ServerConfigs {
    Theme?: string;
    DarkMode?: boolean;
    Title?: string;
  }

  interface toRouteType extends RouteLocationNormalized {
    meta: {
      title?: string;
      icon?: string;
      affix?: boolean;
      hidden?: boolean;
    };
  }
}