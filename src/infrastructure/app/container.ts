import { Container } from 'typedi'
import { PostgreTodoRepository } from '../todo/persistence/postgre-todo.repository'
import { CachedApiLabelRepository } from '../label/persistence/cached-api-label.repository'

Container.set('LabelRepository', Container.get(CachedApiLabelRepository))
Container.set('TodoRepository', Container.get(PostgreTodoRepository))
