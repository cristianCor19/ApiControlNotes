import {config} from 'dotenv'
config()

export const FIREBASE_APIKEY  = process.env.FIREBASE_APIKEY 
export const FIREBASE_AUTHDOMAIN  = process.env.FIREBASE_AUTHDOMAIN  
export const FIREBASE_PROJECTID  = process.env.FIREBASE_PROJECTID  
export const FIREBASE_STORAGEBUCKET  = process.env.FIREBASE_STORAGEBUCKET  
export const FIREBASE_MESSAGEINGSENDERID  = process.env.FIREBASE_MESSAGEINGSENDERID  
export const FIREBASE_APPID  = process.env.FIREBASE_APPID  
export const FIREBASE_MEASUREMENTID  = process.env.FIREBASE_MEASUREMENTID  


export const PROJECT_ID = process.env.PROJECT_ID
export const PRIVATE_KEY_ID = process.env.PRIVATE_KEY_ID
export const CLIENT_EMAIL = process.env.CLIENT_EMAIL
export const CLIENT_ID = process.env.CLIENT_ID
export const PRIVATE_KEY = process.env.PRIVATE_KEY