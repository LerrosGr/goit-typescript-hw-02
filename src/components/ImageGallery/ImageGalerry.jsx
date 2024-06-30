import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGalerry.module.css';

export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.mainList}>
      {images.map(image => (
        <li key={image.id} className={css.listItem}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
}
