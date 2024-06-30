import css from './ImageCard.module.css';
import { Image } from '../../images-api';

interface ImageCardProps {
  image: Image;
  openModal: (image: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  return (
    <div>
      <img
        className={css.image}
        onClick={() => openModal(image.urls.regular)}
        src={image.urls.small}
        alt={image.alt_description}
      />
      <div className={css.contentWrapper}>
        <p>LIKES: {image.likes}</p>

        <p>{image.alt_description}</p>
      </div>
    </div>
  );
};
export default ImageCard;
