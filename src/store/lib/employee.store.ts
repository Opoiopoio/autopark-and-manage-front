import axios from 'axios'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

import config from '@/config'
import { IEmployee, WithId } from '@/model'

export const useEmployeeStore = defineStore('employee', () => {
  const items = reactive<Record<number, IEmployee>>({})

  async function get(name?: string) {
    let data: IEmployee[] = []
    if (import.meta.env.DEV) {
      data = [
        {
          id: 1,
          name: 'Иванов Иван Иванович',
          position: 'Руководитель',
          marker_color: '#123765',
        },
        {
          id: 2,
          name: 'Петров Перт Петрович',
          position: 'Руководитель',
          marker_color: '#123765',
        },
        {
          id: 3,
          name: 'Петров Иван Иванович',
          position: 'Руководитель',
          marker_color: '#123765',
        },
        {
          id: 4,
          name: 'Иванов Петр Иванович',
          position: 'Руководитель',
          marker_color: '#123765',
        },
        {
          id: 5,
          name: 'Иванов Иван Пертович',
          position: 'Руководитель',
          marker_color: '#123765',
        },
      ]
    }

    data =
      data ??
      (await axios
        .get<IEmployee[]>(`${config.baseUrl}/employee`, {
          params: { name },
        })
        .then((res) => res.data))

    create(data)
  }

  function create(data: IEmployee[]) {
    data.forEach((employee) => {
      items[employee.id] = employee
    })
  }

  function update(data: IEmployee[]) {
    data.forEach((employee) => {
      items[employee.id] = employee
    })
  }
  function remove(data: WithId[]) {
    data.forEach(({ id }) => {
      delete items[id]
    })
  }

  return { items, get, create, update, remove }
})
