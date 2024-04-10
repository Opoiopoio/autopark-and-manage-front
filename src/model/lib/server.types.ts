export interface IIcon {
  name: string
  url: string
  // location: [number, number]
}

export interface IObject {
  name: string
  manager: string
  technical: ITectical[]
  location: [number, number]
}

export interface ITectical {
  mark: string
  icon: string
  driver: string
}

export interface IEmployee {
  name: string
  position: string
}
