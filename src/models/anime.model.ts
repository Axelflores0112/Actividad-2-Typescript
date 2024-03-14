//importar la clase model y schema de biblioteca mongoose
import {Schema,model} from 'mongoose'
import {Anime,AnimeModel} from '../types/anime.type'
import { USER_REFERENCE } from './user.model'

export const ANIME_REFERENCE = 'Anime'
//Instanciamos y definimos el esquema de la base de datos
const Animes = new Schema<Anime,AnimeModel>({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,//Se indexa patra mejorar la busqueda
        trim:true
    },
    description:{
        type:String,
        required:false,
        trim:true
    },
    genere:{
        type:String,
        required:false,
        trim:true
    },
    score:{
        type:Number,
        required:true,
        trim:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: USER_REFERENCE
      }
})
export default model(ANIME_REFERENCE,Animes)
/*Con esto hacemos que otros modulos tengan acceso al modelo Score en este caso*/

/*paso 2: se define el modelo de la base de datos*/