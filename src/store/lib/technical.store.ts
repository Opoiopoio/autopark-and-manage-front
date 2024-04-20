import axios from 'axios'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

import config from '@/config'
import { ITectical, TechnicalState, WithNumber } from '@/model'
import { MarkerToTecnical } from '@/utils'
import { Marker } from 'leaflet'
import belaz from '@/assets/belaz.jpg'
import kran from '@/assets/kran.jpeg'
import { useMapStore } from './map.store'

export const useTchicalStore = defineStore('technical', () => {
  const items = reactive<TechnicalState['technical']>({})
  const markers = reactive<TechnicalState['technicalMarker']>({})
  const mapStore = useMapStore()

  function addMarker({ marker, number }: { marker: Marker; number: string }) {
    markers[number] = marker
  }
  function addTechnic(technic: ITectical) {
    items[technic.number] = technic
  }
  function removeMarker(markerName: string) {
    delete markers[markerName]
  }
  function removeTechnic(technicalNumber: string) {
    delete items[technicalNumber]
  }

  async function get(name?: string) {
    let tech: ITectical[] = []

    if (import.meta.env.DEV) {
      tech = [
        {
          id: 1,
          driver: 'Остапчук Семен Тимофеевич',
          icon: belaz,
          mark: 'Джон Бот 008',
          location: [55.751574, 37.573856],
          number: 'X123QW36',
        },
        {
          id: 2,
          driver: 'Остапчук Семен Тимофеевич',
          icon: kran,
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

    create(tech)
  }

  function create(data: ITectical[]) {
    data.forEach((technic) => {
      onAddOrChangeTechnic(technic)
    })
  }

  function update(data: ITectical[]) {
    data.forEach((technic) => {
      if (markers[technic.number]) {
        mapStore.removeMarker(markers[technic.number])
      }
      onAddOrChangeTechnic(technic)
    })
  }

  function remove(data: WithNumber[]) {
    data.forEach(({ number }) => {
      if (markers[number]) {
        mapStore.removeMarker(markers[number])
      }
      removeMarker(number)
      removeTechnic(number)
    })
  }

  function onAddOrChangeTechnic(tectical: ITectical) {
    const marker = new MarkerToTecnical(tectical)
    addMarker({ marker, number: tectical.number })
    addTechnic(tectical)

    mapStore.addMarker(marker)
  }

  return { items, markers, get, create, update, remove }
})
