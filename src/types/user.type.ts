import {Model} from 'mongoose'

export type User ={
    id?: string
    name: string
    email: string
    password: string
    addres: string
    phoneNumber: string
    createAt? :Date
    lastModified?:Date
}
export type UserModel = Model<User>