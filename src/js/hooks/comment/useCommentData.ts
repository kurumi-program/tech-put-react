import { useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import { client } from "../../services/client";
import { useNavigation } from "../utils/useNavigation";

export const useCommentData = (postId: string) => {
  const { setIsCommentLoading, commentList, setCommentList } = useContext(PostContext);
  const { handleNavigate } = useNavigation();

  const fetchComments = async () => {
    try {
      const res = await client.get(`/posts/${postId}/comments`);
      if (res.data) {
        setCommentList(res.data);
      }
    } catch (e: any) {
      if (e.response?.status === 404) {
        handleNavigate("*");
      } else {
        console.error("投稿の取得に失敗しました", e);
      }
    } finally {
      setIsCommentLoading(false);
    }
  };

  useEffect(() => {
    setCommentList([]);
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  return { commentList, setCommentList, fetchComments };
};
