import Modal from 'react-modal';
import css from './ImageModal.module.css';
import React from 'react';

Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90vw',
    maxHeight: '90vh',
    padding: 0,
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};
interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  image,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      {image && (
        <div>
          <img className={css.modalImage} src={image} />
        </div>
      )}
    </Modal>
  );
};
export default ImageModal;
