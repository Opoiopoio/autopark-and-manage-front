import { computed, ComputedRef } from 'vue'
import { Store } from 'vuex'
import { ITectical, IObject, IEmployee, IIcon } from './server.types'

export interface IToolbarHeaderItem {
  tittle: string
  resourceStatuses: Record<Resources, boolean>
  watchedResource: Resources
  onClick: (
    resourceStatuses: Record<Resources, boolean>,
    watchedResource: Resources
  ) => void
}

export type TemplateNames = 'item' | 'inactive'

export type Resources = 'tecnical' | 'icon' | 'employee' | 'equipment' | 'object'

export class ToolbarHeaderItem implements IToolbarHeaderItem {
  tittle: string
  resourceStatuses: Record<Resources, boolean>
  watchedResource: Resources

  constructor(
    tittle: string,
    resourceStatuses: Record<Resources, boolean>,
    watchedResource: Resources
  ) {
    this.tittle = tittle
    this.resourceStatuses = resourceStatuses
    this.watchedResource = watchedResource
  }

  onClick(resourceStatuses: Record<Resources, boolean>, watchedResource: Resources) {
    resourceStatuses[watchedResource] = true
  }
}

export class ResourceStatuses implements Record<Resources, boolean> {
  object: boolean
  tecnical: boolean
  icon: boolean
  employee: boolean
  equipment: boolean
  constructor() {
    this.object = true
    this.tecnical = false
    this.icon = false
    this.employee = false
    this.equipment = false
  }
}

export class ResourceTemplates implements Record<Resources, TemplateNames> {
  object: TemplateNames
  tecnical: TemplateNames
  icon: TemplateNames
  employee: TemplateNames
  equipment: TemplateNames
  constructor(resourceStatuses: Record<Resources, boolean>) {
    this.tecnical = resourceStatuses.tecnical ? 'item' : 'inactive'
    this.icon = resourceStatuses.icon ? 'item' : 'inactive'
    this.employee = resourceStatuses.employee ? 'item' : 'inactive'
    this.equipment = resourceStatuses.equipment ? 'item' : 'inactive'
    this.object = resourceStatuses.object ? 'item' : 'inactive'
  }
}

export class ComputedResourceItems implements Record<Resources, ComputedRef> {
  readonly object: ComputedRef<IObject[]>
  readonly tecnical: ComputedRef<ITectical[]>
  readonly icon: ComputedRef<IIcon[]>
  readonly employee: ComputedRef<IEmployee[]>
  readonly equipment: ComputedRef<IEmployee[]>
  constructor(store: Store<object>) {
    this.dispatchGet(store)
    this.tecnical = computed(() => {
      const technic = store.getters['technical/technical']
      return Object.values<ITectical>(technic)
    })

    this.object = computed(() => {
      const objects = store.getters['object/objects']
      return Object.values<IObject>(objects)
    })

    this.employee = computed(() => {
      const employee = store.getters['employee/employee']
      return Object.values<IEmployee>(employee ?? [])
    })

    this.equipment = computed(() => {
      const equipment = store.getters['equipment/equipment']
      return Object.values<IEmployee>(equipment ?? [])
    })

    this.icon = computed(() => {
      const icons = store.getters['icon/icons']
      return Object.values<IIcon>(icons)
    })
  }

  private dispatchGet(store: Store<object>) {
    store.dispatch('technical/get')
    store.dispatch('object/get')
    store.dispatch('icon/get')
    try {
      store.dispatch('employee/get')
      store.dispatch('equipment/get')
    } catch (error) {
      console.error(error)
    }
  }
}

export class ResourceItems implements Record<Resources, object[]> {
  object: object[]
  tecnical: object[]
  icon: object[]
  employee: object[]
  equipment: object[]

  constructor(resourceItems: ComputedResourceItems) {
    this.object = resourceItems.object.value
    this.tecnical = resourceItems.tecnical.value
    this.icon = resourceItems.icon.value
    this.employee = resourceItems.employee.value
    this.equipment = resourceItems.equipment.value
  }
}
