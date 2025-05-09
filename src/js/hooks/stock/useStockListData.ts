import { useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import { authHeaders } from "../../services/authService";
import { client } from "../../services/client";

export const useStockListData = () => {
  const { isLoading, setIsLoading, stockList, setStockList } = useContext(PostContext);

  const fetchStockedPosts = async () => {
    setIsLoading(true);
    try {
      const res = await client.get("/stocks", { headers: authHeaders() });
      if (res.data) {
        setStockList(res.data);
      }
    } catch (error) {
      console.error("投稿の取得に失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStockedPosts();
  }, []);

  return { stockList, isLoading };
};
