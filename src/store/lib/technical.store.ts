import axios from 'axios'
import { ActionContext, Module } from 'vuex'
import config from '../../config'
import { ITectical, TechnicalState, WithNumber } from '../../model'
import { MarkerIcon, MarkerToTecnical } from '../../utils'
import { Marker } from 'leaflet'

export const technical: Module<TechnicalState, TechnicalState> = {
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
    addMarker(state, { marker, number }: { marker: Marker; number: string }) {
      state.technicalMarker[number] = marker
    },
    addTechnic(state, technic: ITectical) {
      state.technical[technic.number] = technic
    },
    removeMarker(state, markerName: string) {
      delete state.technicalMarker[markerName]
    },
    removeTechnic(state, technicalNumber: string) {
      delete state.technical[technicalNumber]
    },
  },
  actions: {
    async get(context, name: string) {
      let tech: ITectical[] = []

      if (import.meta.env.DEV) {
        tech = [
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
        ]
      }

      tech =
        tech ??
        (await axios
          .get<ITectical[]>(`${config.baseUrl}/tecnical`, { params: { name } })
          .then((res) => res.data))

      context.dispatch('create', tech)
    },

    create(context, data: ITectical[]) {
      data.forEach((technic) => {
        onAddOrChangeTechnic(context, technic)
      })
    },
    update(context, data: ITectical[]) {
      data.forEach((technic) => {
        context.dispatch('removeMarker', context.state.technicalMarker[technic.number], {
          root: true,
        })
        onAddOrChangeTechnic(context, technic)
      })
    },
    remove(context, data: WithNumber[]) {
      data.forEach(({ number }) => {
        context.dispatch('removeMarker', context.state.technicalMarker[number], {
          root: true,
        })
        context.commit('removeMarker', number)
        context.commit('removeTechnic', number)
      })
    },
  },
}

function onAddOrChangeTechnic(
  context: ActionContext<TechnicalState, TechnicalState>,
  tectical: ITectical
) {
  const marker = new MarkerToTecnical(tectical)
  context.commit('addMarker', { marker, number: tectical.number })
  context.commit('addTechnic', tectical)

  context.dispatch('addMarker', marker, { root: true })
}
