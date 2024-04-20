import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

import config from '@/config'
import { IObject, ITectical, ObjectState, WithName } from '@/model'

import icon1 from '@/assets/758y1j9kmRM.jpg'
import icon2 from '@/assets/If_yiPkGnos.jpg'
import icon3 from '@/assets/PJgkMP9tWnY.jpg'
import icon4 from '@/assets/Wcol2u3vAiQ.jpg'
import icon5 from '@/assets/czNCiKQhOK4.jpg'
import icon6 from '@/assets/item_417.jpg'

import { MarkerToObject } from '@/utils'
import { useTchicalStore } from './technical.store'
import { useMapStore } from './map.store'

export const useObjectStore = defineStore('object', () => {
  const items = reactive<ObjectState['objects']>({})
  const markers = reactive<ObjectState['markers']>({})

  const technicalStore = useTchicalStore()
  const mapStore = useMapStore()

  async function get(name?: string) {
    let data: IObject[] = []
    if (import.meta.env.DEV) {
      const technical = computed(() => Object.values<ITectical>(technicalStore.items))
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
          location: [54, 38],
          complete_status: 20,
          technical: technical.value,
          edited_date: new Date(),
        },
        {
          icon: icon3,
          name: 'Объект 3',
          manager: 'Остапчук Семен Тимофеевич',
          location: [53, 36],
          complete_status: 30,
          technical: technical.value,
          edited_date: new Date(),
        },
        {
          icon: icon4,
          name: 'Объект 4',
          manager: 'Остапчук Семен Тимофеевич',
          location: [55, 37.573856],
          complete_status: 40,
          technical: technical.value,
          edited_date: new Date(),
        },
        {
          icon: icon5,
          name: 'Объект 5',
          manager: 'Остапчук Семен Тимофеевич',
          location: [58, 37.573856],
          complete_status: 50,
          technical: technical.value,
          edited_date: new Date(),
        },
        {
          icon: icon6,
          name: 'Объект 6',
          manager: 'Остапчук Семен Тимофеевич',
          location: [56.751574, 39.573856],
          complete_status: 60,
          technical: technical.value,
          edited_date: new Date(),
        },
        {
          icon: icon3,
          name: 'Объект 7',
          manager: 'Остапчук Семен Тимофеевич',
          location: [51.751574, 34.573856],
          complete_status: 70,
          technical: technical.value,
          edited_date: new Date(),
        },
        {
          icon: icon4,
          name: 'Объект 8',
          manager: 'Остапчук Семен Тимофеевич',
          location: [54.751574, 31.573856],
          complete_status: 80,
          technical: technical.value,
          edited_date: new Date(),
        },
        {
          icon: icon5,
          name: 'Объект 9',
          manager: 'Остапчук Семен Тимофеевич',
          location: [50.751574, 30.573856],
          complete_status: 90,
          technical: technical.value,
          edited_date: new Date(),
        },
        {
          icon: icon6,
          name: 'Объект 10',
          manager: 'Остапчук Семен Тимофеевич',
          location: [60.751574, 30.573856],
          complete_status: 100,
          technical: technical.value,
          edited_date: new Date(),
        },
      ]
    }

    data =
      data ||
      (await axios
        .get<IObject[]>(`${config.baseUrl}/object`, {
          params: { name },
        })
        .then((res) => res.data))

    create(data)
  }

  function create(data: IObject[]) {
    data.forEach((object) => {
      onAddOrChangeObject(object)
    })
  }
  function update(data: IObject[]) {
    data.forEach((object) => {
      mapStore

      onAddOrChangeObject(object)
    })
  }
  function remove(data: WithName[]) {
    data.forEach(({ name }) => {
      if (markers[name]) mapStore.removeMarker(markers[name])

      delete markers[name]
      delete items[name]
    })
  }

  function onAddOrChangeObject(object: IObject) {
    const marker = new MarkerToObject(object)

    markers[object.name] = marker
    items[object.name] = object
    mapStore.addMarker(marker)
  }

  return { items, markers, get, create, update, remove }
})
