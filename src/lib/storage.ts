import axios from 'axios';
import { supabase } from './supabase';
import { supabaseAnonKey, supabaseUrl } from '../constants';

// Upload a file to a Storage bucket via the Storage REST API (not the SDK).
export async function uploadToStorage(
  bucket: string,
  path: string,
  file: File,
): Promise<void> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token ?? supabaseAnonKey;

  await axios.post(`${supabaseUrl}/storage/v1/object/${bucket}/${path}`, file, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${token}`,
      'Content-Type': file.type,
    },
  });
}
