import { useContext, useState } from "react";
import { client } from "../../services/client";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { authHeaders } from "../../services/authService";

export const useGuestUserLogin = () => {
  const { setIsLoggedIn, setCurrentUser, setFlashMessage } = useContext(AuthContext);
  const navigate = useNavigate();
  const [generalErrors, setGeneralErrors] = useState("");

  const handleGuestLogin = async () => {
    try {
      const res = await client.post(`/auth/guest_login`, {});
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setCurrentUser(res.data.user);
        setIsLoggedIn(true);

        navigate("/");

        setFlashMessage("ゲストログインに成功しました");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        console.log("ログイン成功");

        setGeneralErrors("");
      }
    } catch (e) {
      console.error("ゲストログインに失敗しました", e);
      setGeneralErrors("ゲストログインに失敗しました");
      setFlashMessage("ゲストログインに失敗しました");
    }
  };

  // ゲストログアウト処理
  const handleGuestLogout = async () => {
    try {
      const res = await client.delete("/auth/sign_out", { headers: authHeaders() });

      if (res.status === 200) {
        // クッキーを削除
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
      console.error(e);
      setFlashMessage("ログアウトに失敗しました");
    }
  };

  return {
    handleGuestLogin,
    handleGuestLogout,
    generalErrors,
  };
};
