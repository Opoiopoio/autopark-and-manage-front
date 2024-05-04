import { PageNameEnum } from './page-name.enum'

export const PageTitleEnum: Record<PageNameEnum, string> = {
  [PageNameEnum.employeeList]: 'Работники',
  [PageNameEnum.equipmentList]: 'Оборудование',
  [PageNameEnum.iconList]: 'Иконки',
  [PageNameEnum.objectList]: 'Объекты',
  [PageNameEnum.tecnicalList]: 'Техника',
} as const
