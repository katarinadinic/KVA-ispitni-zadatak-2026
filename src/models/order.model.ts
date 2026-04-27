export interface OrderModel {
    id?: number,
    userId: string,
    toyId: number,
    toyName: string,
    type: string,
    age: string,
    targetGroup: string,
    quantity: number,
    totalPrice: number,
    address: string,
    phone: string,
    note?: string,
    date: string,
    createdAt: string,
    rating: number,
    review: string,
    state: 'ordered' | 'arrived' | 'cancelled'
}