
import { createTask, deleteTask, getAllTasks, getAllTasksByUser, getTaskById, updateTask } from '@controllers/index'
import { Router } from 'express'

const router = Router()

router.get('/', getAllTasks)

router.get('/userId/:id', getAllTasksByUser)

router.get('/:id', getTaskById)

router.post('/', createTask)

router.put('/:id', updateTask)

router.delete('/:id', deleteTask)

export { router }