import { Router } from 'express'

import {
    loginUser,
    loginUserGoogle,
    verifySession,
    sendEmailRecovey,
    resetPasswordRecovey
} from '../../controllers/session.controller.js'

const router = Router()


/**
 * @swagger
 * tags:
 *  name: Session
 *  description: Endpoints to session of users 
*/


/**
 * @swagger
 * /session/verifySession:
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
 *           $ref: '#/definitions/ExistsSession'
 *       401: 
 *         description: Not exist session.
 *         schema: 
 *           $ref: '#/definitions/NotExistSession'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.get('/verify-session', verifySession)

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
 *         description: User successfully login.
 *         schema:
 *           $ref: '#/definitions/SuccessfullyLogin'
 *       404:
 *         description: Error user.
 *         schema:
 *           $ref: '#/definitions/NotFoundUserLogin'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.post('/signIn', loginUser) 

router.post('/sign-google', loginUserGoogle) 

/**
 * @swagger
 * /session/sendEmail:
 *   post:
 *     tags:
 *       - Session
 *     summary: Send email to update password
 *     description: Send email to email to update password.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         in: body
 *         description: Data to email .
 *         required: true
 *         schema:
 *           $ref: '#/definitions/SendEmail'
 *     responses:
 *       200:
 *         description: Send email successfully.
 *         schema:
 *           $ref: '#/definitions/StatusGeneralSuccessfully'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.post('/send-email', sendEmailRecovey)

router.post('/reset-password', resetPasswordRecovey)

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
 *       message:
 *         type: string
 *         example: Successful login
 *       token:
 *         type: string
 *         example: jojlkmaslknmfalknflkanflknalkfniubkajn98989897984
 *  
 *   NotFoundUserLogin:
 *     type: object
 *     properties:
 *      status:
 *        type: boolean
 *        example: false
 *      message:
 *        type: string
 *        example: Incorrect user or password
 * 
 *   StatusGeneralSuccessfully:
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
 *   ExistsSession:
 *     type: object
 *     properties:
 *      status:
 *        type: boolean
 *        example: true
 *      message:
 *        type: string
 *        example: Exist session
 *      email:
 *        type: string
 *        example: example@gmail.com
 * 
 *   NotExistSession:
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
 * 
 *   SendEmail:
 *      type: object
 *      properties:
 *        email:
 *         unique: true
 *         required: true
 *         type: string
 *         example: cristian7@gmail.com         
*/


export default router