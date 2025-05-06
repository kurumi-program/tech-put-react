import * as React from "react";
import { useContext, useState } from "react";
import { useNavigation } from "../../hooks/utils/useNavigation";
import { UserMenu } from "../../user/UserMenu";
import { SearchBox } from "../parts/SearchBox";
import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
  const { currentUser, isLoading } = useContext(AuthContext);
  const { handleNavigate } = useNavigation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (isLoading) return null;

  if (currentUser) {
    return (
      <header className="border-b">
        <div className="flex header-container justify-between">
          <h1
            translate="no"
            className="py-3 header-logo btn logo"
            onClick={() => handleNavigate("/")}
          >
            TechPut
          </h1>
          <div className="search">
            <i className="search-icon fa-solid fa-magnifying-glass"></i>
            <SearchBox />
          </div>
          <div className="flex items-center search-wrapper user-icon">
            <div className="search-hover">
              <i className="search-sp mr-3 fa-solid fa-magnifying-glass"></i>
              <SearchBox className="search-input-sp" />
            </div>
            <div className="user relative">
              <UserMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className="border-b">
        <div className="flex header-container justify-between">
          <h1 className="py-3 header-logo" onClick={() => handleNavigate("/")}>
            TechPut
          </h1>
          <div className="flex items-center search-wrapper">
            <button
              className="border rounded p-2 login-btn"
              onClick={() => handleNavigate("/signin")}
            >
              ログイン
            </button>
          </div>
        </div>
      </header>
    );
  }
};
