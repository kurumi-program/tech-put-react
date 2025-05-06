import React, { useContext } from "react";
import { UserWithImageParts } from "../components/parts/UserWithImageParts";
import { UserProfile } from "../types/userProfile";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "../hooks/utils/useNavigation";
import { useHandleModal } from "../hooks/utils/useHandleModal";
import { handleUserPage } from "../utils/handleUserPage";

type Props = {
  user: UserProfile;
};

export const UserProfileItem = ({ user }: Props) => {
  const { currentUser } = useContext(AuthContext);
  const { handleNavigate } = useNavigation();
  const { setIsLoginModalOpen } = useContext(AuthContext);
  const { scrollDisabledAndModalOpen } = useHandleModal({
    setIsOpen: setIsLoginModalOpen,
  });
  const handleClick = () => {
    handleUserPage({ userId: user.id, currentUser, handleNavigate, scrollDisabledAndModalOpen });
  };
  return (
    <li onClick={handleClick} className="article border cursor-pointer btn">
      <UserWithImageParts
        src={user.avatarUrl}
        className="ml-2"
        userName={user.userName}
        userId={user.userUserName}
        onClick={handleClick}
      />
      <p className="mt-3">{user.bio}</p>
    </li>
  );
};
