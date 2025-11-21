import css from './SearchBox.module.css';
import { useState } from 'react';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const hendleSearch = () => {};
  return (
    <input
      defaultValue={search}
      onChange={hendleSearch}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
