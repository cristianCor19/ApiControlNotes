import {Router} from 'express'

import {
    saveActivity
}from '../../controllers/controllActivity.js'


const router = Router()

router.post('/saveActivity/:id', saveActivity)

export default router