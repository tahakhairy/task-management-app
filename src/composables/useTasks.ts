import { addTask, updateTask } from '@/api'
import type { Task } from '@/types'
import type { FormSubmitEvent } from '@nuxt/ui'
import { number, object, string, type InferType } from 'yup'
import useMutate from './useMutate'

const toast = useToast()

const modal = useOverlay()

export const useTasks = (task?: Task) => {
  const schema = object().shape({
    title: string().required('Title is required'),
    category_id: number().required('Category is required'),
    due_date: string().notRequired(),
    description: string().notRequired(),
    priority: string().notRequired(),
    image_url: string().notRequired(),
  })

  type Schema = InferType<typeof schema>

  const { mutate, isPending } = useMutate({
    mutationKey: [task ? 'edit-task' : 'add-task'],
    queryKey: ['tasks'],
    mutationFn: (values) => {
      if (task) {
        return updateTask(task.id, values as Task)
      } else {
        return addTask(values as Task)
      }
    },
  })

  async function onSubmit({ data }: FormSubmitEvent<Schema>) {
    mutate(data, {
      onSuccess() {
        toast.add({
          title: 'Success',
          description: 'The form has been submitted.',
          color: 'success',
        })

        modal.closeAll()
      },
    })
  }

  return { schema, onSubmit, isPending }
}
