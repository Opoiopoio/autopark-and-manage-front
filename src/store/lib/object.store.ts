import axios from 'axios'
import { Marker, Map } from 'leaflet'
import { Module } from 'vuex'
import config from '../../config'
import { IObject, ObjectModule } from '../../model'

export const objectModule: Module<ObjectModule, ObjectModule> = {
  state: {
    objects: {},
  },
  getters: {
    objects(state) {
      return state.objects
    },
  },
  mutations: {
    addObjects(state, objects: Record<string, Marker>) {
      const objectNames = Object.keys(objects)

      objectNames.forEach((objectName) => {
        state.objects[objectName] = objects[objectName]
      })
    },
  },
  actions: {
    addObjectToMap(context, object: Marker) {
      const map: Map | null = context.rootGetters.map
      if (!map) {
        setTimeout(() => {
          if (map) object.addTo(map)
        }, 500)
        return
      }
      object.addTo(map)
    },

    async getObjects(context) {
      const { data } = await axios.get<IObject[]>(`${config.baseUrl}/object/list`)

      const objects: Record<string, Marker> = {}

      data.forEach((object) => {
        objects[object.name] = new Marker(object.location).bindTooltip(
          `<div>${object.name}</div>`
        )

        context.dispatch('addObjectToMap', objects[object.name])
      })

      context.commit('addObjects', objects)
    },

    async getObject(context, name: string) {
      const { data: object } = await axios.get<IObject>(`${config.baseUrl}/object`, {
        params: { name },
      })

      const objects: Record<string, Marker> = {}

      objects[object.name] = new Marker(object.location).bindTooltip(
        `<div>${object.name}</div>`
      )

      context.dispatch('addObjectToMap', objects[object.name])
      context.commit('addObjects', objects)
    },
  },
}
