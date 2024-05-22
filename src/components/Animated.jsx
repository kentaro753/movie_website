import "../App.css";
import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
import Pagination from "./Pagination";

function Animated() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const fetchTrending = async () => {
    const data = await fetch(
      `https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=${page}`
    );
    const dataJ = await data.json();
    setState(dataJ.data.items);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);
  return (
    <div className="container">
      <div className="content-container">
        <div className="movie-list-container">
          <h1 className="movie-list-title" style={{ fontSize: "2.5em" }}>
            Hoạt Hình
          </h1>
          <div className="movie-list-wrapper">
            <div className="movie-list">
              {state.map((Val) => {
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
            </div>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  );
}

export default Animated;
