import express from "express";
import { User } from "../types/user.type";
import UserService from "../services/user.service";
import boom from "@hapi/boom";
const router = express.Router();//creamos un router
const service = new UserService();//creamos una instancia de nuestro servicio
router.post('/', async(req,res,next)=>{//crear usuario en base de datos
    try{
        const user = req.body;
        const newUser= await service.create(user)
        res.status(201).json(newUser)
    }catch(error){
        next(error)
    }
})

router.get('/',async(req,res,next)=>{
    try{
        if(req.query.email){
        const {email} = req.query;
        const user = await service.findByEmail(email as string)
        console.log({user})
        res.status(201).json({user})
        }else{
        const users = await service.findAll()
        res.status(200).json(users)
        }  
    }catch(error){
        next(error)
    }
})
export default router;