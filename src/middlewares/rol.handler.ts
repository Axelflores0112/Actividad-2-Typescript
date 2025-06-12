import { Request, Response, NextFunction } from 'express'

export function checkRole(roles: string[]) {
  return (req: any, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta' })
    }
    next()
  }
}