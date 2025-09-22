export interface TError {
  code: string
  details: any
  hint: any
  message: string
}

export interface Category {
  id: number
  name: string
  color: string
  icon_url: string
  image_filter: string
  image_seed_offset: number
  created_at: string
}

export interface Task {
  id: number
  title: string
  description: string
  priority: string
  category_id: number
  due_date: string
  completed: boolean
  image_url: string
  created_at: string
  updated_at: string
}
