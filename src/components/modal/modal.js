import modalStyles from "./modal.module.css";
import ModalOverlay from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import React from "react";
import PropTypes from "prop-types";

const Modal = ({ title, onOverlayClick, onEscKeydown, children }) => {
  React.useEffect(() => {
    window.addEventListener("keydown", onEscKeydown);
    return () => {
      window.removeEventListener("keydown", onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={`${modalStyles.modal__box} p-10`}>
        <div className={modalStyles.modal__header}>
          <h3 className="text text_type_main-large">{title}</h3>
          <button className={modalStyles.modal__button} type="button">
            <CloseIcon type="primary" onClick={onOverlayClick} />
          </button>
        </div>
        {children} {/* Вложенное в компонент содержимое */}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>,
    document.getElementById("modals") //Контейнер под модальные окна
  );
};

export default Modal;
//проверка передаваемых пропсов
Modal.propTypes = {
  title: PropTypes.string,
  onOverlayClick: PropTypes.func.isRequired,
  onEscKeydown: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
