import { useContext, useEffect } from "react";
import { client } from "../../services/client";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useNavigation } from "../utils/useNavigation";

export const useUserProfile = (userId: string) => {
  const {
    userProfile,
    setUserProfile,
    userPostList,
    setUserPostList,
    isUserProfileLoading,
    setIsUserProfileLoading,
  } = useContext(ProfileContext);
  const { handleNavigate } = useNavigation();

  const fetchUserProfile = async () => {
    try {
      const res = await client.get(`/users/${userId}`);
      if (res.data) {
        setUserProfile(res.data);
        setUserPostList(res.data.post);
      }
    } catch (e: any) {
      if (e.response?.status === 404) {
        handleNavigate("*");
      } else {
        console.error("プロフィールの取得に失敗しました", e);
      }
    } finally {
      setIsUserProfileLoading(false);
    }
  };

  return {
    fetchUserProfile,
    userProfile,
    setUserProfile,
    userPostList,
    setUserPostList,
    isUserProfileLoading,
  };
};
