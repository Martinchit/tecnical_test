import React from 'react';
import { Pagination } from 'react-bootstrap';

interface StockListPaginationProps {
  currentPage: number;
  totalPages: number;
  onPaginationButtonClickHandler: (page: number) => void;
}

export const StockListPagination: React.FC<StockListPaginationProps> = ({
  currentPage,
  totalPages,
  onPaginationButtonClickHandler,
}) => {
  const ref = currentPage + 1 >= totalPages ? totalPages - currentPage + 3 : 5;
  const ellipsisMin = currentPage - 5 < 1 ? 1 : currentPage - 5;
  const ellipsisMax = currentPage + 5 > totalPages ? totalPages : currentPage + 5;
  return (
    <Pagination>
      <Pagination.First onClick={() => onPaginationButtonClickHandler(1)} />
      {currentPage > 3 ? (
        <>
          <Pagination.Item onClick={() => onPaginationButtonClickHandler(1)}>
            {1}
          </Pagination.Item>
          <Pagination.Ellipsis
            onClick={() => onPaginationButtonClickHandler(ellipsisMin)}
          />
        </>
      ) : null}
      {totalPages > 4
        ? [...Array(ref)].map((_, i) => {
            const p = currentPage < 3 ? 1 + i : currentPage + (-2 + i);
            return (
              <Pagination.Item
                onClick={() => onPaginationButtonClickHandler(p)}
                key={p}
                active={currentPage === p}
              >
                {p}
              </Pagination.Item>
            );
          })
        : [...Array(totalPages)].map((_, i) => {
            const p = currentPage < 3 ? 1 + i : currentPage + (-2 + i);
            return (
              <Pagination.Item
                onClick={() => onPaginationButtonClickHandler(p)}
                key={p}
                active={currentPage === p}
              >
                {p}
              </Pagination.Item>
            );
          })}
      {currentPage < totalPages - 2 && totalPages > 5 ? (
        <>
          <Pagination.Ellipsis
            onClick={() => onPaginationButtonClickHandler(ellipsisMax)}
          />
          <Pagination.Item
            onClick={() => onPaginationButtonClickHandler(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        </>
      ) : null}
      <Pagination.Last onClick={() => onPaginationButtonClickHandler(totalPages)} />
    </Pagination>
  );
};
