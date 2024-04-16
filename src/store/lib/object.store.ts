import axios from 'axios'
import { Marker } from 'leaflet'
import { ActionContext, Module } from 'vuex'
import config from '../../config'
import { IObject, ITectical, ObjectState, WithName } from '../../model'
import { computed } from 'vue'

import icon1 from '../../assets/758y1j9kmRM.jpg'
import icon2 from '../../assets/If_yiPkGnos.jpg'
import icon3 from '../../assets/PJgkMP9tWnY.jpg'
import icon4 from '../../assets/Wcol2u3vAiQ.jpg'
import icon5 from '../../assets/czNCiKQhOK4.jpg'
import icon6 from '../../assets/item_417.jpg'

import { MarkerToObject } from '../../utils'

export const object: Module<ObjectState, ObjectState> = {
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
    addMarker(state, { marker, name }: { marker: Marker; name: string }) {
      state.objectMarkers[name] = marker
    },
    addObject(state, object: IObject) {
      state.objects[object.name] = object
    },
    removeMarker(state, markerName: string) {
      delete state.objectMarkers[markerName]
    },
    removeObject(state, objectName: string) {
      delete state.objects[objectName]
    },
  },
  actions: {
    async get(context, name: string) {
      let data: IObject[] = []
      if (import.meta.env.DEV) {
        const technical = computed(() =>
          Object.values<ITectical>(context.rootGetters['technical/technical'])
        )
        data = [
          {
            icon: icon1,
            name: 'Объект 1',
            manager: 'Остапчук Семен Тимофеевич',
            location: [56, 37.574],
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
        ]
      }

      data =
        data ??
        (await axios
          .get<IObject[]>(`${config.baseUrl}/object`, {
            params: { name },
          })
          .then((res) => res.data))

      context.dispatch('create', data)
    },

    create(context, data: IObject[]) {
      data.forEach((object) => {
        onAddOrChangeObject(context, object)
      })
    },
    update(context, data: IObject[]) {
      data.forEach((object) => {
        context.dispatch('removeMarker', context.state.objectMarkers[object.name], {
          root: true,
        })

        onAddOrChangeObject(context, object)
      })
    },
    remove(context, data: WithName[]) {
      data.forEach(({ name }) => {
        context.dispatch('removeMarker', context.state.objectMarkers[name], {
          root: true,
        })

        context.commit('removeMarker', name)
        context.commit('removeObject', name)
      })
    },
  },
}

function onAddOrChangeObject(
  context: ActionContext<ObjectState, ObjectState>,
  object: IObject
) {
  const marker = new MarkerToObject(object)
  context.commit('addMarker', { marker, name: object.name })
  context.commit('addObject', object)
  context.dispatch('addMarker', marker, { root: true })
}
