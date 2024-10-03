import { Theme } from "@/types/Theme"
import { create } from 'zustand'

export type ThemeState = {
    theme: Theme
}

export type ThemeActions = {
    setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState & ThemeActions>((set) => ({
    theme: 'light',
    setTheme: (theme) => set({ theme })
}))