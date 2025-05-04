import React from "react";
import { UserAvatarImage } from "./UserAvatarImage";

type Props = {
  onNavClick?: () => void;
  src?: string | null;
  userName?: string;
  userUserName?: string;
  createdAt?: string;
};

export const UserInfoWithDate = ({ onNavClick, src, userName, userUserName, createdAt }: Props) => {
  return (
    <div className="flex">
      <div
        onClick={(e) => {
          e.stopPropagation();
          onNavClick?.();
        }}
        className="btn"
      >
        <UserAvatarImage src={src} />
      </div>
      <div>
        <div className="flex">
          <p
            onClick={(e) => {
              e.stopPropagation();
              onNavClick?.();
            }}
            className="hover-underline line-height-12 user-name ml-2"
          >
            {userName}
          </p>
          <p className="line-height-12 post-history ml-2">{createdAt}</p>
        </div>
        <p
          onClick={(e) => {
            e.stopPropagation();
            onNavClick?.();
          }}
          className="hover-underline line-height-12 user-id ml-2"
        >
          {userUserName}
        </p>
      </div>
    </div>
  );
};
