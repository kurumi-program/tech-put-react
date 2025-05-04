// サインアップ
export type LoginParams = {
  email: string;
  password: string;
  passwordConfirmation?: string;
};

//パスワード再設定
export type ResetPassParams = {
  password: string;
  passwordConfirmation: string;
  resetPasswordToken: string;
};

// ユーザー
export type User = {
  id: string;
  uid: string;
  provider: string;
  email: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
  guest: boolean;
};

//googleログイン
export type GoogleLoginParams = {
  credential: string;
};
