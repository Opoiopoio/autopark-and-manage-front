import { computed, ComputedRef } from 'vue'
import { ITectical, IObject, IEmployee, IIcon } from './server.types'
import { useIconStore, useObjectStore, useTchicalStore } from '../../store'

export interface IToolbarHeaderItem {
  tittle: string
  resourceStatuses: Record<Resources, boolean>
  watchedResource: Resources
  onClick: (
    resourceStatuses: Record<Resources, boolean>,
    watchedResource: Resources
  ) => void
}

// export type TemplateNames = 'item' | 'inactive'

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

export interface IResurceStatuses extends Record<Resources, boolean> {}

export class ResourceStatuses implements IResurceStatuses {
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

// export class ResourceTemplates implements Record<Resources, TemplateNames> {
//   object: TemplateNames
//   tecnical: TemplateNames
//   icon: TemplateNames
//   employee: TemplateNames
//   equipment: TemplateNames
//   constructor(resourceStatuses: Record<Resources, boolean>) {
//     this.tecnical = resourceStatuses.tecnical ? 'item' : 'inactive'
//     this.icon = resourceStatuses.icon ? 'item' : 'inactive'
//     this.employee = resourceStatuses.employee ? 'item' : 'inactive'
//     this.equipment = resourceStatuses.equipment ? 'item' : 'inactive'
//     this.object = resourceStatuses.object ? 'item' : 'inactive'
//   }
// }

export class ComputedResourceItems implements Record<Resources, object> {
  readonly object: ComputedRef<IObject[]>
  readonly tecnical: ComputedRef<ITectical[]>
  readonly icon: ComputedRef<IIcon[]>
  readonly employee: ComputedRef<IEmployee[]>
  readonly equipment: ComputedRef<IEmployee[]>
  constructor() {
    const tecnicalStore = useTchicalStore()
    tecnicalStore.get()

    this.tecnical = computed(() => Object.values(tecnicalStore.items))

    const objectStore = useObjectStore()
    objectStore.get()

    this.object = computed(() => Object.values(objectStore.items))

    this.employee = computed(() => {
      return Object.values<IEmployee>([])
    })

    this.equipment = computed(() => {
      return Object.values<IEmployee>([])
    })

    const iconStore = useIconStore()
    iconStore.get()
    this.icon = computed(() => Object.values(iconStore.items))
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
