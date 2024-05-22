import React from "react";
import '../App.css'

const Pagination = ({ page, setPage }) => {
  const Previous = () => {
    if (page !== 1) {
      setPage(page - 1);
    } else {
      setPage(page);
    }
  };

  const Next = () => {
    if (page < 101) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <div className="pagination-container">
        <button
          className="paging-button"
          onClick={Previous}
        >
          Previous
        </button>
        <span className="paging-button">{page}</span>
        <button
          className="paging-button"
          onClick={Next}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
