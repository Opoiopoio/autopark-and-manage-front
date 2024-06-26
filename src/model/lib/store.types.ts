import { Map, Marker } from 'leaflet'
import { Ref } from 'vue'
import { IIcon, IObject, ITectical } from './server.types'

export interface IconState {
  icons: Record<string, IIcon>
  // leafletIcons: Record<string, Icon>
}
export interface MapState {
  map: Ref<Map | undefined>
}

export interface ObjectState {
  objects: Record<string, IObject>
  markers: Record<string, Marker>
}

export interface TechnicalState {
  technical: Record<string, ITectical>
  technicalMarker: Record<string, Marker>
}

export interface AuthState {
  markerColor: Ref<string | undefined>
  name: Ref<string | undefined>
  accessToken: Ref<string | undefined>
  refreshToken: Ref<string | undefined>
}
