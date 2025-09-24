import { intercept } from '@/helpers/interceptor'
import type { Category, Task, TaskFormData } from '@/types'

export const getAllCategroies = () => {
  return intercept<Category[]>('categories', {
    order: 'name.asc',
    limit: 20,
    offset: 0,
  })
}

export const getAllTasks = (category_id?: string, offset = 0) => {
  const params =
    category_id && category_id !== 'all'
      ? {
          limit: 10,
          offset,
          order: 'created_at.desc',
          category_id,
        }
      : { limit: 10, offset, order: 'created_at.desc' }
  return intercept<Task[]>('tasks', params)
}

export const getTaskById = (taskId: number | string) => {
  return intercept<Task[]>('tasks', {
    id: `eq.${taskId}`,
  })
}

export const addTask = (task: TaskFormData) => {
  return intercept<Task>('tasks', undefined, {
    method: 'POST',
    body: JSON.stringify(task),
  })
}

export const updateTask = (taskId: number | string, task: TaskFormData) => {
  return intercept<Task>(
    'tasks',
    {
      id: `eq.${taskId}`,
    },
    {
      method: 'PATCH',
      body: JSON.stringify(task),
    },
  )
}

export const deleteTask = (taskId: number) => {
  return intercept(
    'tasks',
    {
      id: `eq.${taskId}`,
    },
    {
      method: 'DELETE',
    },
  )
}
