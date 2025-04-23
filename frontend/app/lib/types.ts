interface User {
  id: string;
  username: string;
  email: string;
  profile_picture?: string | null;
  collections?: Collection[];
}

interface Collection {
  id: string;
  name: string;
  description: string;
  is_private: boolean;
  fijalist?: Fijalist[];
  created_at: Date;
  updated_at: Date;
}

interface Fijalist {
  id: string;
  title: string;
  description: string;
  content: string;
  cover_image?: string;
  tags?: Tag[];
  created_at: Date;
  updated_at: Date;
}

interface Tag {
  id: string;
  name: string;
}

export type { User, Fijalist, Collection, Tag };
