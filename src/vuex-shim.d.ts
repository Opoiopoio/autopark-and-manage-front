import { Store } from 'vuex'
import * as modules from './store/modules'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store
  }
}
