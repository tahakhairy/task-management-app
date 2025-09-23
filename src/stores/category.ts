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
    getCategoryNameById(state) {
      return (id: number) => state.categories?.find((category) => category.id === id)?.name
    },

    getCategoryColorById(state) {
      return (id: number) => state.categories?.find((category) => category.id === id)?.color
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
