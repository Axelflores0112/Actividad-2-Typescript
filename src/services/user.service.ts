import Users from '../models/user.model'
import { User, UserModel } from '../types/user.type'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'

class UserService {
  // getToClientUser(user: Partial<User>): Partial<User> {
  //   //Aqui podemos sobreescribir las propiedades que queremos excluir
  //   //asignandoles undefined
  //   return { ...user, password: undefined }
  // }

  async create(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = await Users.create({
      ...user,
      password: hashedPassword
    }).catch((error) => {
      console.log('Could not save user', error)
    })

    if (!newUser) {
      throw boom.badRequest('Could not create user')
    }

    return newUser
  }

  async findByEmail(email: string) {
    const user = await Users.findOne({ email }).catch((error) => {
      console.log('Could not retrieve user info', error)
    })

    if (!user) {
      throw boom.notFound('User not found')
    }

    return user
  }
  async findAll(){
    const user = await Users.find()
    .catch((error) => {
      console.log('Error while connecting to the DB', error)
    })
    if (!user) {
      throw boom.notFound('Users not found')
    }
    return user
  }
  async deleteAllusers(){
    const user = await Users.deleteMany({}).catch((error) => {
      console.log('Could not retrieve user info', error)
    })

    if (!user) {
      throw boom.notFound('Users not found')
    }

    return "all users deleted"
  }
  async findById(id: string) {
    const user = await Users.findById(id).catch((error) => {
      console.log('Could not retrieve user info', error)
    })

    if (!user) {
      throw boom.notFound('User not found')
    }

    return user
  }
}
export default UserService

