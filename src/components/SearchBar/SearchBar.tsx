import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';
import { FormEvent } from 'react';

interface SearchBarProps {
  onSubmit: (topic: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const topic = (
      form.elements.namedItem('topic') as HTMLInputElement
    ).value.toLowerCase();
    if (topic.trim() === '') {
      toast.error('Please, fill in the field!', {
        duration: 3000,
      });
      return;
    }
    onSubmit(topic);
    form.reset();
  };
  return (
    <header>
      <form className={css.formWrapper} onSubmit={handleSubmit}>
        <input
          className={css.field}
          name="topic"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <Toaster />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
export default SearchBar;
