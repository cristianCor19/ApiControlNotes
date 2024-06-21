import {Router} from 'express'

import {
    saveActivity
}from '../../controllers/controllActivity.js'


const router = Router()

/**
 * @swagger
 * tags:
 *  name: Activitys
 *  description: Endpoints for activitys
*/



/**
 * @swagger
 * /activity/saveSubject/:idSubject:
 *   post:
 *     tags:
 *       - Activitys
 *     summary: Register a new activity
 *     description: Register a new activity in the system.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Activity
 *         in: body
 *         description: Activity data to register.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Activity'
 *     responses:
 *       201:
 *         description: Activity successfully registered.
 *         schema:
 *           $ref: '#/definitions/statusGeneralSuccessfully'
 *       400:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/MissingParameters'
 *       404:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/notFound'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
          
 *          
 */

router.post('/saveActivity/:id', saveActivity)

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
 *         example: message of successfully activity
 * 
 *   MissingParameters:
 *     type: object
 *     properties:
 *      status:
 *        type: boolean
 *        example: false
 *      message:
 *        type: string
 *        example: Missing required parameters of the activity
 *  
 *   notFound:
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
 *        type: String
 *        example: message of answer successfully
 *    
 * 
 *   Activity:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *         description: Enter activity name
 *         example: First partial
 *       dateEntry:
 *         type: Date
 *         required: true
 *         description: Enter delivery date
 *         example: 2024-05-18
 *       percent: 
 *         type: number
 *         required: true
 *         description: Enter the percentage of activity
 *         example: 30
 *          
 */




export default router