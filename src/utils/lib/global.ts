import { Marker, Icon } from 'leaflet'
import { IObject, ITectical } from '../../model'
import { MarkerIcon } from './marker.icon'

export class MarkerToObject extends Marker {
  constructor(object: IObject) {
    super(object.location, {
      icon: new Icon({
        iconUrl: new MarkerIcon() as string,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      }),
    })
    this.bindTooltip(`<div>${object.name}</div>`)
  }
}

export class MarkerToTecnical extends Marker {
  constructor(technical: ITectical) {
    super(technical.location, {
      icon: new Icon({
        iconUrl: new MarkerIcon() as string,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      }),
    })
  }
}
