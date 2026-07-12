import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Session } from '@supabase/supabase-js';

import { supabase } from '../../../lib/supabase';
import { getUserInfo } from '../api/authApi';

interface UserInfo {
  id: string;
  full_name: string;
  avatar_url: string | null;
  role: 'admin' | 'customer';
}

interface AuthState {
  session: Session | null;
  loading: boolean;
  userInfo: UserInfo | null;
}

interface AuthAction {
  setSession: (session: Session | null) => void;
  setUserInfo: (userInfo: UserInfo | null) => void;
}

export const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    (set) => ({
      loading: true,
      session: null,
      userInfo: null,

      setSession: (session) => set({ session }, false, 'auth/setSession'),

      setUserInfo: (userInfo) => set({ userInfo }, false, 'auth/setUserInfo'),
    }),
    {
      name: 'auth-store',
    },
  ),
);

export async function initAuth() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error(error.message);
      useAuthStore.setState({ loading: false });
      return;
    }

    if (data.session) {
      useAuthStore.getState().setSession(data.session);

      const userInfo = await getUserInfo(data.session.user.id);

      useAuthStore.getState().setUserInfo(userInfo);
      useAuthStore.setState({ loading: false });
    } else {
      useAuthStore.getState().setSession(null);
      useAuthStore.getState().setUserInfo(null);
      useAuthStore.setState({ loading: false });
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {
      useAuthStore.getState().setSession(session);

      if (session?.user.id) {
        const userInfo = await getUserInfo(session?.user?.id);
        useAuthStore.getState().setUserInfo(userInfo);
      }

      useAuthStore.setState({ loading: false });
    });
  } catch (error) {
    console.error(error);
    useAuthStore.setState({ loading: false });
  }
}
