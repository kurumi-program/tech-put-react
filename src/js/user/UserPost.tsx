import React, { useContext } from "react";
import { useNavigation } from "../hooks/utils/useNavigation";
import { AuthContext } from "../contexts/AuthContext";
import { useHandleModal } from "../hooks/utils/useHandleModal";
import { UserInfoWithDate } from "../components/parts/UserInfoWithDate";

type Props = {
  userId?: string;
  userName?: string;
  userUserName?: string;
  createdAt?: string;
  onClick?: (value: React.MouseEvent<HTMLDivElement>) => void;
  src?: string | null;
};

export const UserPost = ({ userId, userName, userUserName, createdAt, onClick, src }: Props) => {
  const { handleNavigate } = useNavigation();
  const { setIsLoginModalOpen, currentUser } = useContext(AuthContext);
  const { scrollDisabledAndModalOpen } = useHandleModal({
    setIsOpen: setIsLoginModalOpen,
  });
  const navigate = () => {
    if (currentUser) {
      if (currentUser?.id === userId) {
        handleNavigate("/my-page");
      } else {
        handleNavigate(`/users/${userId}`);
      }
    } else {
      scrollDisabledAndModalOpen();
    }
  };
  return (
    <UserInfoWithDate
      onNavClick={() => navigate()}
      src={src}
      userName={userName}
      userUserName={userUserName}
      createdAt={createdAt}
    />
  );
};
