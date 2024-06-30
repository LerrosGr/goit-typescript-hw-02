import { useState, useEffect } from 'react';

import { getImages } from '../../images-api';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGalerry';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal';

import { Image } from '../../images-api';
import { ApiResponse } from '../../images-api';

import css from './App.module.css';

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showBtn, setShowBtn] = useState<boolean>(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    async function fetchImages() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await getImages(searchQuery, page);
        const { results, total_pages } = response as ApiResponse;
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

  const handleSubmit = async (topic: string) => {
    setSearchQuery(topic);
    setPage(1);
    setImages([]);
  };
  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  const openModal = (image: string) => {
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
      />
    </div>
  );
}
