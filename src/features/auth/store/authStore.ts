import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../../lib/supabase';

interface AuthState {
  session: Session | null;
}

interface AuthAction {
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  session: null,

  setSession: (session) => set({ session }),
}));

export async function initAuth() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error(error.message);
      return;
    }

    if (data.session) {
      useAuthStore.getState().setSession(data.session);
    } else {
      useAuthStore.getState().setSession(null);
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      useAuthStore.getState().setSession(session);
    });
  } catch (error) {
    console.error(error);
  }
}
