import { NavigationGuardWithThis } from 'vue-router'

import { LayoutEnum } from '@/layouts/layout.enum'

export function beforeEachCallback(): NavigationGuardWithThis<undefined> {
  return async (route) => {
    const layoutName = route.meta.layoutName || LayoutEnum.default

    const layout = await import(`../../layouts/${layoutName}.vue`)

    route.meta.layoutName = layoutName
    route.meta.layout = layout.default
  }
}
