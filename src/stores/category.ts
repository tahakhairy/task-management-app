import { getAllCategroies } from '@/api'
import type { Category } from '@/types'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
  state: (): { categories: Category[] | null } => {
    return {
      categories: null,
    }
  },

  getters: {
    getCategoryPropertyById(state) {
      return (id: number, prop: keyof Category) =>
        state.categories?.find((category) => category.id === id)?.[prop]
    },
  },

  actions: {
    setCategories(categories: Category[]) {
      this.categories = categories
    },

    async fetchCategories() {
      const data = await getAllCategroies()

      this.setCategories(data)
    },
  },
})
