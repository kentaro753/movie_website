import "../App.css";
import { img_300, unavailable } from "./config";
import { NavLink } from "react-router-dom";

function MovieItem({
  name,
  slug,
  thumb_url,
}) {
  return (
    <div className="movie-list-item">
      <img
        className="movie-list-item-img"
        src={thumb_url ? `${thumb_url}` : unavailable}
        alt={name}
      />
      <span className="movie-list-item-title">{name}</span>
      {/* <p className="movie-list-item-desc">{overview}</p> */}

      <NavLink
        to={{
          pathname: "/movieinfo/" + `${slug}`,
          aboutProps: { slug },
        }}
        exact
      >
        <button className="movie-list-item-button">Watch</button>
      </NavLink>
    </div>
  );
}

export default MovieItem;
