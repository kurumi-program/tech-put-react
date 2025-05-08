import * as React from "react";
import { SidebarLeft } from "../../components/sidebar/SidebarLeft";
import { SidebarRight } from "../../components/sidebar/SidebarRight";
import { useProfileData } from "../../hooks/profile/useProfileData";
import { useRef, useState } from "react";
import { useHandleModal } from "../../hooks/utils/useHandleModal";
import { ProfileEditForm } from "./ProfileEditForm";
import { ProfileLayout } from "../../post/ProfileLayout";
import { PostEditForm } from "./PostEditForm";
import { scrollToSection } from "../../utils/scrollToSection";
import { useNavigation } from "../../hooks/utils/useNavigation";
import { ProfileTabContent } from "../../post/ProfileTabContent";

export const Profile = () => {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isPostOpen, setIsPostOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const { profile, isProfileLoading } = useProfileData();
  const scrollRef = useRef<HTMLUListElement>(null);
  const {
    scrollDisabledAndPostModalOpen,
    scrollDisabledAndEditModalOpen,
    scrollValidAndEditModalClose,
  } = useHandleModal({
    setIsPostOpen: setIsPostOpen,
    setIsEditOpen: setIsEditOpen,
  });
  const { handleNavigate } = useNavigation();

  if (isProfileLoading) return null;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="layout">
      <SidebarLeft />
      <ProfileLayout
        userAvatarUrl={profile?.avatarUrl}
        userName={profile?.userName}
        userEmail={profile?.email}
        userUserName={profile?.userUserName}
        userPostCount={profile?.postCount}
        userBio={profile?.bio}
        githubUrl={profile?.githubUrl}
        onModalClick={scrollDisabledAndEditModalOpen}
        myPage={true}
        onPostClick={() => scrollToSection({ scrollRef })}
        followingsCount={profile?.followingsCount}
        followersCount={profile?.followersCount}
        handleFollowingsClick={() => handleNavigate("/my-page/following")}
        handleFollowersClick={() => handleNavigate("/my-page/followers")}
      >
        <ul className="main-container" ref={scrollRef}>
          <div className="flex tab-pointer">
            <h2
              className={`font-bold articles-title ml-1 ${activeTab === "all" && "tab-active"}`}
              onClick={() => handleTabClick("all")}
            >
              All
            </h2>
            <h2
              className={`font-bold articles-title ml-5 ${activeTab === "learn" && "tab-active"}`}
              onClick={() => handleTabClick("learn")}
            >
              学習
            </h2>
            <h2
              className={`font-bold articles-title ml-5 ${activeTab === "liked" && "tab-active"}`}
              onClick={() => handleTabClick("liked")}
            >
              いいね
            </h2>
          </div>
          {profile && (
            <ProfileTabContent
              activeTab={activeTab}
              profile={profile}
              scrollDisabledAndPostModalOpen={scrollDisabledAndPostModalOpen}
            />
          )}
        </ul>
      </ProfileLayout>
      <SidebarRight />
      {isEditOpen && (
        <ProfileEditForm setIsEditOpen={setIsEditOpen} onClick={scrollValidAndEditModalClose} />
      )}
      {/*記事がない場合に作成を促すモーダルとして存在 */}
      {isPostOpen && <PostEditForm formTitle="新規作成" setIsOpen={setIsPostOpen} />}
    </div>
  );
};
