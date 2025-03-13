import { create, findOne } from '@controllers/users.controller'
import { Router } from 'express'

const router = Router()

router.get('/:email', findOne)

router.post('/', create)

export { router }