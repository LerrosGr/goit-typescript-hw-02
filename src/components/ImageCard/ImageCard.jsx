import css from './ImageCard.module.css';

export default function ImageCard({ image, openModal }) {
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
}
