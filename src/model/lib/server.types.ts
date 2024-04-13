export interface IIcon {
  name: string
  url: string
}

export interface IObject {
  name: string
  manager: string
  technical: ITectical[]
  location: [number, number]
}

export interface ITectical {
  id: number
  mark: string
  icon: string
  driver: string
}

export interface IEmployee {
  id: number
  name: string
  position: string
}

export interface WithName {
  name: string
}
