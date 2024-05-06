import { Marker, Icon } from 'leaflet'

import { AuthState, IObject } from '@/model'
import { MarkerIcon } from './marker.icon'
import { useObjectStore } from '@/store'

export class MarkerToObject extends Marker {
  constructor(object: IObject, authState: AuthState) {
    const mainColor = authState.name == object.manager ? authState.markerColor : undefined

    super(object.location, {
      icon: new Icon({
        iconUrl: new MarkerIcon({ mainColor }) as string,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      }),
      draggable: true,
    })

    this.on('dragstart', (e) => {
      console.log(e)
    })

    this.on('dragend', async (e) => {
      console.log(e.target._latlng)

      const objectStore = useObjectStore()

      const data = { ...object }
      const { lat, lng } = e.target._latlng
      data.location = [lat, lng]

      await objectStore.patch(data)
    })

    const form = `
    <div class="card-object card-object_popup">
      <div class="card-object__image-container">
        <div class="card-object__image-aligner">
          <img class="card-object__image" src="${object.icon}" alt="${object.name}" />
        </div>
      </div>
      <h4 class="card-object__name">Название: ${object.name}</h4>
      <h4 class="card-object__manager">Руководитель: ${object.manager}</h4>
      <p class="card-object__edited_date">
        Дата изменения: ${object.edited_date?.toLocaleString()}
      </p>
    </div>`
    this.bindTooltip(form)
    // this.bindPopup(form)
  }
}
