import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

const rootModal = document.getElementById("modals");

const Modal = ({ children, onClose, title }) => {
  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [onClose]);

  return ReactDOM.createPortal((
    <>
      <div className={`${styles.box} pt-5`}>
        <div className={`${styles.item} pt-5`}>
          <div className={styles.wrapper}>
            {title && (
              <h2 className={`${styles.title} text text_type_main-large`}>
                {title}
              </h2>
            )}
          </div>
          <button
            onClick={onClose}
            className={styles.close}
            aria-label="Закрыть"
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>),
    rootModal
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default React.memo(Modal);
