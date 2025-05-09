import { useContext } from "react";
import { authHeaders } from "../../services/authService";
import { client } from "../../services/client";
import { useNavigation } from "../utils/useNavigation";
import { PostContext } from "../../contexts/PostContext";
import { useLocation } from "react-router-dom";
import { ProfileContext } from "../../contexts/ProfileContext";

export const useDeletePost = () => {
  const { handleNavigate } = useNavigation();
  const { setPostList } = useContext(PostContext);
  const {
    profile,
    setProfile,
    setProfilePostList,
    setProfileLearnPostList,
    setProfileLikedPostList,
  } = useContext(ProfileContext);
  const location = useLocation();
  const deletePost = async (postId: string) => {
    if (!window.confirm("この投稿を削除しますか？")) return;
    try {
      const res = await client.delete(`/posts/${postId}`, { headers: authHeaders() });
      if (res.data) {
        setPostList((prevPostList) => prevPostList.filter((post) => post.id !== postId));
        //プロフィールにある記事の削除処理
        setProfilePostList((prevProfilePostList) =>
          prevProfilePostList.filter((post) => post.id !== postId),
        );
        //プロフィールにある学習記事の削除処理
        setProfileLearnPostList((prevProfileLearnPostList) =>
          prevProfileLearnPostList.filter((post) => post.id !== postId),
        );
        //プロフィールにあるいいね記事の削除処理
        setProfileLikedPostList((prevProfileLikedPostList) =>
          prevProfileLikedPostList.filter((post) => post.id !== postId),
        );

        if (profile) {
          const updatedCount = profile.postCount - 1;
          setProfile({ ...profile, postCount: updatedCount });
        }

        if (location.pathname === `/post-detail/${postId}`) {
          handleNavigate("/");
        }
      }
    } catch (e) {
      console.error("削除失敗");
    }
  };

  return { deletePost };
};
