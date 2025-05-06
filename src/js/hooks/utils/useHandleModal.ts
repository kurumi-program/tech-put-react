import { useEffect } from "react";

type Props = {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPostOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useHandleModal = ({ setIsOpen, setIsPostOpen, setIsEditOpen }: Props) => {
  const scrollDisabledAndModalOpen = () => {
    document.body.classList.add("over-hidden");
    setIsOpen?.(true);
  };

  const scrollValidAndModalClose = () => {
    document.body.classList.remove("over-hidden");
    setIsOpen?.(false);
  };

  const scrollDisabledAndPostModalOpen = () => {
    document.body.classList.add("over-hidden");
    setIsPostOpen?.(true);
  };

  const scrollValidAndPostModalClose = () => {
    document.body.classList.remove("over-hidden");
    setIsPostOpen?.(false);
  };

  const scrollDisabledAndEditModalOpen = () => {
    document.body.classList.add("over-hidden");
    setIsEditOpen?.(true);
  };

  const scrollValidAndEditModalClose = () => {
    document.body.classList.remove("over-hidden");
    setIsEditOpen?.(false);
  };

  // 追加: 戻るボタン対応
  useEffect(() => {
    const handlePopState = () => {
      // 全部閉じておく（開いてたものが閉じる）
      document.body.classList.remove("over-hidden");
      setIsOpen?.(false);
      setIsPostOpen?.(false);
      setIsEditOpen?.(false);
    };

    window.addEventListener("popstate", handlePopState);
    //クリーンアップ関数、アンマント時やステートが変わった時に実行される
    return () => window.removeEventListener("popstate", handlePopState);
  }, [setIsOpen, setIsPostOpen, setIsEditOpen]);

  return {
    scrollDisabledAndModalOpen,
    scrollValidAndModalClose,
    scrollDisabledAndPostModalOpen,
    scrollValidAndPostModalClose,
    scrollDisabledAndEditModalOpen,
    scrollValidAndEditModalClose,
  };
};
