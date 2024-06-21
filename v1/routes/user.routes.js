import {Router} from 'express'
import { authRequired } from '../../middlewares/valideRequest.js'

import {
    saveUser,
    deleteUserGeneral,
    getProfileUser,
    updateUser,
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
 * /user/profileUser/:token:
 *   get:
 *     tags:
 *       - Users
 *     summary: User profile
 *     description: obtain user data for profile.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User successfully profile.
 *         schema:
 *           $ref: '#/definitions/SuccessfullyProfile'
 *       404:
 *         description: erroneous parameters 
 *         schema:
 *           $ref: '#/definitions/notFoundUser'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.get('/profileUser/:token', getProfileUser)




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
 * /user/updateUser/:token:
 *   put:
 *     tags:
 *       - Users
 *     summary: User update  
 *     description: User update information data.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         in: body
 *         description: User data for update.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserUpdate'
 *     responses:
 *       200:
 *         description: User successfully update image.
 *         schema:
 *           $ref: '#/definitions/statusGeneralSuccessfully'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.put('/updateUser/:token', updateUser)

/**
 * @swagger
 * /user/deleteUser/:token:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user 
 *     description: Delete user .
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Delete user succesfully.
 *         schema:
 *           $ref: '#/definitions/statusGeneralSuccessfully'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.delete('/deleteUser/:token', deleteUserGeneral)




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
 *          "_id": "4242aff2",
 *           "name": "camilo",
 *           "lastname": "perez",
 *           "carrier": "System Engineering",
 *           "email": "example@gmail.com",
 *           "phone": 492797429,
 *           "uid": "4242dfdfs31"
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
 * 
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




