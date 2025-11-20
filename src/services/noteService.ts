import axios from 'axios';
import type { Note } from '../types.ts/note';

interface fetchNotesProps {
  seearch: string;
  page: number;
}

export interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface createNoteProps {
  title: string;
  content: string;
  tag: string;
}

const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = myToken;

export const fetchNotes = async ({
  seearch,
  page,
}: fetchNotesProps): Promise<fetchNotesResponse> => {
  const options = {
    params: {
      page,
      perPage: 12,
      seearch,
    },
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  };

  const response = await axios
    .get('/notes', options)
    .then(response => response.data);

  console.log('API response →', response);
  return response;
};

export const createNote = async (data: createNoteProps) => {
  const response = await axios.post<Note>('/notes', data);
  return response.data;
};

export const deleteNote = async (id: Note['id']) => {
  await axios.delete(`/notes/${id}`);
};
