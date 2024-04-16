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
