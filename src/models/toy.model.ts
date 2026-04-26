export interface ToyModel {
    toyId: number
    name: string
    /* permalink: string */
    description: string

    targetGroup: 'svi' | 'dečak' | 'devojčica'
    productionDate: string
    price: number
    imageUrl: string
    ageGroup: AgeGroup
    type: ToyType
}
export interface ToyType {
    typeId: number,
    name: string,
    description: string
}

export interface AgeGroup {
    ageGroupId: number,
    name: string,
    description: string
}