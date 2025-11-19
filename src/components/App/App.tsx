import { useState } from 'react';
// import type { Note } from '../../types.ts/note';
import type { fetchNotesResponse } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';

import css from './App.module.css';

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const { data, isError, isLoading, isSuccess } = useQuery<fetchNotesResponse>({
    queryKey: ['notes', page, query],
    queryFn: () => fetchNotes(page, query),
    // enabled: page,
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
          {totalPages > 1 && <Pagination totalPages={totalPages} />}
          {/* Кнопка створення нотатки */}
        </header>
        {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}

export default App;
