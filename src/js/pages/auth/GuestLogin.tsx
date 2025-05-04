import React from "react";
import { Footer } from "../../components/footer/Footer";
import { useGuestUserLogin } from "../../hooks/auth/useGuestUserLogin";
import { FormButton } from "../../components/parts/FormButton";

export const GuestLogin = () => {
  const { handleGuestLogin, generalErrors } = useGuestUserLogin();
  return (
    <>
      <div className="login-form">
        <div className="login-form-wrapper border">
          <h1 translate="no" className="logo form-logo text-center">
            TechPut
          </h1>
          {generalErrors && <p className="error-message">{generalErrors}</p>}
          <FormButton onClick={handleGuestLogin} className="login-submit">
            ゲストとしてログイン
          </FormButton>
        </div>
      </div>
      <Footer className="text-center height-50" />
    </>
  );
};
