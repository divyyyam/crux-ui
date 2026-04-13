import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import client from '../api/client';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  isInitialized: boolean;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  setUser: (user: any) => void;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isInitialized: false,

  setTokens: async (accessToken, refreshToken) => {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    set({ accessToken, refreshToken });
  },

  setUser: (user) => set({ user }),

  logout: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    set({ accessToken: null, refreshToken: null, user: null });
  },

  initialize: async () => {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      
      if (accessToken) {
        // Hydrate initial tokens so client can use them for the /me request immediately
        set({ accessToken, refreshToken });
        
        try {
          const response = await client.get('/auth/me');
          if (response.data && response.data.success) {
            set({ user: response.data.data.user || response.data.data }); // depending on exact shape { user, ... }
          } else {
            throw new Error('Invalid user response');
          }
        } catch (error) {
          console.log('Failed to fetch /me. Logging out.', error);
          await get().logout();
        }
      }
      
      set({ isInitialized: true });
    } catch {
      set({ isInitialized: true });
    }
  },
}));
