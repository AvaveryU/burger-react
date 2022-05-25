import modalOverlayStyles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {
  return <div className={modalOverlayStyles.overlay__box} onClick={onClose} />;
};

export default ModalOverlay;
//проверка передаваемых пропсов
ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
