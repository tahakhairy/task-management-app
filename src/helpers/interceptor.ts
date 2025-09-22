import type { TError } from '@/types'

const BASE_URL = import.meta.env.VITE_APP_BASE_URL
const AUTH_TOKEN = import.meta.env.VITE_APP_AUTH_TOKEN

const toast = useToast()

export async function intercept<T>(
  endpoint: string,
  queryParams: Record<string, string | number> = {},
  options?: RequestInit,
): Promise<T> {
  // Construct query string from queryParams object
  const queryString = Object.keys(queryParams)
    .map((key) => {
      const value = queryParams[key]

      if (value === null || value === undefined) return ''

      return `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
    })
    .join('&')

  // Append query string to the URL
  const fullUrl = Object.keys(queryParams).length
    ? `${BASE_URL}${endpoint}?${queryString}`
    : `${BASE_URL}${endpoint}${queryString}`

  // handle request
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
    apikey: AUTH_TOKEN,
    Prefer: 'return=representation',
  }

  const response = await fetch(fullUrl, { headers: requestHeaders, ...options })

  const data = await response.json()

  if (!response.ok) {
    const error = data as TError

    toast.add({ color: 'error', description: error.message, title: `Error: ${error.code}` })

    Promise.reject(response)
  }

  return data as T
}
