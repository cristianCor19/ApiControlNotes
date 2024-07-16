import {z} from 'zod'

export const registerUserShema = z.object({

    password: z.string({
        required_error: 'La constraseña es requerida'
    }).min(8,{
        message: 'La contraseña debe tener mínimo 8 caracteres'
    }).regex(/[A-Z]/, {
        message: 'La contraseña debe contener al menos una letra mayúscula'
    }).regex(/[a-z]/, {
      message: 'La contraseña debe contener al menos una letra minúscula'
    }).regex(/[0-9]/, {
      message: 'La contraseña debe contener al menos un número'
    }).regex(/[^A-Za-z0-9]/, {
      message: 'La contraseña debe contener al menos un carácter especial'
    }),


})