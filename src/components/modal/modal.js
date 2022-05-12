import modalStyles from "./modal.module.css";
import ModalOverlay from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import React from "react";
// import ingredientPropType from "../../utils/prop-types.js";
// import PropTypes from "prop-types";

const Modal = ({ title, onOverlayClick, onEscKeydown, children }) => {
  React.useEffect(() => {
    document.addEventListener("keydown", onEscKeydown);
    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onOverlayClick}>
        <div className={`${modalStyles.modal__box} p-10`}>
          <div className={modalStyles.modal__header}>
            <h3 className="text text_type_main-large">{title}</h3>
            <button className={modalStyles.modal__button} type="button">
              <CloseIcon type="primary" onClick={onOverlayClick} />
            </button>
          </div>
          {children} {/* Вложенное в компонент содержимое */}
        </div>
      </ModalOverlay>
    </>,
    document.getElementById("modals") //Контейнер под модальные окна
  );
};

export default Modal;
