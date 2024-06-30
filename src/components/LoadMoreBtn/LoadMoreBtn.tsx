import React from 'react';
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  loadMore: () => void;
}
const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ loadMore }) => {
  return (
    <button className={css.loadMoreBtn} onClick={loadMore}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;
