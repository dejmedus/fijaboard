interface User {
  id: number;
  username: string;
  email: string;
  profile_picture?: string | null;
  collections: Collection[];
}

interface Collection {
  id?: number;
  name: string;
  description: string;
  is_private?: boolean;
  fijalists?: Fijalist[];
  created_at?: Date;
  updated_at?: Date;
}

interface Fijalist {
  id: number;
  title: string;
  description: string;
  content: string;
  cover_image?: string;
  tags?: Tag[];
  created_at: Date;
  updated_at: Date;
}

interface Tag {
  id: number;
  name: string;
}

export type { User, Fijalist, Collection, Tag };
