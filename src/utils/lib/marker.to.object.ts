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
    this.bindTooltip(`<div>${object.name}</div>`)
  }
}
