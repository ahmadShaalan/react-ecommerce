import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabase';

interface AuthState {
  session: Session | null;
  loading: boolean;
}

interface AuthAction {
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  loading: true,
  session: null,

  setSession: (session) => set({ session }),
}));

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
      useAuthStore.setState({ loading: false });
    } else {
      useAuthStore.getState().setSession(null);
      useAuthStore.setState({ loading: false });
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      useAuthStore.getState().setSession(session);
      useAuthStore.setState({ loading: false });
    });
  } catch (error) {
    console.error(error);
    useAuthStore.setState({ loading: false });
  }
}
