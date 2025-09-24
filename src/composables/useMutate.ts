import type { TError } from '@/types'
import { type MutationKey, type QueryKey, useMutation, useQueryClient } from '@tanstack/vue-query'

type Options<T, V> = {
  mutationKey: MutationKey
  mutationFn: (variables: V) => Promise<T>
  queryKey?: QueryKey
}

const toast = useToast()

export default function useMutate<T, V>({ mutationFn, mutationKey, queryKey }: Options<T, V>) {
  const queryClient = useQueryClient()

  const mutation = useMutation<T, TError, V>({
    mutationKey,
    mutationFn,
    onSuccess() {
      if (queryKey) {
        queryClient.invalidateQueries({
          queryKey: queryKey,
        })
      }
    },
    onError(error) {
      toast.add({
        color: 'error',
        description: error.message,
        title: `Error: ${error.code}`,
      })
    },
  })

  return { ...mutation }
}
