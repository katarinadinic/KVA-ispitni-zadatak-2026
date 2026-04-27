export interface ToyModel {
    toyId: number
    name: string
    description: string

    targetGroup: 'svi' | 'dečak' | 'devojčica'
    productionDate: string
    price: number
    imageUrl: string
    ageGroup: AgeGroup
    type: ToyType

    rating: number
    status?: 'rezervisano' | 'pristiglo' | 'otkazano'
    userReview?: string;
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