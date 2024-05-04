export interface IToolbarHeaderItem {
  title: string
  onClick?: (e: MouseEvent) => void
}

// export type TemplateNames = 'item' | 'inactive'

export class ToolbarHeaderItem implements IToolbarHeaderItem {
  title: string
  onClick?: (e: MouseEvent) => void

  constructor(title: string, onClick?: (e: MouseEvent) => void) {
    this.title = title
    this.onClick = onClick
  }
}
