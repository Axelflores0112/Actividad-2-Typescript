import  express, { application }  from "express"
import {Anime} from '../types/anime.type'
import AnimeService from '../services/anime.service'

const router = express.Router()
const service = new AnimeService()


router.post('/',async (req,res) =>{//jala
    //Body se usa para todos los elementos (datos del request)
   const anime:Anime = req.body 
   const newAnime = await service.create(anime)

   //Respuesat de anime creado
   res.status(201).json(newAnime)
})

router.get('/', async (req, res, next) => {//jala
    try {
        if (req.query.name) {
            const { name } = req.query;
            const anime = await service.findByName(name as string);
            res.status(200).json(anime);
        } else if (req.query.score) {
            const { score } = req.query;
            const anime = await service.findByScore(Number(score as string));
            res.status(200).json(anime);
        } else {
            const animes = await service.findAll();
            res.status(200).json(animes);
        }
    } catch (error) {
        console.error("Error:", error);
        next(error);
    }
});


router.delete('/',async (req,res,next) =>{//jala
    try{
        const {name} = req.query
        const anime = await service.deleteByName(name as string)
        res.status(200).json(anime);
    }catch(error){
        next(error)
    }
})

router.patch('/',async (req,res,next) => {//jala
    try{
        const {name} = req.query
        const anime = await service.updateByName(name as string,req.body)
        res.status(200).json(anime);
    }catch(error){
        next(error)
    }
})

export default router