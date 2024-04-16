import { Map, Marker } from 'leaflet'
import { IIcon, IObject, ITectical } from './server.types'

export interface IconState {
  icons: Record<string, IIcon>
  // leafletIcons: Record<string, Icon>
}
export interface MapState {
  map: null | Map
}

export interface ObjectState {
  objects: Record<string, IObject>
  objectMarkers: Record<string, Marker>
}

export interface TechnicalState {
  technical: Record<string, ITectical>
  technicalMarker: Record<string, Marker>
}

export interface AuthState {
  markerColor: string | null
  name: string | null
  accessToken: string | null
  refreshToken: string | null
}
