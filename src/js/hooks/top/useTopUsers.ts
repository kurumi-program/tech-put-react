import { useEffect, useState } from "react";
import { client } from "../../services/client";
import { User } from "../../types/auth";

export const useTopUsers = () => {
  const [topUsers, setTopUsers] = useState<User[]>([]);

  const fetchTopUsersData = async () => {
    try {
      const res = await client.get("/top_users");
      if (res.data) {
        setTopUsers(res.data);
        // サーバーから取得したデータをsessionStorageに保存
        sessionStorage.setItem("topUsers", JSON.stringify(res.data));
      }
    } catch (e) {
      console.error("トップのユーザーの取得に失敗しました", e);
    }
  };

  useEffect(() => {
    //リロード時にはサーバーからデータ取得
    fetchTopUsersData();

    // ページ遷移時にsessionStorageからデータを利用
    const savedUsers = sessionStorage.getItem("topUsers");
    if (savedUsers) {
      setTopUsers(JSON.parse(savedUsers));
    }
  }, []);

  return { topUsers, setTopUsers };
};
