import * as React from "react";
import { SidebarLeft } from "../../components/sidebar/SidebarLeft";
import { SidebarRight } from "../../components/sidebar/SidebarRight";
import { TitleHead } from "../../components/parts/TitleHead";
import { useSearch } from "../../hooks/search/useSearch";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PostItem } from "../../post/PostItem";
import { UserProfileItem } from "../../post/UserProfileItem";

export const Search = () => {
  const { searchList, searchUserList, fetchSearchData } = useSearch();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) fetchSearchData(query);
  }, [query]);

  return (
    <div className="layout">
      <SidebarLeft />
      <main className="main flex-item">
        <ul className="main-container">
          <TitleHead>検索結果</TitleHead>
          {searchList?.length > 0 ? (
            searchList.map((post) => <PostItem key={post.id} post={post} />)
          ) : searchUserList?.length > 0 ? (
            searchUserList.map((user) => <UserProfileItem key={user.id} user={user} />)
          ) : (
            <p className="mt-5">該当する投稿・ユーザーは見つかりませんでした。</p>
          )}
        </ul>
      </main>
      <SidebarRight />
    </div>
  );
};
