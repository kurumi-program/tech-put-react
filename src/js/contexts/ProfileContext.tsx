import * as React from "react";
import { createContext, PropsWithChildren, useState } from "react";
import { Profile } from "../types/profile";
import { UserProfile } from "../types/userProfile";
import { Post } from "../types/post";

type ProfileContextType = {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isProfileLoading: boolean;
  setIsProfileLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isUserProfileLoading: boolean;
  setIsUserProfileLoading: React.Dispatch<React.SetStateAction<boolean>>;
  profilePostList: Post[];
  setProfilePostList: React.Dispatch<React.SetStateAction<Post[]>>;
  profileLikedPostList: Post[];
  setProfileLikedPostList: React.Dispatch<React.SetStateAction<Post[]>>;
  profileLearnPostList: Post[];
  setProfileLearnPostList: React.Dispatch<React.SetStateAction<Post[]>>;
  userPostList: Post[];
  setUserPostList: React.Dispatch<React.SetStateAction<Post[]>>;
  searchUserList: UserProfile[];
  setSearchUserList: React.Dispatch<React.SetStateAction<UserProfile[]>>;
};

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  setProfile: () => {},
  userProfile: null,
  setUserProfile: () => {},
  isProfileLoading: false,
  setIsProfileLoading: () => {},
  isUserProfileLoading: false,
  setIsUserProfileLoading: () => {},
  profilePostList: [],
  setProfilePostList: () => {},
  profileLikedPostList: [],
  setProfileLikedPostList: () => {},
  profileLearnPostList: [],
  setProfileLearnPostList: () => {},
  userPostList: [],
  setUserPostList: () => {},
  searchUserList: [],
  setSearchUserList: () => {},
});

export const ProfileProvider = ({ children }: PropsWithChildren) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true);
  const [isUserProfileLoading, setIsUserProfileLoading] = useState<boolean>(true);
  const [profilePostList, setProfilePostList] = useState<Post[]>([]);
  const [profileLikedPostList, setProfileLikedPostList] = useState<Post[]>([]);
  const [profileLearnPostList, setProfileLearnPostList] = useState<Post[]>([]);
  const [userPostList, setUserPostList] = useState<Post[]>([]);
  const [searchUserList, setSearchUserList] = useState<UserProfile[]>([]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        userProfile,
        setUserProfile,
        isProfileLoading,
        setIsProfileLoading,
        isUserProfileLoading,
        setIsUserProfileLoading,
        profilePostList,
        setProfilePostList,
        profileLikedPostList,
        setProfileLikedPostList,
        profileLearnPostList,
        setProfileLearnPostList,
        userPostList,
        setUserPostList,
        searchUserList,
        setSearchUserList,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
