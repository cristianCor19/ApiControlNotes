import {Router} from 'express'

import {
    saveUser
}from '../../controllers/controllUser.js'

const router = Router()


/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Endpoints for users 
 */



/**
 * @swagger
 * /user/registerUser:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Register a new user in the system.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         in: body
 *         description: User data to register.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User successfully registered.
 *         schema:
 *           $ref: '#/definitions/SuccessfullyRegister'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.post('/registerUser', saveUser)

/**
 * @swagger
 * definitions:
 *   Error:
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *         example: false
 *       error:
 *         type: string
 *         example: Error message
 *   SuccessfullyRegister:
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *         example: true
 *       success:
 *         type: string
 *         example: message of successfully
 *   SuccessfullyLogin: 
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *         example: true
 *       data: 
 *         type: object
 *         example: {
 *          "uid": "uid value",
 *          "email": "cristian9@gmail.com",
 *          "token": "token value"
 *          }
 *       success:
 *         type: string
 *         example: message of successfully login
 * 
 *   SuccessfullyProfile: 
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *         example: true
 *       data: 
 *         type: object
 *         example: {
 *          "_id": "id user value",
 *           "name": "name value",
 *           "lastname": "lastname value",
 *           "email": "email value",
 *           "phone": phone value,
 *           "image": "image value"
 *          }
 *       message:
 *         type: string
 *         example: User found successfully
 *  
 *   notFoundUser:
 *     type: object
 *     properties:
 *      status:
 *        type: boolean
 *        example: false
 *      message:
 *        type: string
 *        example: USer not found
 * 
 *   statusGeneralSuccessfully:
 *     type: object
 *     properties:
 *      status:
 *        type: boolean
 *        example: true
 *      message:
 *        type: string
 *        example: message of answer successfully
 * 
 *   notExistAuthorization:
 *     type: object
 *     properties:
 *      status:
 *        type: boolean
 *        example: false
 *      message:
 *        type: string
 *        example: not exist authorization
 * 
 * 
 *   Role:
 *     type: string
 *     enum: ['patient', 'doctor']
 *     default: 'patient'
 *   User:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *         description: Enter user name
 *         example: Cristian
 *       lastname:
 *         type: string
 *         required: true
 *         description: Enter user lastname
 *         example: Cordoba
 *       email:
 *         type: string
 *         unique: true
 *         required: true
 *         description: Enter user email 
 *         example: example@gmail.com
 *       carrier:
 *         type: string
 *         required: false
 *         description: Enter you carrier
 *         example: Systems Engineering
 *       password:
 *         type: string
 *         required: true
 *         description: Enter user passwords
 *         example: darioGomez123
 *       phone:
 *         type: number
 *         require: false
 *         description: Enter user phone
 *         example: 3107258789
 *       
 *   
 *   UserLogin:
 *      type: object
 *      properties:
 *        email:
 *         unique: true
 *         required: true
 *         type: string
 *         example: jexample@gmail.com
 *        password:
 *         required: true
 *         type: string
 *         example: dariogomez133
 * 
 *   UserUpdateImage:
 *      type: object
 *      properties:
 *        image:
 *         required: true
 *         type: string
 *         example: https://firebasestorage.googleapis.com/v0/b/test-firebase-a4d1d.appspot.com/o/images%2Fprofile-image.webp?alt=media&token=e5f92403-94c6-4749-9f11-6acd4e28ca13
 *         description: rute of the image
 * 
 * 
 *   UserUpdate:
 *      type: object
 *      properties:
 *        idCardNumber:
 *         unique: true
 *         required: true
 *         type: string
 *         example: 1002478789
 *        name:
 *         required: true
 *         type: string
 *         example: dario  
 *        lastname: 
 *         required: true
 *         type: String
 *         example: gomez
 *        email: 
 *         required: true
 *         type: String 
 *         example: cordoba@gmail.com
 *        phone: 
 *         required: true
 *         type: String
 *         example: 3224788989
 * 
 *          
 */


export default router




