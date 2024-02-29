import {Schema,model} from 'mongoose'
import {User,UserModel} from '../types/user.type'//importamos el tipo de dato user
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../utils/constants'
const User = new Schema<User,UserModel>({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
        trim:true,
        //Validamos que el correo sea valido
        match:[EMAIL_REGEX,'Please Enter a valid email']
    }, 
    password:{
        type:String,
        required:true,
        trim:true
    }, 
    addres:{
        type:String,
        trim:true
    },
    phoneNumber:{
        type:String,
        trim:true,
        match:[PHONE_NUMBER_REGEX,'Please Enter a valid phone number']
    },
    createAt:{
        type:Date,
        default:()=>Date.now()
    },
    lastModified:{
        type:Date,
        default:()=>Date.now()
    } 
})
export default model('User',User)//exportamos el modelo de usuario