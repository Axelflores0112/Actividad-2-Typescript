import Users from '../models/user.model'
import {User,UserModel} from '../types/user.type'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'

class UserService {
    async create(user:User){
        const newUser = await Users.create({user}).catch((error) =>{
            console.log('could not save user',error)
        })
    }

    async findAll(){//jala
        const users = await Users.find().catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if(!users){
            throw boom.notFound('There are not scores')
        }

        return users
    }

    async findByEmail(email:string){
        const user = await Users.findOne({email}).catch((error) =>{
            console.log('Could not retrieve user info', error)
        })
        if(!user){
            throw boom.notFound('User not found')
        }
        return user
    }
}
export default UserService