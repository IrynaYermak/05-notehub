import axios from 'axios';
import type { Note } from '../types.ts/note';

interface fetchNotesProps {
  searchQuery?: string;
  searchPage?: number;
}

interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface createNoteProps {
  title: string;
  content: string;
  tag: string;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async ({
  searchQuery,
  searchPage,
}: fetchNotesProps): Promise<fetchNotesResponse> => {
  const options = {
    params: {
      query: searchQuery,
      page: searchPage,
    },
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  };

  const response = await axios
    .get('/notes', options)
    .then(response => response.data);

  return response;
};

export const createNote = async (data: createNoteProps) => {
  const response = await axios.post<Note>('/notes', data);
  return response.data;
};

export const deleteNote = async (id: Note['id']) => {
  await axios.delete(`/notes/${id}`);
};
