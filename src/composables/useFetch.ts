import type { TError } from '@/types'
import { keepPreviousData, useQuery, type QueryFunction, type QueryKey } from '@tanstack/vue-query'

type FetchOptions<T> = {
  queryKey: QueryKey
  queryFn: QueryFunction<T>
}

export const useFetch = <T>({ queryKey, queryFn }: FetchOptions<T>) => {
  return useQuery<T, TError>({
    queryKey,
    queryFn,
    placeholderData: keepPreviousData,
  })
}
