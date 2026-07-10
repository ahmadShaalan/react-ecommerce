import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';
import type { LoginFormValues } from '../types';

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
