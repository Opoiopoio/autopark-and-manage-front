import axios from 'axios'

import config from '../../config'
import { IIcon, WithName } from '../../model'
import icon1 from '../../assets/758y1j9kmRM.jpg'
import icon2 from '../../assets/If_yiPkGnos.jpg'
import icon3 from '../../assets/PJgkMP9tWnY.jpg'
import icon4 from '../../assets/Wcol2u3vAiQ.jpg'
import icon5 from '../../assets/czNCiKQhOK4.jpg'
import icon6 from '../../assets/item_417.jpg'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useIconStore = defineStore('icon', () => {
  const items = reactive<Record<string, IIcon>>({})

  async function get(name?: string) {
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

    create(data)
  }

  function create(data: IIcon[]) {
    data.forEach((icon) => {
      items[icon.name] = icon
    })
  }

  function update(data: IIcon[]) {
    data.forEach((icon) => {
      items[icon.name] = icon
    })
  }
  function remove(data: WithName[]) {
    data.forEach(({ name }) => {
      delete items[name]
    })
  }

  return { items, get, create, update, remove }
})
