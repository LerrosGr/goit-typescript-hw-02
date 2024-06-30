import { useState, useEffect } from 'react';

import { getImages } from './images-api';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGalerry';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';

import css from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    async function fetchImages() {
      try {
        setIsLoading(true);
        setIsError(false);
        const { results, total_pages } = await getImages(searchQuery, page);
        setImages(prevState => [...prevState, ...results]);
        setShowBtn(total_pages !== page);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [searchQuery, page]);

  const handleSubmit = async topic => {
    setSearchQuery(topic);
    setPage(1);
    setImages([]);
  };
  const handleLoadMore = async () => {
    setPage(page + 1);
  };

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

  const openModal = image => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage('');
  };

  return (
    <div className={css.mainWrapper}>
      <SearchBar onSubmit={handleSubmit} />
      {isError && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {images.length > 0 && showBtn && !isLoading && (
        <LoadMoreBtn loadMore={handleLoadMore} />
      )}
      {isLoading && <Loader />}

      <ImageModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        image={selectedImage}
        style={customStyles}
      />
    </div>
  );
}
