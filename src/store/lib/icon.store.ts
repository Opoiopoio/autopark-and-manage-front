import axios from 'axios'
import { Icon } from 'leaflet'
import { Module } from 'vuex'
import config from '../../config'
import { IconModuleState, IIcon } from '../../model'

export const iconModule: Module<IconModuleState, IconModuleState> = {
  state: { icons: {} },
  getters: {
    icons(state) {
      return state.icons
    },
  },
  mutations: {
    addIcons(context, icons: Record<string, Icon>) {
      const iconNames = Object.keys(icons)

      iconNames.forEach((iconName) => {
        context.icons[iconName] = icons[iconName]
      })
    },
  },
  actions: {
    async getIcons(context) {
      const { data } = await axios.get<IIcon[]>(`${config.baseUrl}/icon/list`)

      const icons: Record<string, Icon> = {}

      data.forEach((icon) => {
        icons[icon.name] = new Icon({
          iconUrl: icon.url,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        })
      })

      context.commit('addIcons', icons)
    },
    async getIcon(context, name: string) {
      const { data: icon } = await axios.get<IIcon>(`${config.baseUrl}/icon`, {
        params: { name },
      })

      const icons: Record<string, Icon> = {
        [name]: new Icon({
          iconUrl: icon.url,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        }),
      }

      context.commit('addIcons', icons)
    },
  },
}
