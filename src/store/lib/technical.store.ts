import axios from 'axios'
import { Icon, Marker } from 'leaflet'
import { Module } from 'vuex'
import config from '../../config'
import { ITectical, TechnicalModule, WithNumber } from '../../model'
import { MarkerIcon } from '../../utils'

export const technical: Module<TechnicalModule, TechnicalModule> = {
  namespaced: true,
  state: { technical: {}, technicalMarker: {} },
  getters: {
    technical(state) {
      return state.technical
    },
    technicalMarker(state) {
      return state.technicalMarker
    },
  },
  mutations: {
    create(state, data: ITectical[]) {
      data.forEach((technic) => {
        state.technicalMarker[technic.number] = initMarker(technic)
        state.technical[technic.number] = technic
      })
    },
    update(state, data: ITectical[]) {
      data.forEach((technic) => {
        state.technicalMarker[technic.number] = initMarker(technic)
        state.technical[technic.number] = technic
      })
    },
    remove(state, data: WithNumber[]) {
      data.forEach(({ number }) => {
        delete state.technicalMarker[number]
        delete state.technicalMarker[number]
      })
    },
  },
  actions: {
    async get(context, name: string) {
      console.log(import.meta.env.DEV)
      if (import.meta.env.DEV) {
        context.commit('create', [
          {
            id: 1,
            driver: 'Остапчук Семен Тимофеевич',
            icon: new MarkerIcon() as string,
            mark: 'Джон Бот 008',
            location: [55.751574, 37.573856],
            number: 'X123QW36',
          },
          {
            id: 2,
            driver: 'Остапчук Семен Тимофеевич',
            icon: new MarkerIcon() as string,
            mark: 'Джон Бот 007',
            location: [55.751574, 37.573856],
            number: 'X123QW37',
          },
        ])
        return
      }

      const { data } = await axios.get<ITectical[]>(`${config.baseUrl}/tecnical`, {
        params: { name },
      })

      context.commit('create', data)
    },
  },
}

function initMarker(technical: ITectical) {
  return new Marker(technical.location, {
    icon: new Icon({ iconSize: [32, 32], iconAnchor: [16, 32] }),
  })
}
