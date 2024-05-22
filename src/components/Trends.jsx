import "../App.css";
import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
import Pagination from "./Pagination";

function Trends() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const fetchTrending = async () => {
    const data = await fetch(`
  https://api.themoviedb.org/3/trending/movie/week?api_key=55b993abee2aac669e1b738919ecdf65&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
    const dataJ = await data.json(); // fetching data from API in JSON Format
    setState(dataJ.results); //storing that data in the state
  };

  useEffect(() => {
    fetchTrending(); //calling the fetchTrending function only during the initial rendering of the app.
  }, [page]);
  return (
    <div className="container">
      <div className="content-container">
        <div className="label">
          <div className="label-container">
            <label className="label-content">
              Chọn thể loại:
              <select name="selectedMovie" className="label-options">
                <option value="" className="content-select">
                  Action
                </option>
                <option value="" className="content-select">
                  Horror
                </option>
                <option value="" className="content-select">
                  Drama
                </option>
              </select>
            </label>

            <label className="label-content">
              Chọn quốc gia:
              <select name="selectedCountry" className="label-options">
                <option value="" className="content-select">
                  USA
                </option>
                <option value="" className="content-select">
                  UK
                </option>
                <option value="" className="content-select">
                  France
                </option>
              </select>
            </label>

            <label className="label-content">
              Năm:
              <select name="selectedCountry" className="label-options">
                <option value="" className="content-select">
                  2024
                </option>
                <option value="" className="content-select">
                  2023
                </option>
                <option value="" className="content-select">
                  2022
                </option>
              </select>
            </label>
            <div className="apply-chosen">
              <i>LỌC</i>
            </div>
          </div>
        </div>
        <div className="movie-list-container">
          <div className="movie-list-wrapper">
            <div className="movie-list">
              {state.map((Val) => {
                const {
                  name,
                  title,
                  poster_path,
                  overview,
                  release_date,
                  media_type,
                  id,
                } = Val;
                return (
                  <>
                    <MovieItem
                      name={Val.name}
                      title={Val.title}
                      poster_path={Val.poster_path}
                      overview={Val.overview}
                      release_date={Val.release_date}
                      media_type={Val.media_type}
                      id={Val.id}
                    />
                  </>
                );
              })}
              <Pagination page={page} setPage={setPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trends;
