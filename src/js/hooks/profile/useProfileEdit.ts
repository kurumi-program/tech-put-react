import { useContext } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import { authHeaders } from "../../services/authService";
import { client } from "../../services/client";

type Props = {
  name: string;
  bio: string;
  avatar: File | null;
  githubUrl: string;
};

export const useProfileEdit = ({ name, bio, avatar, githubUrl }: Props) => {
  const { profile, setProfile } = useContext(ProfileContext);
  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("profile[name]", name);
      formData.append("profile[bio]", bio);
      formData.append("profile[githubUrl]", githubUrl);
      if (avatar) {
        formData.append("profile[avatar]", avatar);
      }

      const res = await client.put("/profile", formData, { headers: authHeaders() });

      if (res.data) {
        setProfile(res.data);
      }
    } catch (e) {
      console.error("プロフィールが保存できませんでした", e);
    }
  };

  return { profile, setProfile, handleEditSubmit };
};
