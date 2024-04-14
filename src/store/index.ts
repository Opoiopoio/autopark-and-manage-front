import { Map, Icon, Marker } from 'leaflet'
import { Module, Store } from 'vuex'
import * as modules from './modules'

export interface MainState {
  map: Map | null
  icons: Record<string, Icon>
  objects: Record<string, Marker>
}

export default new Store<MainState>({
  modules: modules as unknown as Record<string, Module<MainState, MainState>>,
})
