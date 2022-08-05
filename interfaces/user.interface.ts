export interface LanguageInfo {
  name: string;
}

export interface User {
  _id: string;
  nickname: string;
  intra_id: string;
  image_url: string;
  campus: string;
  createdAt: Date;
  hashtags: string[];
  country: string;
  github_id: string;
  introduction: string;
  chatRooms: string[];
  liked_users: User[];
  saved_posts: string[];
  posts: string[];
  n_language: LanguageInfo[];
  l_language: LanguageInfo[];
  join_data: Date;
  isRegisterDone: boolean;
}

export interface RegisterUser {
  n_language: LanguageInfo[];
  l_language: LanguageInfo[];
  nickname: string;
  image_url: string;
  introduction: string;
  hashtags: string[];
  github_id: string;
}

export interface UpdateUserInfo {
  n_language: LanguageInfo[];
  l_language: LanguageInfo[];
  nickname: string;
  introduction: string;
  hashtags: string[];
  github_id: string;
}
