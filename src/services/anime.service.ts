//importamos modelo y tipo de datos
import { ObjectId } from 'mongoose'
import Animes from '../models/anime.model'
import { Anime } from '../types/anime.type'
//importamos boom para manejar errores
import boom from '@hapi/boom'

//
class AnimeService {
    /* async create (anime:Anime){//jala
         const newAnime= await Animes.create(anime).catch((error) => {
             console.log('Could not save score', error)
         })
         return newAnime
     }*/
    async create(anime: Anime, userId: ObjectId) {//Creacion de animes
        const newAnime = await Animes.create({
            ...anime,
            user: userId
        }).catch((error) => {
            console.log('Could not save anime', error)

        })
        const existingAnime = await this.findbyId((newAnime as any)._id)
        return existingAnime.populate([{ path: 'user',select: 'name email', strictPopulate: false }])//Retornamos el anime con el usuario que lo creo
    }
    async findAll() {//Traer todos los animes de todos los usuarios
        const animes = await Animes.find()
            .populate([{ path: 'user',select: 'name email', strictPopulate: false }])
            .catch((error) => {
                console.log('Error while connecting to the DB', error)
            })
        if (!animes) {
            throw boom.notFound('There are not scores')
        }

        return animes
    }
    async findByUserID(userId:string){//Encontrar los animes de cierto usuario en especifico en base a su id
        const userAnimes = await Animes.find({user:userId})
        .populate([{ path: 'user', select: 'name email', strictPopulate: false }])
        .catch((error)=>{
            console.log('Error while connecting to the DB', error)
        })
        if(!userAnimes){
            throw boom.notFound('There are not animes')
        }
        return userAnimes
    }

    async findByName(name: string) {//Encontrar animes por el nombre de este mismo
        const animeName = await Animes.find({ name }).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if (!animeName) {
            throw boom.notFound('Anime not found')
        }
        return animeName
    }
    async findByScore(score: number) {//Encontrar animes por el score 
        const animeScore = await Animes.find({ score }).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if (!animeScore) {
            throw boom.notFound('There are not animes with this rating')
        }
        return animeScore
    }
    async findByGenere(genere: string) {//Encontrar animes por el genero
        const animeGenere = await Animes.find({ genere }).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if (!animeGenere) {
            throw boom.notFound('There are not animes with this genere')
        }
        return animeGenere
    }
    async findbyId(id: string) {//Encontrar animes por el id de este mismo
        const anime = await Animes.findById(id).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if (!anime) {
            throw boom.notFound('Anime not found')
        }
        return anime
    }
    async deleteByName(name: string) {//Borrar anime por nombre
        const anime = await Animes.findOneAndDelete({ name }).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if (!anime) {
            throw boom.notFound('there are no animes with that name')
        }
        return "anime deleted " + name
    }
    async deleteAll() {//Borrar todos los animes
        const anime = await Animes.deleteMany().catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if (!anime) {
            throw boom.notFound('there are no animes to delete')
        }
        return "all anime deleted "
    }
    async updateByName(name: string, anime: Anime) {//Actualizar info de anime por nombre de este mismo
        const animeUpdate = await Animes.findOneAndUpdate({ name }, anime, { new: true }).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if (!animeUpdate) {
            throw boom.notFound('There are no animes with that name')
        }
        return animeUpdate;//Retornamos para que el usuario sepa que se actualizo
    }
}

export default AnimeService

/*paso 3: Definimos la clase que va a contener los metodos para manipular la base de datos*/
