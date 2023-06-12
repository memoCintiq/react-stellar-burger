import { useCallback, useState } from "react";

const useModal = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpened(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpened(false);
  }, []);

  return {
    isModalOpened,
    openModal,
    closeModal,
  };
};

export default useModal;
