import { Marker, Icon } from 'leaflet'
import { AuthState, IObject } from '@/model'
import { MarkerIcon } from './marker.icon'
import { _UnwrapAll, Store } from 'pinia'

export class MarkerToObject extends Marker {
  constructor(
    object: IObject,
    authState: Store<
      'auth',
      _UnwrapAll<Pick<AuthState, keyof AuthState>>,
      Pick<AuthState, never>,
      Pick<AuthState, never>
    >
  ) {
    const mainColor = authState.name == object.manager ? authState.markerColor : undefined

    super(object.location, {
      icon: new Icon({
        iconUrl: new MarkerIcon({ mainColor }) as string,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      }),
    })
    this.bindTooltip(`
<div class="card-object">
  <div class="card-object__image-container">
    <img src="${object.icon}" alt="${object.name}" />
    <h4>${object.name}</h4>
  </div>
  <h4 class="card-object__manager">Руководитель: ${object.manager}</h4>
  <p class="card-object__edited_date">
    Дата изменения: ${object.edited_date?.toLocaleString()}
  </p>
</div>`)
  }
}
