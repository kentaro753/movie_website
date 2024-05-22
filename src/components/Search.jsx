import "../App.css";
import MovieItem from "./MovieItem";
import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

function Search() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchSearch = async () => {
    const data = await fetch(
      `https://phimapi.com/v1/api/tim-kiem?keyword=${searchText}`
    );
    const responseData = await data.json();
    setContent(responseData.data.items);
  };

  useEffect(() => {
    fetchSearch();
  }, [page]);

  const handleSearch = () => {
    setPage(1); // Reset page when initiating a new search
    fetchSearch();
  };

  const Trigger = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="container">
      <div className="search-bar-container">
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm..." onChange={Trigger} />
        </div>
        <button className="search-button" onClick={handleSearch}>
          <i className="icon-search-bar fas fa-search"></i>
        </button>
      </div>
      <div className="content-container">
        <div className="movie-list-container">
          {/* <h1 className="movie-list-title-search">ĐỀ XUẤT</h1>
          <div className="movie-list-wrapper-home">
            <div className="movie-list-home">
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
              <MovieItem />
            </div>
            <i className="fas fa-chevron-right arrow"></i>
          </div> */}
          <div className="movie-list-wrapper" style={{ top: '30%' }}>
            <div className="movie-list">
              {content &&
                content.map((Val) => {
                  const {
                    _id,
                    name,
                    slug,
                    poster_url,
                    origin_name,
                    thumb_url,
                    year,
                  } = Val;
                  const pic_url = "https://img.phimapi.com/" + Val.thumb_url;
                  return (
                    <>
                      <MovieItem
                      name={Val.name}
                      slug={Val.slug}
                      thumb_url={pic_url}
                    />
                    </>
                  );
                })}
              {totalPages > 1 && <Pagination page={page} setPage={setPage} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
