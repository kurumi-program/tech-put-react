import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from "../../services/authService";
import { useNavigate } from "react-router";

export const useSignOut = () => {
  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsLoggedIn(false);
        setCurrentUser(undefined);

        console.log("サインアウトに成功");
        navigate("/signin");
        window.location.reload();
      } else {
        throw new Error("ログアウトに失敗しました");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return { handleSignOut };
};
