import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import { CreateTodoController } from '../todo/rest/create-todo.controller'
import { UpdateTodoController } from '../todo/rest/update-todo.controller'
import { DeleteTodoController } from '../todo/rest/delete-todo.controller'
import { GetAllTodoController } from '../todo/rest/get-all-todo.controller'
import { GetByIdTodoController } from '../todo/rest/get-by-id-todo.controller'

const router = Router()

router.get('/ping', (req: Request, res: Response) => {
  res.status(200).send('Health check successful')
})

const createTodoController = Container.get(CreateTodoController)
router.post('/', (req: Request, res: Response) =>
  createTodoController.invoke(req, res)
)

const updateTodoController = Container.get(UpdateTodoController)
router.put('/', (req: Request, res: Response) =>
  updateTodoController.invoke(req, res)
)

const deleteTodoController = Container.get(DeleteTodoController)
router.delete('/:id', (req: Request, res: Response) =>
  deleteTodoController.invoke(req, res)
)

const getAllTodoController = Container.get(GetAllTodoController)
router.get('/', (req: Request, res: Response) =>
  getAllTodoController.invoke(req, res)
)

const getByIdTodoController = Container.get(GetByIdTodoController)
router.get('/:id', (req: Request, res: Response) =>
  getByIdTodoController.invoke(req, res)
)

router.get('*', (req: Request, response: Response) => {
  response.status(404).send(`${req.url} not found`)
})

export default router
