import modalOverlayStyles from "./modalOverlay.module.css";
const ModalOverlay = ({ onClick, children }) => {
  return (
    <div className={modalOverlayStyles.overlay__box} onClick={onClick}>
      {children}
    </div>
  );
};

export default ModalOverlay;
