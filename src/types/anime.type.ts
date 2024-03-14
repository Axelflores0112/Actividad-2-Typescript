//importar la clase model de biblioteca mongoose
import { Model } from 'mongoose'/*<- sirve para definir y manipualr modelos de mongo */
import { User } from './user.type'
export type Anime = {/*<- Esto vendria siendo una tabla en Mysql */
    id?: string
    name: string
    description?: string
    genere?: string
    score: number
    user: User
}
export type AnimeModel = Model<Anime>
/*paso 1: se define el tipo de dato que se va a utilizar en la base de datos*/