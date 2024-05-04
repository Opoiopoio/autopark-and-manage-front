import { createRouter, createWebHashHistory } from 'vue-router'

// import { LayoutEnum } from '@/layouts/layout.enum'

import { beforeEachCallback } from './before.each.hook'
import { PageNameEnum } from './page-name.enum'

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

router.beforeEach(beforeEachCallback())
