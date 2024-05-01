import { Marker, Icon } from 'leaflet'
import { ITectical } from '@/model'
import { MarkerIcon } from './marker.icon'

export class MarkerToTecnical extends Marker {
  constructor(technical: ITectical) {
    super(technical.location, {
      icon: new Icon({
        className: 'marker-icon',
        iconUrl: new MarkerIcon() as string,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      }),
    })
  }
}
