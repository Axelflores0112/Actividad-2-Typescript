import express from 'express'
import passport from 'passport'
import UserService from '../services/user.service'
import { UserRequestType as RequestType } from '../types/user.type'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import { sendLoginVerificationEmail } from '../utils/email'

const router = express.Router()
const service = new UserService()

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req: RequestType, res, next) => {
    try {
      const { user } = req
      // Genera un token temporal de verificación (válido por pocos minutos)
      const tempToken = jwt.sign({ sub: user.id, role: user.role ,action: 'verify-login' }, config.jwtSecret, { expiresIn: '10m' })
      const yesUrl = `http://localhost:5173/verify-login?token=${tempToken}&confirm=yes`
      const noUrl = `http://localhost:5173/verify-login?token=${tempToken}&confirm=no`
      await sendLoginVerificationEmail(user.email, yesUrl, noUrl)
      res.status(200).json({ message: 'Se ha enviado un correo de verificación' })
    } catch (error) {
      next(error)
    }
  }
)

router.get('/verify-login', async (req, res) => {
  const { token, confirm } = req.query
  try {
    // Verifica el token temporal
    const payload = jwt.verify(token, config.jwtSecret)

    if (confirm === 'yes') {
      // Busca el usuario en la base de datos para obtener el rol y otros datos
      const user = await service.findById(payload.sub)
      // Genera el JWT real para el usuario, incluyendo el rol
      const realToken = jwt.sign(
        { sub: user.id, email: user.email, name: user.name, role: user.role },
        config.jwtSecret,
        { expiresIn: '1d' }
      )
      // Devuelve el token al frontend
      return res.status(200).json({ token: realToken })
    } else {
      return res.status(401).json({ message: 'Inicio de sesión cancelado' })
    }
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido o expirado' })
  }
})

export default router
