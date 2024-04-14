import axios from 'axios'
import { Marker, Map } from 'leaflet'
import { Module } from 'vuex'
import config from '../../config'
import { IObject, ITectical, ObjectModule, WithName } from '../../model'
import { computed } from 'vue'

import icon1 from '../../assets/758y1j9kmRM.jpg'
import icon2 from '../../assets/If_yiPkGnos.jpg'
import icon3 from '../../assets/PJgkMP9tWnY.jpg'
import icon4 from '../../assets/Wcol2u3vAiQ.jpg'
import icon5 from '../../assets/czNCiKQhOK4.jpg'
import icon6 from '../../assets/item_417.jpg'

export const object: Module<ObjectModule, ObjectModule> = {
  namespaced: true,
  state: {
    objects: {},
    objectMarkers: {},
  },
  getters: {
    objects(state) {
      return state.objects
    },
  },
  mutations: {
    create(state, data: IObject[]) {
      data.forEach((object) => {
        state.objectMarkers[object.name] = initMarker(object)
        state.objects[object.name] = object
      })
    },
    update(state, data: IObject[]) {
      data.forEach((object) => {
        state.objectMarkers[object.name] = initMarker(object)
        state.objects[object.name] = object
      })
    },
    remove(state, data: WithName[]) {
      data.forEach(({ name }) => {
        delete state.objectMarkers[name]
        delete state.objects[name]
      })
    },
  },
  actions: {
    addToMap(context, object: Marker) {
      const map: Map | null = context.rootGetters.map
      if (!map) {
        setTimeout(() => {
          if (map) {
            object.addTo(map)
            object.dragging?.disable()
          }
        }, 500)
        return
      }
      object.addTo(map)
    },

    async get(context, name: string) {
      if (import.meta.env.DEV) {
        const technical = computed(() =>
          Object.values<ITectical>(context.rootGetters['technical/technical'])
        )
        context.commit('create', [
          {
            icon: icon1,
            name: 'Объект 1',
            manager: 'Остапчук Семен Тимофеевич',
            location: [55.751574, 37.573856],
            complete_status: 10,
            technical: technical.value,
            edited_date: new Date(),
          },
          {
            icon: icon2,
            name: 'Объект 2',
            manager: 'Остапчук Семен Тимофеевич',
            location: [55.751574, 37.573856],
            complete_status: 20,
            technical: technical.value,
            edited_date: new Date(),
          },
          {
            icon: icon3,
            name: 'Объект 3',
            manager: 'Остапчук Семен Тимофеевич',
            location: [55.751574, 37.573856],
            complete_status: 30,
            technical: technical.value,
            edited_date: new Date(),
          },
          {
            icon: icon4,
            name: 'Объект 4',
            manager: 'Остапчук Семен Тимофеевич',
            location: [55.751574, 37.573856],
            complete_status: 40,
            technical: technical.value,
            edited_date: new Date(),
          },
          {
            icon: icon5,
            name: 'Объект 5',
            manager: 'Остапчук Семен Тимофеевич',
            location: [55.751574, 37.573856],
            complete_status: 50,
            technical: technical.value,
            edited_date: new Date(),
          },
          {
            icon: icon6,
            name: 'Объект 6',
            manager: 'Остапчук Семен Тимофеевич',
            location: [55.751574, 37.573856],
            complete_status: 60,
            technical: technical.value,
            edited_date: new Date(),
          },
          {
            icon: icon3,
            name: 'Объект 7',
            manager: 'Остапчук Семен Тимофеевич',
            location: [55.751574, 37.573856],
            complete_status: 70,
            technical: technical.value,
            edited_date: new Date(),
          },
          {
            icon: icon4,
            name: 'Объект 8',
            manager: 'Остапчук Семен Тимофеевич',
            location: [55.751574, 37.573856],
            complete_status: 80,
            technical: technical.value,
            edited_date: new Date(),
          },
          {
            icon: icon5,
            name: 'Объект 9',
            manager: 'Остапчук Семен Тимофеевич',
            location: [55.751574, 37.573856],
            complete_status: 90,
            technical: technical.value,
            edited_date: new Date(),
          },
          {
            icon: icon6,
            name: 'Объект 10',
            manager: 'Остапчук Семен Тимофеевич',
            location: [55.751574, 37.573856],
            complete_status: 100,
            technical: technical.value,
            edited_date: new Date(),
          },
        ])
        return
      }

      const { data } = await axios.get<IObject[]>(`${config.baseUrl}/object`, {
        params: { name },
      })

      context.commit('create', data)
    },
  },
}

function initMarker(object: IObject) {
  const marker = new Marker(object.location)
  marker.bindTooltip(`<div>${object.name}</div>`)
  return marker
}
