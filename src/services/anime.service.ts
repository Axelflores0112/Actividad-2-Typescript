//importamos modelo y tipo de datos
import Animes from '../models/anime.model'
import {Anime} from '../types/anime.type'
//importamos boom para manejar errores
import boom  from '@hapi/boom'

//
class AnimeService{
    async create (anime:Anime){
        const newAnime= await Animes.create(anime).catch((error) => {
            console.log('Could not save score', error)
        })
        return newAnime
    }

    async findAll(){
        const animes = await Animes.find().catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if(!animes){
            throw boom.notFound('There are not scores')
        }

        return animes
    }

    async findByName(name: string){
        const animeName = await Animes.findById(name).catch((error) =>{
            console.log('Error while connecting to the DB', error)
        })
        if(!animeName){
            throw boom.notFound('Anime not found')
        }
    }
    async findByScore( score: number){
        const animeScore = await Animes.findById(score).catch((error) =>{
            console.log('Error while connecting to the DB', error)
        })
        if(!animeScore){
            throw boom.notFound('There are not animes with this rating')
        }
    }
    async deleteByName(name: string){
        const anime = await Animes.findOneAndDelete({name}).catch((error)=>{
            console.log('Error while connecting to the DB', error)
        })
        if(!anime){
            throw boom.notFound('there are no animes with that name')
        }
    }

    async updateByName(name:string, anime:Anime){
        const animeUpdate = await Animes.findOneAndUpdate({name},anime).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if(!animeUpdate){/*<-- Comprobamos si existe el anime con ese nombre*/
            throw boom.notFound('There are no animes with that name')
        }
        return animeUpdate;//Retornamos para que el usuario sepa que se actualizo
    }
}

export default AnimeService

/*paso 3: Definimos la clase que va a contener los metodos para manipular la base de datos*/
