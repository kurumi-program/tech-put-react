import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { LoginParams } from "../../types/auth";
import { signIn, signUp } from "../../services/authService";
import { useHandleModal } from "../utils/useHandleModal";

export const useLogin = () => {
  const { setIsLoggedIn, setCurrentUser, setFlashMessage } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [signupErrors, setSignupErrors] = useState({
    email: [],
    password: [],
    passwordConfirmation: [],
  });
  const [signinErrors, setSigninErrors] = useState({
    email: [],
    password: [],
  });
  const [generalErrors, setGeneralErrors] = useState("");

  const { setIsLoginModalOpen } = useContext(AuthContext);
  const { scrollValidAndModalClose } = useHandleModal({
    setIsOpen: setIsLoginModalOpen,
  });

  const handleSubmit = (isSignUp: boolean) => async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      setSignupErrors({
        email: [],
        password: [],
        passwordConfirmation: [],
      });
    } else {
      setSigninErrors({
        email: [],
        password: [],
      });
    }
    setGeneralErrors("");

    const params: LoginParams = {
      email,
      password,
      ...(isSignUp && { passwordConfirmation }),
    };

    try {
      const res = isSignUp ? await signUp(params) : await signIn(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setCurrentUser(res.data.data);
        setIsLoggedIn(true);

        navigate("/");
        scrollValidAndModalClose();

        setFlashMessage(isSignUp ? "サインアップに成功しました" : "ログインに成功しました");
        setTimeout(() => {
          setFlashMessage("");
          //リロードは一旦いいや
          // window.location.reload();
        }, 2000);
        console.log("ログイン成功");

        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setGeneralErrors("");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data.errors;
        if (errorData) {
          // 全体エラーが配列で渡ってきた場合
          if (Array.isArray(errorData)) {
            setGeneralErrors(errorData.join("、"));
          } else {
            if (isSignUp) {
              setSignupErrors({
                email: errorData.email || [],
                password: errorData.password || [],
                passwordConfirmation: errorData.passwordConfirmation || [],
              });
            } else {
              setSigninErrors({
                email: errorData.email || [],
                password: errorData.password || [],
              });
            }
          }
        }
      } else {
        setGeneralErrors("予期せぬエラーが発生しました");
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    signupErrors,
    signinErrors,
    generalErrors,
    setGeneralErrors,
    handleSubmit,
  };
};
