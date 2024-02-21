import  express  from "express"
import {Anime} from '../types/anime.type'
import AnimeService from '../services/anime.service'

const router = express.Router()
const service = new AnimeService()

router.post('/',async (req,res) =>{
    //Body se usa para todos los elementos (datos del request)
   const anime:Anime = req.body 
   const newAnime = await service.create(anime)

   //Respuesat de anime creado
   res.status(201).json(newAnime)
})

router.get('/',async (req,res,next) => {
    try{
        const animes = await service.findAll()
        //Respuesta de animes encontrados
        res.status(200).json(animes)
    }catch(error){
        next(error)
    }
})

router.get('/:name',async (req,res,next) => {
    try{
        //Params se usa para elementos especificos
        const anime = await service.findByName(req.params.name)
        //Respuesta de animes encontrados
        res.status(200).json(anime)
    }catch(error){
        next(error)
    }
})

router.get('/:score',async (req,res,next) => {
    try{
        //Params se usa para elementos especificos
        const anime = await service.findByScore(Number(req.params.score))
        //Respuesta de animes encontrados
        res.status(200).json(anime)
    }catch(error){
        next(error)
    }
})

router.delete('/:name',async (req,res,next) =>{
    try{
        const anime = await service.deleteByName(req.params.name)
    }catch(error){
        next(error)
    }
})

router.patch('/:name',async (req,res,next) => {
    try{
        const anime = await service.updateByName(req.params.name,req.body)
    }catch(error){
        next(error)
    }
})

export default router