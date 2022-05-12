
export interface Post {
  id: number;
  body: string;
  createdAt: Date;
  user:PostUser;
}

export interface PostUser {
  id?: number;
  displayName?: string;
  email?: string;
  imagePath?: string;
}
