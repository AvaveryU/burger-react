import modalOverlayStyles from "./modalOverlay.module.css";
import { FunctionComponent } from "react";
import { TModalProps } from "../../utils/types";

const ModalOverlay: FunctionComponent<TModalProps> = ({ onClose }) => {
  return <div className={modalOverlayStyles.overlay__box} onClick={onClose} />;
};

export default ModalOverlay;
