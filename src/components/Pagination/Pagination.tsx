import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const [page, setPage] = useState(1);

  return (
    <>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={4}
        // breakLabel="..."
        nextLabel="->"
        onPageChange={({ selected }) => setPage(selected + 1)}
        previousLabel="<-"
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        // renderOnZeroPageCount={null}
      />
    </>
  );
}
