import modalOverlayStyles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClick }) => {
  return <div className={modalOverlayStyles.overlay__box} onClick={onClick} />;
};

export default ModalOverlay;
//проверка передаваемых пропсов
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
