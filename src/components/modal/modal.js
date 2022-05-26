import modalStyles from "./modal.module.css";
import ModalOverlay from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({ title, onClose, children }) => {
  // хук для обработки нажатия Esc
  useEffect(() => {
    const handleEscKeydown = (event) => {
      event.key === "Escape" && onClose();
    };
    window.addEventListener("keydown", handleEscKeydown);
    return () => {
      window.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={`${modalStyles.modal__box} p-10`}>
        <div className={modalStyles.modal__header}>
          <h3 className="text text_type_main-large">{title}</h3>
          <button className={modalStyles.modal__button} type="button">
            <CloseIcon type="primary" onClick={onClose} />
          </button>
        </div>
        {children} {/* Вложенное в компонент содержимое */}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    document.getElementById("modals") //Контейнер под модальные окна
  );
};

export default Modal;
//проверка передаваемых пропсов
Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
