import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

export default function ImageModal({ isOpen, onRequestClose, style, image }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      {image && (
        <div>
          <img className={css.modalImage} src={image} />
        </div>
      )}
    </Modal>
  );
}
