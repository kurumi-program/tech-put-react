import { InputArea } from "../../components/header/InputArea";
import { FormButton } from "../../components/parts/FormButton";
import { AuthForm } from "../../components/layout/AuthForm";
import { AuthFooterButton } from "../../components/parts/AuthFooterButton";
import React from "react";
import { useLogin } from "../../hooks/auth/useLogin";
import { useNavigation } from "../../hooks/navigations/useNavigation";

export const Signup = () => {
  const {
    signupErrors,
    handleSubmit,
    generalErrors,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
  } = useLogin();
  const { handleNavigate } = useNavigation();
  return (
    <AuthForm onSubmit={handleSubmit(true)}>
      {<p className="text-red-600 text-sm">{generalErrors}</p>}
      <InputArea type="email" value={email} onChange={setEmail} placeholder="メールアドレス" />
      {signupErrors.email.map((mail, index) => (
        <p className="text-red-600 text-sm" key={index}>
          メールアドレス{mail}
        </p>
      ))}
      <InputArea type="password" value={password} onChange={setPassword} placeholder="パスワード" />
      {signupErrors.password.map((pass, index) => (
        <p className="text-red-600 text-sm" key={index}>
          パスワード{pass}
        </p>
      ))}
      <InputArea
        type="password"
        value={passwordConfirmation}
        onChange={setPasswordConfirmation}
        placeholder="パスワード確認"
      />
      {signupErrors.passwordConfirmation.map((passCon, index) => (
        <p className="text-red-600 text-sm" key={index}>
          パスワード確認{passCon}
        </p>
      ))}
      <FormButton>新規会員登録</FormButton>
      <AuthFooterButton onClick={() => handleNavigate("/signin")}>
        ログインはこちら
      </AuthFooterButton>
    </AuthForm>
  );
};
