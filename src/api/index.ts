import { intercept } from '@/helpers/interceptor'
import type { Category, Task, TaskFormData } from '@/types'

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

export const addTask = (task: TaskFormData) => {
  return intercept<Task>('tasks', undefined, {
    method: 'POST',
    body: JSON.stringify(task),
  })
}

export const updateTask = (taskId: number, task: TaskFormData) => {
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
