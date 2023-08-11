import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/newadministration',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/newadministration',
        component: () => import('@/views/record/newadministration.vue')
      }
    ]
  },
  {
    path: '/uploadfiles',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/uploadfiles',
        component: () => import('@/views/record/uploadfiles.vue')
      }
    ]
  },
  {
    path: '/download',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/download',
        component: () => import('@/views/record/download.vue')
      }
    ]
  },
  {
    path: '/examine',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/examine',
        component: () => import('@/views/record/examine.vue')
      }
    ]
  },
  {
    path: '/newSignature',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/newSignature',
        component: () => import('@/views/electronicSeal/newSignature.vue')
      }
    ]
  },
  {
    path: '/apply',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/apply',
        component: () => import('@/views/electronicSeal/apply.vue')
      }
    ]
  },
  {
    path: '/viewfile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/viewfile',
        component: () => import('@/views/record/viewfile.vue')
      }
    ]
  },
  {
    path: '/lookmanage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/lookmanage',
        component: () => import('@/views/record/lookmanage.vue')
      }
    ]
  },
  {
    path: '/redactFlow',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redactFlow',
        component: () => import('@/views/audit/redactFlow.vue')
      }
    ]
  },
  {
    path: '/lookfile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/lookfile',
        component: () => import('@/views/record/lookfile.vue')
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/recordindex',
    component: Layout,
    redirect: 'recordindex',
    meta: { title: '档案管理', icon: 'dashboard' },
    children: [
      {
        path: '/administration',
        component: () => import('@/views/record/administration.vue'),
        name: 'Administration',
        meta: { title: '档案管理', icon: 'dashboard' }
      },
      {
        path: '/dmanage',
        component: () => import('@/views/record/manage.vue'),
        name: 'dmanage',
        meta: { title: '借阅/下载申请管理', icon: 'dashboard' }
      },
      {
        path: '/record',
        component: () => import('@/views/record/record.vue'),
        name: 'record',
        meta: { title: '档案审核管理', icon: 'dashboard' }
      },
      {
        path: '/newadministration',
        component: () => import('@/views/record/newadministration.vue'),
        hidden: true,
        name: 'newadministration',
        meta: { title: '新建', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/electronicSeal',
    component: Layout,
    redirect: 'electronicSeal',
    meta: { title: '电签管理', icon: 'dashboard' },
    children: [
      {
        path: '/signature',
        component: () => import('@/views/electronicSeal/signature.vue'),
        name: 'signature',
        meta: { title: '签名用户管理', icon: 'dashboard' }
      },
      {
        path: '/seal',
        component: () => import('@/views/electronicSeal/seal.vue'),
        name: 'seal',
        meta: { title: '印章管理', icon: 'dashboard' }
      },
      {
        path: '/bianApply',
        component: () => import('@/views/electronicSeal/bianApply.vue'),
        hidden: true,
        name: 'bianApply',
        meta: { title: '编辑', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/gli',
    component: Layout,
    redirect: 'gli',
    meta: { title: '系统管理', icon: 'dashboard' },
    children: [
      {
        path: '/audit',
        component: () => import('@/views/audit/flow.vue'),
        name: 'audit',
        meta: { title: '审核流程配置', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/manageli',
    component: Layout,
    redirect: 'manageli',
    meta: { title: '归档配置', icon: 'dashboard' },
    children: [
      {
        path: '/manage',
        component: () => import('@/views/matter/manage.vue'),
        name: 'manage',
        meta: { title: '事项管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index/:jobId(\\d+)',
        component: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
      }
    ]
  }
]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push
let routerReplace = Router.prototype.replace
// push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
