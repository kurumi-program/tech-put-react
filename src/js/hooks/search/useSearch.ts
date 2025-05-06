import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import { client } from "../../services/client";
import { AuthContext } from "../../contexts/AuthContext";
import { ProfileContext } from "../../contexts/ProfileContext";

export const useSearch = () => {
  const { searchList, setSearchList } = useContext(PostContext);
  const { searchUserList, setSearchUserList } = useContext(ProfileContext);

  const fetchSearchData = async (keyword: string) => {
    try {
      const res = await client.get("/search", {
        params: { q: keyword },
      });
      setSearchList(res.data.posts);
      setSearchUserList(res.data.users);
    } catch (e) {
      console.error("検索の結果を取得できませんでした", e);
    }
  };

  return { searchList, searchUserList, fetchSearchData };
};
