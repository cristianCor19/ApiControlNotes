import {Router} from 'express'

import {
    loginUser,
    signOutUser,
    verifySession,
    sendEmailRecovey
}from '../../controllers/controllSession.js'

const router = Router()


/**
 * @swagger
 * tags:
 *  name: Session
 *  description: Endpoints to session of users 
*/

/**
 * @swagger
 * /session/signOut:
 *   get:
 *     tags:
 *       - Session
 *     summary: Close session 
 *     description: Method to close session
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Session succesfully closed.
 *         schema:
 *           $ref: '#/definitions/statusGeneralSuccessfully'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'     
 */
router.get('/signOut', signOutUser)

/**
 * @swagger
 * /session/verifySession/:token:
 *   get:
 *     tags:
 *       - Session
 *     summary: verify exist session
 *     description: Method to exist verify of a session
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Exist session.
 *         schema:
 *           $ref: '#/definitions/statusGeneralSuccessfully'
 *       401: 
 *         description: Not exist session.
 *         schema: 
 *           $ref: '#/definitions/notExistSession'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.get('/verifySession/:token', verifySession)

/**
 * @swagger
 * /session/signIn:
 *   post:
 *     tags:
 *       - Session
 *     summary: User login
 *     description: User login in the system.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         in: body
 *         description: User data to login.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserLogin'
 *     responses:
 *       200:
 *         description: User successfully registered.
 *         schema:
 *           $ref: '#/definitions/SuccessfullyLogin'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.post('/signIn', loginUser)

router.post('/sendEmail', sendEmailRecovey)

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
 *   SuccessfullyLogin: 
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *         example: true
 *       success:
 *         type: string
 *         example: message of successfully login
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
 *   existsSession:
 *     type: boolean
 *     properties:
 *      status:
 *        type: boolean
 *        example: true
 *      message:
 *        type: string
 *        example: Exist session
 *      user:
 *        type: string
 *        example: example@gmail.com
 * 
 *   notExistSession:
 *     type: object
 *     properties:
 *      status:
 *        type: boolean
 *        example: false
 *      message:
 *        type: string
 *        example: not exist session
 *       
 *   
 *   UserLogin:
 *      type: object
 *      properties:
 *        email:
 *         unique: true
 *         required: true
 *         type: string
 *         example: cristian7@gmail.com
 *        password:
 *         required: true
 *         type: string
 *         example: cristian       
*/


export default router