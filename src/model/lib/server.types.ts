export interface IIcon {
  name: string
  url: string
}

export interface IObject {
  icon: string
  name: string
  manager: string
  technical: ITectical[]
  location: [number, number]
  complete_status: number
  owner: boolean
  edited_date: Date
}

export interface ITectical {
  id: number
  mark: string
  icon: string
  number: string
  driver: string
  owner: boolean
  location: [number, number]
}

export interface IEmployee {
  id: number
  name: string
  position: string
  marker_color: string
}

export interface WithName {
  name: string
}

export interface WithId {
  id: number
}

export interface WithNumber {
  number: string
}
