
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '@controllers/index'
import { Router } from 'express'

const router = Router()

router.get('/', getAllTasks)

router.get('/:id', getTaskById)

router.post('/', createTask)

router.put('/:id', updateTask)

router.delete('/:id', deleteTask)

export { router }