import "../App.css";
import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
import Cookie from "js-cookie";

function TvShow() {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/favorite?userid=${Cookie.get('userid')}`)
      .then((res) => res.json())
      .then((data) => setState(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="container">
      <div className="content-container">
        <div className="movie-list-container">
        <h1 className="movie-list-title" style={{ fontSize: "2.5em" }}>
            Phim Đã Lưu
          </h1>
          <div className="movie-list-wrapper">
            <div className="movie-list">
              {state.map((Val) => {
                const {
                  name,
                  slug,
                  thumb_url,
                } = Val;
                return (
                  <>
                    <MovieItem
                      name={Val.name}
                      slug={Val.slug}
                      thumb_url={Val.thumb_url}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TvShow;
