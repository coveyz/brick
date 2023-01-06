import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { NavigationGuardNext } from 'vue-router'

import { useUserStore } from '@/store/modules/user'
import router from '@/router';
import { getToken } from '@/utils/auth';
import { getPageTitle, errorMsg } from '@/utils/tools'

Nprogress.configure({ showSpinner: false });

const whiteList = ['/user/login', '/user/register']

router.beforeEach(async (to: toRouteType, _form, next: NavigationGuardNext) => {
  Nprogress.start();
  document.title = getPageTitle(to.meta.title)

  if (getToken()) {
    console.log('hasToken')
    if (whiteList.includes(to.path)) {
      console.log('登录成功之后 不得再跳到白名单的页面');
      next({ path: '/' })
      Nprogress.done()
    }
    const store = useUserStore();
    const hasRoles = store.userRoles && store.userRoles.length;

    if (hasRoles) {
      next()
    } else {

      try {
        const { roles } = await store.getInfo();
        next()
      } catch (error) {
        //todo resetToken
        store.resetToken()
        console.error('permission-error', error)
        // errorMsg('Has Error');
        next(`/user/login?redirect=${to.path}`);
        Nprogress.done()
      }

    }

  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/user' });
      Nprogress.done()
    }
  }

})


router.afterEach(() => {
  Nprogress.done()
})