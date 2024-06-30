import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGalerry.module.css';
import { Image } from '../../images-api';

interface ImageGalleryProps {
  images: Image[];
  openModal: (image: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={css.mainList}>
      {images.map(image => (
        <li key={image.id} className={css.listItem}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
