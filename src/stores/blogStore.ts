import { Blog } from '@prisma/client'
import { create } from 'zustand'

export type BlogState = {
    blog: Blog | null
}

export type BlogActions = {
    setBlog: (blog: Blog | null) => void
}

export const useBlogStore = create<BlogState & BlogActions>((set) => ({
    blog: null,
    setBlog: (blog) => set({ blog })
}))