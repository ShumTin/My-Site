import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from './utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasGetUserInfo = store.getters.user
  if (to.meta.auth) {
    // 需要鉴权
    if (hasGetUserInfo) {
      next()
    } else {
      const hasToken = getToken()
      if (hasToken) {
        // 验证token有效性
        try {
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error('未登录，或登录已过期')
          next(`/login?redirect=${to.path}`)
        }
      } else {
        // 无token，导航到/login
        Message.error('未登录，或登录已过期')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    // 该页面不需要鉴权
    if (to.path === '/login' && hasGetUserInfo) {
      // 已登录
      next({ path: '/' })
    } else {
      next()
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
