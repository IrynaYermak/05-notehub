import { useState } from 'react';
// import type { Note } from '../../types.ts/note';
import type { fetchNotesResponse } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import useModalControl from '../../hook/useModalControl';
import css from './App.module.css';
import NoteForm from '../NoteForm/NoteForm';

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { isModalOpen, openModal, closeModal } = useModalControl();

  const { data, isError, isLoading, isSuccess } = useQuery<fetchNotesResponse>({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search }),
    enabled: page !== 0,
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;
  console.log(totalPages, page);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              page={page}
              onPageChange={setPage}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>
        {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onSuccess={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
