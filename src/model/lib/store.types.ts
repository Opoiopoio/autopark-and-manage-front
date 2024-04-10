import { Icon, Map, Marker } from 'leaflet'

export interface IconModuleState {
  icons: Record<string, Icon>
}
export interface MapModule {
  map: null | Map
}

export interface ObjectModule {
  objects: Record<string, Marker>
}
