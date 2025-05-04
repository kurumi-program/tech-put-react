import { useContext, useEffect } from "react";
import { client } from "../../services/client";
import { NoticeContext } from "../../contexts/NoticeContext";
import { authHeaders } from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";

export const useNoticeData = () => {
  const { noticeList, setNoticeList, bellActive, setBellActive } = useContext(NoticeContext);
  const { currentUser } = useContext(AuthContext);
  const fetchNotices = async () => {
    if (!currentUser) return;
    try {
      const res = await client.get(`/notifications`, { headers: authHeaders() });
      if (res.data) {
        setNoticeList(res.data);
      }
    } catch (e) {
      console.error("通知が取得できませんでした", e);
    }
  };

  const marksAsRead = async (noticeIds: string[]) => {
    try {
      const res = await client.patch(
        "/notifications/mark_as_read",
        { ids: noticeIds },
        { headers: authHeaders() },
      );
      if (res.status === 200) {
        setNoticeList((prevNotices) =>
          prevNotices.map((notice) =>
            noticeIds.includes(notice.id) ? { ...notice, read: true } : notice,
          ),
        );
      }
    } catch (e) {
      console.error("通知の既読処理に失敗しました", e);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [currentUser]);

  return { noticeList, setNoticeList, fetchNotices, marksAsRead, bellActive, setBellActive };
};
