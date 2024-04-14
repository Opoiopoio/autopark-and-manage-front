import { Icon, Map, Marker } from 'leaflet'
import { IIcon, IObject, ITectical } from './server.types'

export interface IconModuleState {
  icons: Record<string, IIcon>
  leafletIcons: Record<string, Icon>
}
export interface MapModule {
  map: null | Map
}

export interface ObjectModule {
  objects: Record<string, IObject>
  objectMarkers: Record<string, Marker>
}

export interface TechnicalModule {
  technical: Record<string, ITectical>
  technicalMarker: Record<string, Marker>
}
