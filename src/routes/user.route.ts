import express from 'express'
import { User, UserModel } from '../types/user.type'
import UserService from '../services/user.service'
import boom from '@hapi/boom'
import { PASSWORD_REGEX } from '../utils/constants'


const router = express.Router()
const service = new UserService()

router.post('/', async (req, res, next) => {
  try {
    //TODO: Validate user data coming from the request
    const user: User = req.body

    // Validar contraseña antes de guardar
    if (!PASSWORD_REGEX.test(user.password)) {
      return res.status(400).json({ error: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula y un carácter especial.' })
      
    }

    const newUser = await service.create(user)
    res.status(201).json({ user: newUser.toClient() })
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    if(req.query.email){
      const { email } = req.query
      const user = await service.findByEmail(email as string)
      console.log({ user })
      res.status(200).json({ user })
    }else{
      const users = await service.findAll()
      res.status(200).json({ users })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const users = await service.deleteAllusers()
    res.status(200).json({ users })
  } catch (error) {
    next(error)
  }
})

export default router


