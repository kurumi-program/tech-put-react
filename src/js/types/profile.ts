export type Profile = {
  id: string;
  userId: string;
  userName: string;
  userUserName: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
  githubUrl: string;
  postCount: number;
  hasLikedPosts: boolean;
  learnCount: number;
  likedCount: number;
  hasPosts: boolean;
  followingsCount: number;
  followersCount: number;
};
