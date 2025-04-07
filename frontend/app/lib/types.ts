export interface User {
  id: string;
  username: string;
  email: string;
  profile_picture?: string | null;
  created_at?: string;
  updated_at?: string;
}
