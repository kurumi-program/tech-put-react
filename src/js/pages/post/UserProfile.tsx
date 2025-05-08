import * as React from "react";
import { SidebarLeft } from "../../components/sidebar/SidebarLeft";
import { SidebarRight } from "../../components/sidebar/SidebarRight";
import { ProfileLayout } from "../../post/ProfileLayout";
import { useUserProfile } from "../../hooks/profile/useUserProfile";
import { useParams } from "react-router-dom";
import { UserPostList } from "../../post/UserPostList";
import { useEffect, useRef } from "react";
import { scrollToSection } from "../../utils/scrollToSection";
import { useRelationship } from "../../hooks/relationship/useRelationship";
import { useNavigation } from "../../hooks/utils/useNavigation";

export const UserProfile = () => {
  let { id } = useParams();
  const { fetchUserProfile, setUserProfile, userProfile, isUserProfileLoading } = useUserProfile(
    id ?? "",
  );
  const userId = userProfile?.userId;
  const scrollRef = useRef<HTMLUListElement>(null);
  const { follow, handleFollow, handleUnfollow, isRelationLoading } = useRelationship(userId ?? "");
  const { handleNavigate } = useNavigation();

  const isFollowed = follow?.isFollowed;

  useEffect(() => {
    setUserProfile(null);
    fetchUserProfile();
  }, [id]);

  if (isUserProfileLoading || !userProfile || isRelationLoading) return null;

  return (
    <div className="layout">
      <SidebarLeft />
      <ProfileLayout
        userAvatarUrl={userProfile?.avatarUrl}
        userName={userProfile?.userName}
        userEmail={userProfile?.email}
        userUserName={userProfile?.userUserName}
        userPostCount={userProfile?.postCount}
        userBio={userProfile?.bio}
        githubUrl={userProfile?.githubUrl}
        onPostClick={() => scrollToSection({ scrollRef })}
        onFollowClick={handleFollow}
        onUnfollowClick={handleUnfollow}
        followingsCount={follow?.followingsCount}
        followersCount={follow?.followersCount}
        isFollowed={isFollowed}
        handleFollowingsClick={() => handleNavigate(`/users/${id}/following`)}
        handleFollowersClick={() => handleNavigate(`/users/${id}/followers`)}
      >
        {userProfile?.userId && Number(userProfile.postCount) > 0 ? (
          <ul className="main-container" ref={scrollRef}>
            <h2 className="font-bold articles-title ml-1">投稿</h2>
            <UserPostList userId={userProfile.userId} />
          </ul>
        ) : (
          <ul className="main-container" ref={scrollRef}>
            <li>投稿はありません</li>
          </ul>
        )}
      </ProfileLayout>
      <SidebarRight />
    </div>
  );
};
