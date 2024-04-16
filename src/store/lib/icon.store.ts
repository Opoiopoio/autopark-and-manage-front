import axios from 'axios'
import { Module } from 'vuex'
import config from '../../config'
import { IconState, IIcon, WithName } from '../../model'

export const icon: Module<IconState, IconState> = {
  namespaced: true,
  state: { icons: {} },
  getters: {
    icons(state) {
      return state.icons
    },
    // leafletIcons(state) {
    //   return state.leafletIcons
    // },
  },
  mutations: {
    addIcon(state, icon: IIcon) {
      state.icons[icon.name] = icon
    },
    rempveIcon(state, iconName: string) {
      delete state.icons[iconName]
    },
  },
  actions: {
    async get(context, name: string) {
      const { data } = await axios.get<IIcon[]>(`${config.baseUrl}/icon`, {
        params: { name },
      })

      context.dispatch('add', data)
    },

    create(context, data: IIcon[]) {
      data.forEach((icon) => {
        // context.state.leafletIcons[icon.name] = initIcon(icon)
        context.commit('addIcon', icon)
      })
    },
    update(context, data: IIcon[]) {
      data.forEach((icon) => {
        // context.leafletIcons[icon.name] = initIcon(icon)
        context.commit('addIcon', icon)
      })
    },
    remove(context, data: WithName[]) {
      data.forEach(({ name }) => {
        context.commit('addIcon', name)
      })
    },
  },
}

// function initIcon(icon: IIcon) {
//   return new Icon({
//     iconUrl: icon.url,
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//   })
// }
