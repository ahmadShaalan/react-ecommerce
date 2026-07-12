import axios from 'axios';
import { supabaseAnonKey, supabaseUrl } from '../constants';
import { supabase } from './supabase';

export const httpClient = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    'Content-Type': 'application/json',
    apiKey: supabaseAnonKey,
  },
});

httpClient.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token ?? supabaseAnonKey;

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
