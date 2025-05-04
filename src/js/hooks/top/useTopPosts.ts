import { useEffect, useState } from "react";
import { client } from "../../services/client";
import { Post } from "../../types/post";

export const useTopPosts = () => {
  const [topPosts, setTopPosts] = useState<Post[]>([]);

  const fetchTopPostsData = async () => {
    // sessionStorageからデータを取得（ページが変わるたびにデータを取得しているのを防ぐため）
    const storedTopPosts = sessionStorage.getItem("topPosts");
    if (storedTopPosts) {
      setTopPosts(JSON.parse(storedTopPosts));
    } else {
      try {
        const res = await client.get("/top_posts");
        if (res.data) {
          setTopPosts(res.data);
          //sessionStorageに保存
          sessionStorage.setItem("topPosts", JSON.stringify(res.data));
        }
      } catch (e) {
        console.error("トップのポストの取得に失敗しました", e);
      }
    }
  };

  useEffect(() => {
    fetchTopPostsData();
  }, []);

  return { topPosts, setTopPosts };
};
