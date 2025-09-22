import { intercept } from '@/helpers/interceptor'
import type { Category, Task } from '@/types'

export const getAllCategroies = () => {
  return intercept<Category[]>('categories', {
    order: 'name.asc',
    limit: 20,
    offset: 0,
  })
}

export const getAllTasks = () => {
  return intercept<Task[]>('tasks', {
    limit: 10,
    order: 'created_at.desc',
  })
}
