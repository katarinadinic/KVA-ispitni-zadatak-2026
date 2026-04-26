import { OrderModel } from "./order.model";

export interface UserModel {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    favorites: string,
    orders: OrderModel[]
}