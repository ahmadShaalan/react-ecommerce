import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';
import type { LoginFormValues, UserInfo } from '../types';
import { httpClient } from '../../../lib/httpClient';

export const signInWithEmail = async ({ email, password }: LoginFormValues) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const useSignInWithEmail = () => {
  return useMutation({
    mutationFn: signInWithEmail,
  });
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export const getUserInfo = async (userId: string): Promise<UserInfo | null> => {
  const { data } = await httpClient.get<UserInfo[]>('/profiles', {
    params: {
      id: `eq.${userId}`,
    },
  });

  return data[0] ?? null;
};
