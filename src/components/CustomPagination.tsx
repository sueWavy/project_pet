import Pagination from "react-js-pagination";

interface CustomPaginationProps {
  onPageChange: (pageNumber: number) => void;
  totalItemsCount: number;
  currentPage: number;
  itemsPerPage: number;
}

function CustomPagination({
  onPageChange,
  currentPage,
  itemsPerPage,
  totalItemsCount,
}: CustomPaginationProps) {
  return (
    <Pagination
      activePage={currentPage}
      itemsCountPerPage={itemsPerPage}
      totalItemsCount={totalItemsCount}
      onChange={onPageChange}
      innerClass="pagination flex justify-center space-x-3 items-center p-3 bg-white -mb-5 dark:bg-gray-700"
      itemClass="bg-sky-300 px-2 rounded-full dark:bg-slate-900"
      linkClass="text-white text-lg flex justify-center items-center mobile:text-xs mobile:py-2"
      activeClass="bg-sky-500 px-2 rounded-full dark:bg-yellow-500"
      prevPageText="이전"
      nextPageText="다음"
      firstPageText="처음"
      lastPageText="마지막"
      hideFirstLastPages={false}
    />
  );
}

export default CustomPagination;
