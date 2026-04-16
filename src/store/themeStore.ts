import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => Promise<void>;
  initializeTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'system',

  setTheme: async (theme) => {
    await SecureStore.setItemAsync('theme_preference', theme);
    set({ theme });
  },

  initializeTheme: async () => {
    try {
      const savedTheme = await SecureStore.getItemAsync('theme_preference');
      if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
        set({ theme: savedTheme });
      }
    } catch (e) {
      console.log('Failed to initialize theme', e);
    }
  },
}));
