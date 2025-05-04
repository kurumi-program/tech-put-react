import React, { useContext } from "react";
import { UserPost } from "../user/UserPost";
import { Notice } from "../types/notice";
import { useNavigation } from "../hooks/utils/useNavigation";
import { UserWithImageParts } from "../components/parts/UserWithImageParts";
import { AuthContext } from "../contexts/AuthContext";
import { UserInfoWithDate } from "../components/parts/UserInfoWithDate";

type Props = {
  notice: Notice;
};

export const NoticeItem = ({ notice }: Props) => {
  const { handleNavigate } = useNavigation();
  const { currentUser } = useContext(AuthContext);

  const handleNavClick = () => {
    if (notice.commentId) {
      handleNavigate(`/post-detail/${notice.postId}/#mention-${notice.commentId}`);
    } else if (notice.likeId) {
      handleNavigate(`/post-detail/${notice.postId}`);
    } else {
      handleNavigate(`/users/${notice.senderId}`);
    }
  };

  const handleUserPage = () => {
    if (currentUser?.id === notice.senderId) {
      handleNavigate("/my-page");
    } else {
      handleNavigate(`/users/${notice.senderId}`);
    }
  };

  return (
    <li onClick={handleNavClick} className="article border cursor-pointer btn">
      <UserInfoWithDate
        onNavClick={() => handleUserPage()}
        src={notice.senderUserAvatarUrl}
        userName={notice.senderName}
        userUserName={notice.senderUserName}
        createdAt={notice.createdAt}
      />
      <p className="mt-3">{notice.message}</p>
    </li>
  );
};
