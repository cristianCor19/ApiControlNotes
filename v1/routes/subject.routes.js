import {Router} from 'express'
import { authRequired } from '../../middlewares/valideToken.js'


import {
    getSubjects,
    getSubject,
    saveSubject,
    updateSubject,
    deleteSubject,
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
 * /subject/get-subjects:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get subjects
 *     description: Obtain data subjects.
 *     produces:
 *       - application/json
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
router.get('/get-subjects', authRequired,getSubjects)

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
 * /subject/save-subject/{id}:
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
router.post('/save-subject',authRequired, saveSubject)

/**
 * @swagger
 * /subject/updateSubject/{id}:
 *   put:
 *     tags:
 *       - Subjects
 *     summary: Subject update  
 *     description: Subject update information data.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Subject data id
 *         example: 667657e7217f8a7b09890365
 *       - name: Subject
 *         in: body
 *         description: subject data for update.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateSubject'
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subject successfully update data.
 *         schema:
 *           $ref: '#/definitions/statusGeneralSuccessfully'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.put('/updateSubject/:id',authRequired, updateSubject)

/**
 * @swagger
 * /subject/deleteSubject/{id}:
 *   delete:
 *     tags:
 *       - Subjects
 *     summary: Subject delete  
 *     description: Subject delete information data.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Subject data id
 *         example: 66779059a92281b600e0dd06
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subject successfully delete data.
 *         schema:
 *           $ref: '#/definitions/statusGeneralSuccessfully'
 *       404:
 *         description: No Sbuject data has been found..
 *         schema:
 *           $ref: '#/definitions/notFound'    
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *          
 */
router.delete('/deleteSubject/:id', authRequired, deleteSubject)

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
 *   updateSubject:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         required: false
 *         description: Enter subject name
 *         example: Calculo I
 *       color:
 *         type: string
 *         required: false
 *         description: Enter color subject
 *         example: Orange
 *     
 *       
 * 
 *          
 */

export default router