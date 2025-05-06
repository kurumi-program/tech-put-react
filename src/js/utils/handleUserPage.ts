import { User } from "../types/auth";

type Props = {
  userId: string;
  currentUser: User | undefined;
  handleNavigate: (path: string) => void;
  scrollDisabledAndModalOpen: () => void;
};

export const handleUserPage = ({
  userId,
  currentUser,
  handleNavigate,
  scrollDisabledAndModalOpen,
}: Props) => {
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
