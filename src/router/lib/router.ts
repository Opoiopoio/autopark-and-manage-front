import { createRouter, createWebHashHistory } from 'vue-router'

// import { LayoutEnum } from '@/layouts/layout.enum'

import { beforeEachCallback } from './before.each.hook'
import { PageNameEnum } from './page-name.enum'
import { PageTitleEnum } from './page-title.enum'

export const router = createRouter({
  routes: [
    {
      path: `/object/list`,
      name: PageNameEnum.objectList,
      component: () => import('@/pages/ObjectList.vue'),
    },
    {
      path: '/icon/list',
      name: PageNameEnum.iconList,
      component: () => import('@/pages/IconList.vue'),
    },
    {
      path: '/tecnical/list',
      name: PageNameEnum.tecnicalList,
      component: () => import('@/pages/TechnicalList.vue'),
    },
    {
      path: '/employee/list',
      name: PageNameEnum.employeeList,
      component: () => import('@/pages/EmployeeList.vue'),
    },
    {
      path: '/',
      redirect: `/object/list`,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: `/object/list`,
    },
  ],
  history: createWebHashHistory(),
})

router.getRoutes().forEach((route) => {
  if (!route.name) return
  else if ((route.name as string)?.endsWith('-list')) {
    route.meta.isList = true
  }

  const pageName = route.name as PageNameEnum

  const headerTitle = PageTitleEnum[pageName]

  if (!headerTitle) return

  route.meta.headerTitle = headerTitle
})

router.beforeEach(beforeEachCallback())
