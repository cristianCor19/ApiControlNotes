import {Router} from 'express'

import {
    saveSubject
}from '../../controllers/controllSubject.js'


const router = Router()


/**
 * @swagger
 * tags:
 *  name: Subjects
 *  description: Endpoints for subjects
*/



/**
 * @swagger
 * /subject/saveSubject/:id:
 *   post:
 *     tags:
 *       - Subjescts
 *     summary: Register a new user
 *     description: Register a new user in the system.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Subject
 *         in: body
 *         description: Subject data to register.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Subject'
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         schema:
 *           $ref: '#/definitions/SuccessfullyRegister'
 *       400:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/MissingParameters'
 *       404:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/notFoundUser'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.post('/saveSubject/:id', saveSubject)



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
 *       message:
 *         type: string
 *         example: message of successfully
 * 
 *   MissingParameters:
 *     type: object
 *     properties:
 *      status:
 *        type: boolean
 *        example: false
 *      message:
 *        type: string
 *        example: Missing required parameters
 *  
 *   notFoundUser:
 *     type: object
 *     properties:
 *      status:
 *        type: boolean
 *        example: false
 *      message:
 *        type: string
 *        example: Subject not found
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
 *   Subject:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *         description: Enter subject name
 *         example: Calculo I
 *       color:
 *         type: string
 *         required: true
 *         description: Enter color subject
 *         example: Orange
 *     
 *       
 * 
 *          
 */

export default router