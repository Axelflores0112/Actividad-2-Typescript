import express, { application } from "express"
import { Anime } from '../types/anime.type'
import AnimeService from '../services/anime.service'
import passport from 'passport'
import { JwtRequestType } from '../types/user.type'
import { ObjectId } from 'mongoose'

const router = express.Router()
const service = new AnimeService()


router.post('/', 
    passport.authenticate('jwt', { session: false }),
    async (req:JwtRequestType, res) => {//jala
    //Body se usa para todos los elementos (datos del request)
    const{
        user: {sub}
    } = req
    const anime: Anime = req.body
    const newAnime = await service.create(
        anime,
        sub as unknown as ObjectId
        )

    //Respuesat de anime creado
    res.status(201).json(newAnime)
})

router.get('/', 
passport.authenticate('jwt', { session: false }),
async (req:JwtRequestType, res, next) => {//jala
    try {
        if (req.query.name) {
            const { name } = req.query;
            const anime = await service.findByName(name as string);
            res.status(200).json(anime);
        } else if (req.query.score) {
            const { score } = req.query;
            const anime = await service.findByScore(Number(score as string));
            res.status(200).json(anime);
        }else if(req.query.genere){
            const {genere} = req.query
            const animes = await  service.findByGenere(genere as string)
            res.status(200).json(animes);
        }else {
            const animes = await service.findAll();
            res.status(200).json(animes);
        }
    } catch (error) {
        console.error("Error:", error);
        next(error);
    }
});


router.delete('/', 
passport.authenticate('jwt', { session: false }),
async (req:JwtRequestType, res, next) => {//jala
    try {
        if (req.query.name) {
            const { name } = req.query
            const anime = await service.deleteByName(name as string)
            res.status(200).json(anime);
        } else {
            const animes = await service.deleteAll();
                res.status(200).json(animes)
                return "Todos tus animes han sido borrados"
        }
    } catch (error) {
        next(error)
    }
})

router.patch('/', 
passport.authenticate('jwt', { session: false }),
async (req:JwtRequestType, res, next) => {//jala
    try {
        const { name } = req.query
        const anime = await service.updateByName(name as string, req.body)
        res.status(200).json(anime);
    } catch (error) {
        next(error)
    }
})

export default router