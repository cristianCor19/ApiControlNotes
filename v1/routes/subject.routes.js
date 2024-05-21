import {Router} from 'express'

import {
    saveSubject
}from '../../controllers/controllSubject.js'


const router = Router()

router.post('/saveSubject/:id', saveSubject)

export default router