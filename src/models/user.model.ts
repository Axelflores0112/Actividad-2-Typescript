import { Schema, model } from 'mongoose'
import { User, UserMethods, UserModel } from '../types/user.type'
import { EMAIL_REGEX, PHONE_NUMBER_REGEX,PASSWORD_REGEX } from '../utils/constants'


export const USER_REFERENCE = 'User'


const Users = new Schema<User, UserModel, UserMethods>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    match: [EMAIL_REGEX, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    match: [PASSWORD_REGEX, 'Please enter valid pasword']
  },
  address: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true,
    match: [PHONE_NUMBER_REGEX, 'Please enter a valid phone number']
  },
  role: {
    type: String,
    enum: ['admin', 'creador', 'cliente'],
    default: 'cliente',
    required: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  lastModified: {
    type: Date,
    default: () => Date.now()
  }
})

Users.methods.toClient = function () {
  return {
    id: this._id as unknown as string,
    name: this.name,
    email: this.email,
    address: this.address,
    phoneNumber: this.phoneNumber,
    role: this.role
  }
}

export default model(USER_REFERENCE, Users)

