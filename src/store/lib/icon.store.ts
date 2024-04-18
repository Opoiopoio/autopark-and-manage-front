import axios from 'axios'
import { Module } from 'vuex'

import config from '../../config'
import { IconState, IIcon, WithName } from '../../model'
import icon1 from '../../assets/758y1j9kmRM.jpg'
import icon2 from '../../assets/If_yiPkGnos.jpg'
import icon3 from '../../assets/PJgkMP9tWnY.jpg'
import icon4 from '../../assets/Wcol2u3vAiQ.jpg'
import icon5 from '../../assets/czNCiKQhOK4.jpg'
import icon6 from '../../assets/item_417.jpg'

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
      let data: IIcon[] = []
      if (import.meta.env.DEV) {
        data = [
          { name: 'Объект 1', url: icon1 },
          { name: 'Объект 2', url: icon2 },
          { name: 'Объект 3', url: icon3 },
          { name: 'Объект 4', url: icon4 },
          { name: 'Объект 5', url: icon5 },
          { name: 'Объект 6', url: icon6 },
        ]
      }

      data =
        data ??
        (await axios
          .get<IIcon[]>(`${config.baseUrl}/object`, {
            params: { name },
          })
          .then((res) => res.data))

      context.dispatch('create', data)
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
