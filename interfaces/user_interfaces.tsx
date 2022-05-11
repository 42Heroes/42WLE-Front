export interface LanguageProps {
  language: string;
  flag: string;
}

export interface UserCardProps {
  nickname: string;
  image_url: string;
  n_language: LanguageProps[];
  l_language: LanguageProps[];
}

export interface UserProps extends UserCardProps {
  intra_id: string;
  campus: string;
  createdAt: Date;
  hashtags: string[];
  country: string;
  github_id: string;
  introduction: string;
  chat_room: string[];
  liked_users: string[];
  saved_posts: string[];
  posts: string[];
  join_date: Date;
}
