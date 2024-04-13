import axios from 'axios'
import { Icon } from 'leaflet'
import { Module } from 'vuex'
import config from '../../config'
import { IconModuleState, IIcon, WithName } from '../../model'

export const iconModule: Module<IconModuleState, IconModuleState> = {
  namespaced: true,
  state: { icons: {} },
  getters: {
    icons(state) {
      return state.icons
    },
  },
  mutations: {
    create(state, data: IIcon[]) {
      data.forEach((icon) => {
        state.icons[icon.name] = initIcon(icon)
      })
    },
    update(state, data: IIcon[]) {
      data.forEach((icon) => {
        state.icons[icon.name] = initIcon(icon)
      })
    },
    remove(state, data: WithName[]) {
      data.forEach(({ name }) => {
        delete state.icons[name]
      })
    },
  },
  actions: {
    async get(context, name: string) {
      const { data } = await axios.get<IIcon[]>(`${config.baseUrl}/icon`, {
        params: { name },
      })

      context.commit('create', data)
    },
  },
}

function initIcon(icon: IIcon) {
  return new Icon({
    iconUrl: icon.url,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })
}
