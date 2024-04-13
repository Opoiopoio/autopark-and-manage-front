export interface IResponse<Data extends object = object> {
  resource: keyof typeof Resource
  type: keyof typeof MessageType
  data: Data[]
}

export class ServerResponse<Data extends object = object> implements IResponse<Data> {
  resource: 'object' | 'icon' | 'tectical' | 'employee'
  type: 'create' | 'update' | 'remove'
  data: Data[]
  constructor(response: IResponse<Data>) {
    if (!Resource[response.resource]) {
      const possibleValues = Object.keys(Resource).join(', ')
      throw new Error(`Incorrect Resource. Possible values: ${possibleValues}`)
    } else if (!MessageType[response.type]) {
      const possibleValues = Object.keys(MessageType).join(', ')
      throw new Error(`Incorrect MessageType. Possible values: ${possibleValues}`)
    }
    this.resource = response.resource
    this.type = response.type
    this.data = response.data
  }
}

export const Resource = {
  icon: true,
  object: true,
  tectical: true,
  employee: true,
} as const

export const MessageType = {
  create: true,
  update: true,
  remove: true,
} as const
