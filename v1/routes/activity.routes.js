import {Router} from 'express'
import { authRequired } from '../../middlewares/valideToken.js'
import { validateRequestQuery } from '../../middlewares/valideRequest.js'
import { activityQuerySchema } from '../../schemas/activityStates.js'


import {
    getActivitiesSubjectByState,
    getActivitysSubject,
    getActivitysUser,
    getActivityById,
    saveActivity,
    updateActivity,
    deleteActivity,
    totalActivities
}from '../../controllers/activity.controller.js'


const router = Router()

/**
 * @swagger
 * tags:
 *  name: Activitys
 *  description: Endpoints for activitys
*/

/**
 * @swagger
 * /activity/getActivity/{id}:
 *   get:
 *     tags:
 *       - Activitys
 *     summary: Get activity
 *     description: Obtain data activity.
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          type: string
 *          description: Activity data id
 *          example: 664a9811b65819ff404906c7
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get Activity successfully .
 *         schema:
 *           $ref: '#/definitions/SuccessfullyActivity'
 *       404:
 *         description: Not found activity.
 *         schema:
 *           $ref: '#/definitions/notFound'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *          
 */
router.get('/getActivity/:id', authRequired, getActivityById)

router.get('/total-by-state', authRequired, totalActivities)

/**
 * @swagger
 * /activity/getActivitys/{id}/{state}:
 *   get:
 *     tags:
 *       - Activitys
 *     summary: Get activitys details
 *     description: Obtain data activitys.
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          type: string
 *          description: Subject data id
 *          example: 664a9811b65819ff404906c7
 *        - name: state
 *          in: path
 *          required: true
 *          type: string
 *          description: State of the activity 
 *          example: 664a9811b65819ff404906c7
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get activitys successfully .
 *         schema:
 *           $ref: '#/definitions/SuccessfullyActivitys'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *          
 */
router.get('/getActivitys/:id/:state', authRequired, getActivitiesSubjectByState)

/**
 * @swagger
 * /activity/getActivitysSubject/{id}:
 *   get:
 *     tags:
 *       - Activitys
 *     summary: Get activitys details for subject
 *     description: Obtain data activitys for id of subject.
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
 *         description: Get activitys successfully .
 *         schema:
 *           $ref: '#/definitions/SuccessfullyActivitys'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *          
 */
router.get('/subject/:id', authRequired, getActivitysSubject)

/**
 * @swagger
 * /activity/user:
 *   get:
 *     tags:
 *       - Activitys
 *     summary: Get activitys details for user according to state
 *     description: Obtain data activitys for user.
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: state
 *          in: query
 *          required: false
 *          type: string
 *          description: State of the activity 
 *          example: pending
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get activitys successfully for user.
 *         schema:
 *           $ref: '#/definitions/SuccessfullyActivitys'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *          
 */
router.get('/user', authRequired, validateRequestQuery(activityQuerySchema), getActivitysUser)


/**
 * @swagger
 * /activity/saveActivity:
 *   post:
 *     tags:
 *       - Activitys
 *     summary: Register a new activity
 *     description: Register a new activity in the system.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Subject data id
 *         example: 664a9811b65819ff404906c7
 *       - name: Activity
 *         in: body
 *         description: Activity data to register.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Activity'
 *     security:
 *      - bearerAuth: []
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
router.post('/save-activity', authRequired, saveActivity)

/**
 * @swagger
 * /activity/updateActivity/{id}:
 *   put:
 *     tags:
 *       - Activitys
 *     summary: Activity update  
 *     description: Activity update information data.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Activity data id
 *         example: 66779059a92281b600e0dd06
 *       - name: Activity
 *         in: body
 *         description: Activity data for update.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateActivity'
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activity successfully update data.
 *         schema:
 *           $ref: '#/definitions/statusGeneralSuccessfully'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *          
 */
router.put('/update', authRequired,updateActivity)

/**
 * @swagger
 * /activity/deleteActivity/{id}:
 *   delete:
 *     tags:
 *       - Activitys
 *     summary: Activity delete  
 *     description: Activity delete information data.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Activity data id
 *         example: 66779059a92281b600e0dd06
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activity successfully update data.
 *         schema:
 *           $ref: '#/definitions/statusGeneralSuccessfully'
 *       404:
 *         description: No activity data has been found..
 *         schema:
 *           $ref: '#/definitions/notFound'    
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *          
 */
router.delete('/deleteActivity/:id', authRequired,deleteActivity)

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
  *   SuccessfullyActivitys: 
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
 *             "name": "Primer parcial",
 *             "dateEntry": "2024-05-18T00:00:00.000Z",
 *             "dateCreation": "2024-06-23T03:03:09.000Z",
 *             "percent": 30,
 *             "qualification": 0,
 *             "subject": "667657e7217f8a7b09890365", 
 *             "state": "pending",
 *           },
 *           {
 *             "_id": "4242aff2",
 *             "name": "Primer parcial",
 *             "dateEntry": "2024-05-18T00:00:00.000Z",
 *             "dateCreation": "2024-06-23T03:03:09.000Z",
 *             "percent": 30,
 *             "qualification": 0,
 *             "subject": "667657e7217f8a7b09890365", 
 *             "state": "pending",
 *           },
 *         ]
 *       message:
 *         type: string
 *         example: Activitys found successfully
  *   SuccessfullyActivity: 
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *         example: true
 *       data: 
 *         type: object
 *         example: {
  *            "_id": "4242aff2",
 *             "name": "Primer parcial",
 *             "dateEntry": "2024-05-18T00:00:00.000Z",
 *             "dateCreation": "2024-06-23T03:03:09.000Z",
 *             "percent": 30,
 *             "qualification": 0,
 *             "subject": "667657e7217f8a7b09890365", 
 *             "state": "pending",
 *          }
 *       message:
 *         type: string
 *         example: Activity found successfully 
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
 *        example: Activity not found
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
 *         type: date
 *         required: false
 *         description: Enter delivery date
 *         example: 2024-05-18
 *       percent: 
 *         type: number
 *         required: true
 *         description: Enter the percentage of activity
 *         example: 30
 * 
 *   updateActivity:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         required: false
 *         description: Enter activity name
 *         example: First partial
 *       percent:
 *         type: number
 *         required: false
 *         description: Enter the percentage of the activity
 *         example: 30
 *       qualification: 
 *         type: number
 *         required: false
 *         description: Enter the qualification of the activity 
 *         example: 4.0
 *       state:
 *         type: string
 *         required: false
 *         description: Enter the state of the activity
 *         example: completed
 *       dateEntry:
 *         type: date
 *         required: false
 *         description: Update delivery date
 *         example: 2024-05-18
 * 
 *          
 */




export default router