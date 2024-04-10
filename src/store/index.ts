import { Map, Icon, Marker } from 'leaflet'
import { Store } from 'vuex'
import * as modules from './modules'

export interface MainState {
  map: Map | null
  icons: Record<string, Icon>
  objects: Record<string, Marker>
}

export default new Store<MainState>({
  modules: modules,
})
