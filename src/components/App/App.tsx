// import { useState } from 'react'
// import type { Note } from '../../types.ts/note';
import type { fetchNotesResponse } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';

import css from './App.module.css';

function App() {
  const { data, isError, isLoadin, isSuccess } = useQuery<fetchNotesResponse>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
    // enabled:,
    placeholderData: keepPreviousData,
  });
  console.log(data);

  if (!data?.totalPages) {
    return;
  }
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
          {data?.totalPages > 1 && <Pagination totalPages={data?.totalPages} />}
          {/* Кнопка створення нотатки */}
        </header>
        {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}

export default App;
