import {Router} from 'express'

import {
    saveUser
}from '../../controllers/controllUser.js'

const router = Router()


router.post('/registerUser', saveUser)

export default router