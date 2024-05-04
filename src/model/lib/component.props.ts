export interface MapToolbarProps {
  items?: Array<MapToolbarTreeProps>
}

export interface MapToolbarTreeProps {
  title: string
  onClick?: (e: MouseEvent) => void
  items?: { name: string; onClick?: (e: MouseEvent) => void }[]
}
