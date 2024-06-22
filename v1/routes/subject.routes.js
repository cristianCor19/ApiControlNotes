import {Router} from 'express'
import { authRequired } from '../../middlewares/valideRequest.js'


import {
    getSubjects,
    getSubject,
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
 * /subject/getSubjects/{id}:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get subjects
 *     description: Obtain data subjects.
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          type: string
 *          description: User data id
 *          example: 664a9811b65819ff404906c7
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get user successfully profile.
 *         schema:
 *           $ref: '#/definitions/SuccessfullySubjects'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *          
 */
router.get('/getSubjects/:id', authRequired,getSubjects)

/**
 * @swagger
 * /subject/getSubject/{id}:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get subject
 *     description: Obtain data subject.
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          type: string
 *          description: Subject data id
 *          example: 664a9811b65819ff404906c7
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get subject successfully .
 *         schema:
 *           $ref: '#/definitions/SuccessfullySubject'
 *       404:
 *         description: Not found subject.
 *         schema:
 *           $ref: '#/definitions/notFoundSubject'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *          
 */
router.get('/getSubject/:id',authRequired,getSubject)

/**
 * @swagger
 * /subject/saveSubject/{id}:
 *   post:
 *     tags:
 *       - Subjects
 *     summary: Register a new subject
 *     description: Register a new subject in the system.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: User data id
 *         example: 664a9811b65819ff404906c7
 *       - name: Subject
 *         in: body
 *         description: Subject data to register.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Subject'
 *     security:
 *      - bearerAuth: []
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
router.post('/saveSubject/:id',authRequired, saveSubject)



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
 *   notFoundSubject:
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
 *   SuccessfullySubject: 
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *         example: true
 *       data: 
 *         type: object
 *         example: {
 *          "_id": "4242aff2",
 *           "name": "Calculo I",
 *           "color": "red",
 *          }
 *       message:
 *         type: string
 *         example: User found successfully
 *
 *   SuccessfullySubjects: 
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *         example: true
 *       data: 
 *         type: array
 *         items:
 *         example: [
 *           {
 *             "_id": "4242aff2",
 *             "name": "Calculo",
 *             "color": "Red"
 *           },
 *           {
 *             "_id": "4242aff3",
 *             "name": "Algebra",
 *             "color": "Blue"
 *           }
 *         ]
 *       message:
 *         type: string
 *         example: User found successfully 
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