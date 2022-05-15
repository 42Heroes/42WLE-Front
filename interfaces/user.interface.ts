export interface LanguageInfo {
  name: string;
}

export interface User {
  _id: number;
  nickname: string;
  intra_id: string;
  image_url: string;
  campus: string;
  createdAt: Date;
  hashtags: string[];
  country: string;
  github_id: string;
  introduction: string;
  chatRooms: number[];
  liked_users: User[];
  saved_posts: string[];
  posts: string[];
  n_language: LanguageInfo[];
  l_language: LanguageInfo[];
  join_data: Date;
}
