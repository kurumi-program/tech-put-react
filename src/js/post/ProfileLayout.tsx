import React, { PropsWithChildren, useState } from "react";
import defaultAvatar from "../../assets/images/default-avatar.png";
import { UserParts } from "../components/parts/UserParts";
import { FormButton } from "../components/parts/FormButton";
import { ProfileFollowButton } from "../components/parts/ProfileFollowButton";
import githubIcon from "../../assets/images/github-mark.png";
import { Link } from "react-router-dom";

type Props = {
  userAvatarUrl?: string | null;
  userName?: string | null;
  userEmail?: string;
  userUserName?: string;
  userPostCount?: number;
  userBio?: string;
  myPage?: boolean;
  onModalClick?: () => void;
  onPostClick?: () => void;
  onFollowClick?: () => void;
  onUnfollowClick?: () => void;
  handleFollowingsClick?: () => void;
  handleFollowersClick?: () => void;
  isFollowed?: boolean;
  followingsCount?: number;
  followersCount?: number;
  githubUrl?: string;
};

export const ProfileLayout = ({
  userAvatarUrl,
  userName,
  userEmail,
  userUserName,
  userPostCount,
  userBio,
  myPage = false,
  onModalClick,
  onPostClick,
  onFollowClick,
  onUnfollowClick,
  handleFollowingsClick,
  handleFollowersClick,
  isFollowed,
  followingsCount,
  followersCount,
  children,
  githubUrl,
}: PropsWithChildren<Props>) => {
  return (
    <main className="main flex-item">
      <div className="article border main-container">
        <div className="text-center">
          <div className="profile-avatar">
            <img className="btn" src={userAvatarUrl || defaultAvatar} alt="avatar preview" />
          </div>
        </div>
        <UserParts
          classNameWrapper="justify-center"
          className="text-center"
          userClassName="profile-user-name font-bold"
          userIdClassName="profile-user-id"
          userName={userName ?? userEmail?.split("@")[0] ?? "unknown"}
          userId={userUserName ?? ""}
        />
        {githubUrl && (
          <div className="text-center image-wrapper">
            <a
              href={githubUrl}
              className="github-url btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="github icon" />
            </a>
          </div>
        )}

        <ul className="pt-4 mt-[30px] stat-item text-center border-t flex">
          <li onClick={onPostClick}>
            <p className="stat-number">{userPostCount}</p>
            <p className="stat-label">投稿数</p>
          </li>
          <li onClick={handleFollowingsClick}>
            <p className="stat-number">{followingsCount}</p>
            <p className="stat-label">フォロー</p>
          </li>
          <li onClick={handleFollowersClick}>
            <p className="stat-number">{followersCount}</p>
            <p className="stat-label">フォロワー</p>
          </li>
        </ul>
        {userBio && (
          <div className="profile-description">
            <p>
              {userBio.split("\n").map((bio, index) => (
                <React.Fragment key={index}>
                  {bio}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        )}
        {myPage ? (
          <div className="text-center">
            <FormButton className="edit-btn" onClick={onModalClick}>
              プロフィールを編集
            </FormButton>
          </div>
        ) : (
          <div className="text-center">
            <ProfileFollowButton
              isFollowed={isFollowed}
              onFollowClick={onFollowClick}
              onUnfollowClick={onUnfollowClick}
              className="profile-follow-btn"
            />
          </div>
        )}
      </div>

      {children}
    </main>
  );
};
