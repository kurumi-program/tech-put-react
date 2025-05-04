import { useEffect, useState } from "react";
import { client } from "../../services/client";
import { Post } from "../../types/post";

export const useTopPosts = () => {
  const [topPosts, setTopPosts] = useState<Post[]>([]);

  const fetchTopPostsData = async () => {
    try {
      const res = await client.get("/top_posts");
      if (res.data) {
        setTopPosts(res.data);
        // サーバーから取得したデータをsessionStorageに保存
        sessionStorage.setItem("topPosts", JSON.stringify(res.data));
      }
    } catch (e) {
      console.error("トップのポストの取得に失敗しました", e);
    }
  };

  useEffect(() => {
    //リロード時にはサーバーからデータ取得
    fetchTopPostsData();

    // ページ遷移時にsessionStorageからデータを利用
    const savedPosts = sessionStorage.getItem("topPosts");
    if (savedPosts) {
      setTopPosts(JSON.parse(savedPosts));
    }
  }, []);

  return { topPosts, setTopPosts };
};
