import axios from 'axios'
import { Marker, Map } from 'leaflet'
import { Module } from 'vuex'
import config from '../../config'
import { IObject, ObjectModule, WithName } from '../../model'

export const object: Module<ObjectModule, ObjectModule> = {
  namespaced: true,
  state: {
    objects: {},
  },
  getters: {
    objects(state) {
      return state.objects
    },
  },
  mutations: {
    create(state, data: IObject[]) {
      data.forEach((object) => {
        state.objects[object.name] = initMarker(object)
      })
    },
    update(state, data: IObject[]) {
      data.forEach((object) => {
        state.objects[object.name] = initMarker(object)
      })
    },
    remove(state, data: WithName[]) {
      data.forEach(({ name }) => {
        delete state.objects[name]
      })
    },
  },
  actions: {
    addToMap(context, object: Marker) {
      console.log(object)
      const map: Map | null = context.rootGetters.map
      if (!map) {
        setTimeout(() => {
          if (map) object.addTo(map)
        }, 500)
        return
      }
      object.addTo(map)
    },

    async get(context, name: string) {
      const { data } = await axios.get<IObject[]>(`${config.baseUrl}/object`, {
        params: { name },
      })

      const objects: Record<string, Marker> = {}

      data.forEach((object) => {
        objects[object.name] = new Marker(object.location).bindTooltip(
          `<div>${object.name}</div>`
        )

        context.dispatch('addToMap', objects[object.name])
      })

      context.commit('create', objects)
    },
  },
}

function initMarker(object: IObject) {
  const marker = new Marker(object.location)
  marker.bindTooltip(`<div>${object.name}</div>`)
  return marker
}
