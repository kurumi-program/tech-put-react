import React from "react";
import { PostItem } from "./PostItem";
import { useStockListData } from "../hooks/stock/useStockListData";

export const StockList = () => {
  const { stockList } = useStockListData();

  return (
    <>
      {stockList.length > 0 ? (
        stockList.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <p className="mt-5">ストックはありません</p>
      )}
    </>
  );
};
