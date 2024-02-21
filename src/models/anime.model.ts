//importar la clase model y schema de biblioteca mongoose
import {Schema,model} from 'mongoose'
import {Anime,AnimeModel} from '../types/anime.type'

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
    score:{
        type:Number,
        required:true,
        trim:true
    }
})
export default model('Anime',Animes)
/*Con esto hacemos que otros modulos tengan acceso al modelo Score en este caso*/

/*paso 2: se define el modelo de la base de datos*/