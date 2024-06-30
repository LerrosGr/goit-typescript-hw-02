import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value.toLowerCase();
    if (form.elements.topic.value.trim() === '') {
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
}
