export type Notice = {
  id: string;
  message: string;
  createdAt: string;
  senderId: string;
  senderName: string;
  senderUserName: string;
  senderUserAvatarUrl: string | null;
  read: boolean;
  postId: string;
  commentId: string;
  likeId: string;
  relationId: string;
};
