import { OrderModel } from "../../models/order.model";
import { UserModel } from "../../models/user.model";

const USERS = 'users'
const ACTIVE = 'active'

export class AuthService {
    static getUsers(): UserModel[] {
        const baseUser: UserModel = {
            email: 'user@example.com',
            password: 'user123',
            firstName: 'John',
            lastName: 'Doe',
            address: 'Danijelova 32',
            phone: '0653093267',
            favorites: 'Slagalica',
            orders: []
        }
        if (localStorage.getItem(USERS) == null) {
            localStorage.setItem(USERS, JSON.stringify([baseUser]))
        }
        return JSON.parse(localStorage.getItem(USERS)!)
    }

    static login(email: string, password: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === email && u.password === password) {
                localStorage.setItem(ACTIVE, email)
                return true
            }
        }
        return false
    }

    static getActiveUser(): UserModel | null {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                return u
            }
        }
        return null
    }

    static updateActiveUser(newUserData: UserModel) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.firstName = newUserData.firstName
                u.lastName = newUserData.lastName
                u.address = newUserData.address
                u.phone = newUserData.phone
                u.favorites = newUserData.favorites
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static updateActiveUserPassword(newPassword: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.password = newPassword
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static logout() {
        localStorage.removeItem(ACTIVE)
    }

    static createOrder(order: Partial<OrderModel>, toyId: number) {
        order.toyId = toyId
        order.state = 'ordered'
        order.createdAt = new Date().toISOString()

        const users = this.getUsers()

        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                if (!u.orders) u.orders = []
                u.orders.push(order as OrderModel)
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static getOrderByState(state: 'ordered' | 'arrived' | 'cancelled') {
        const user = this.getActiveUser()
        if (!user || !user.orders) return [];
        return user.orders.filter((o: OrderModel) => o.state === state);
    }

    static cancelOrder(createdAt: string) {
        const users = this.getUsers();
        const activeEmail = localStorage.getItem(ACTIVE);
        for (let u of users) {
            if (u.email === activeEmail && u.orders) {
                for (let o of u.orders) {
                    if (o.state === 'ordered' && o.createdAt === createdAt) {
                        o.state = 'cancelled';
                    }
                }
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users));
    }

    static payOrders() {
        const users = this.getUsers();
        const activeEmail = localStorage.getItem(ACTIVE);
        for (let u of users) {
            if (u.email === activeEmail && u.orders) {
                for (let o of u.orders) {
                    if (o.state === 'ordered') {
                        o.state = 'arrived';
                    }
                }
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users));
    }
}