import React from "react";
const pagination = [1, 2, 3, 4, 5];

interface PaginationProps {
  activePage: number;
  setActivePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  activePage,
  setActivePage,
}) => {
  return (
    <div className="paginationContainer">
      {pagination.map((item, index) => (
        <button
          key={index}
          className={`pagination ${activePage === item ? "active" : ""}`}
          onClick={() => setActivePage(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
