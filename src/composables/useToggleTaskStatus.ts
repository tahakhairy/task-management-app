import { updateTask } from '@/api'
import type { Task } from '@/types'
import useMutate from './useMutate'

export const useToggleTaskStatus = () => {
  const { mutate, isPending } = useMutate({
    queryKey: ['tasks'],
    mutationKey: ['toggle-status'],
    mutationFn: (task: Task) => updateTask(task.id, task),
  })

  const toggleCompletion = (task: Task) => {
    mutate(
      { ...task, completed: !task?.completed },
      {
        onSuccess() {},
      },
    )
  }

  return { isPending, toggleCompletion }
}
