import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),

  password: z.string(),
  // .min(8, 'Password must be at least 8 characters')
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
  //   'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  // ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface UserInfo {
  id: string;
  full_name: string;
  avatar_url: string | null;
  role: 'admin' | 'customer';
  phone: string | null;
  created_at: string;
  updated_at: string;
}
