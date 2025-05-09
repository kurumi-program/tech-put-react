import React from "react";
import { TitleHead } from "../components/parts/TitleHead";
import { NoticeItem } from "./NoticeItem";
import { useNoticeData } from "../hooks/notification/useNoticeData";

export const NoticeList = () => {
  const { noticeList } = useNoticeData();
  return (
    <ul className="main-container">
      <TitleHead>通知一覧</TitleHead>
      {noticeList.length > 0 ? (
        noticeList.map((notice) => <NoticeItem notice={notice} key={notice.id} />)
      ) : (
        <p className="mt-5">通知はありません</p>
      )}
    </ul>
  );
};
