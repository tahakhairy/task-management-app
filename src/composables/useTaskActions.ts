import TaskDeleteModal from '@/components/tasks/task-delete-modal.vue'
import TaskModal from '@/components/tasks/task-modal.vue'
import Modal from '@/components/ui/modal.vue'
import type { Task } from '@/types'
import { markRaw } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'

export const useTaskActions = () => {
  const overlay = useOverlay()

  const modal = overlay.create(Modal)

  function openTaskModal(task?: Task) {
    modal.open({
      title: `${task ? 'Update' : 'Add'} Task`,
      description: `${task ? 'Update current opened' : 'Add new'} task`,
      component: markRaw(TaskModal),
      componentProps: {
        task,
      } as ComponentProps<typeof TaskModal>,
    })
  }

  function openDeleteModal(task: Task) {
    modal.open({
      title: `Delete ${task.title}`,
      component: markRaw(TaskDeleteModal),
      componentProps: {
        taskId: task.id,
      } as ComponentProps<typeof TaskDeleteModal>,
    })
  }

  return { openTaskModal, openDeleteModal }
}
