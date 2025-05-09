import * as React from "react";
import { SidebarLeft } from "../../components/sidebar/SidebarLeft";
import { SidebarRight } from "../../components/sidebar/SidebarRight";
import { TitleHead } from "../../components/parts/TitleHead";
import { useRelationshipList } from "../../hooks/relationship/useRelationshipList";
import { useParams } from "react-router-dom";
import { RelationItem } from "../../post/RelationItem";
import { useEffect } from "react";
import { useNavigation } from "../../hooks/utils/useNavigation";

export const FollowerList = () => {
  let { id } = useParams();
  const { followerList, setFollowerList, fetchFollowerList } = useRelationshipList(id ?? "");
  const { handleNavigate } = useNavigation();

  useEffect(() => {
    setFollowerList([]);
    fetchFollowerList();
  }, [id]);
  return (
    <div className="layout">
      <SidebarLeft />
      <main className="main flex-item">
        <div className="main-container">
          <TitleHead>フォロワー</TitleHead>
          {followerList.length > 0 ? (
            <div className="follow-article border">
              <ul>
                {followerList.map((follower) => (
                  <RelationItem
                    key={follower.id}
                    id={follower.id}
                    onNavigateClick={() => handleNavigate(`/users/${follower.id}`)}
                    userName={follower.name}
                    userUserName={follower.username}
                    userBio={follower.bio}
                    userAvatarUrl={follower.avatarUrl}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-5">フォロワーはいません</p>
          )}
        </div>
      </main>
      <SidebarRight />
    </div>
  );
};
