import {Strategy} from 'passport-local';//importamos la estrategia de passport
import bcrypt from 'bcrypt';//libreria para encriptar contraseñas
import  Boom from '@hapi/boom';

const options={usernameField:'email',passwordField:'password'}
const LocalStrategy = new Strategy(options,async(email,password,next)=>{
    try{
        //const user = await service.findbyEmail(email)
        //validar  contrasena
    }catch(error){
        next(error,false)
    }
})