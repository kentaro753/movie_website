import { NavLink, useParams } from "react-router-dom";
import "../App.css";
import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import Cookies from "js-cookie";
import axios from "axios";
// import DPlayer from "dplayer";
function Episode({ Ep, slug1, loggedIn }) {
  const [isWatch, setIsWatch] = useState(false);
  useEffect(() => {
    checkHistory();
  }, []);

  const onAddHis = () => {
    axios
      .post("http://localhost:5000/addhis", {
        userid: Cookies.get("userid"),
        slug_phim: slug1,
        slug_tap: Ep.slug,
      })
      .then((res) => {
        if (res.data.success) {
          //alert("Lưu phim thành công!");
        } else {
          // alert(
          //   "Lưu phim thất bại!" + res.data.error
          // );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const checkHistory = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/checkHistory?userid=${Cookies.get(
          "userid"
        )}&slug_phim=${slug1}&slug_tap=${Ep.slug}`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch history status"
        );
      }

      const data = await response.json();
      setIsWatch(data.watched);
    } catch (error) {
      console.error(error);
      //alert("Không thể kiểm tra lịch sử");
    }
  };
  // console.log(Ep);
  return (
    <>
      <NavLink
        to={{
          pathname: "/movieinfo/" + slug1 + "/" + Ep.slug, aboutProps: { slug: Ep.slug },
        }}
        exact
      >
        {loggedIn ? (
          isWatch ? (
            <button
              className="ep"
              style={{ opacity: 0.5 }}
              onClick={onAddHis}
            >
              {Ep.name}
            </button>
          ) : (
            <button
              className="ep"
              onClick={onAddHis}
            >
              {Ep.name}
            </button>
          )
        ) : (
          <button className="ep">
            {Ep.name}
          </button>
        )}
      </NavLink>
    </>
  );
}
function PlayVideo() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { slug } = useParams();
  const { EpSlug } = useParams();
  const slug1 = slug;
  let url_phim;

  const [tap, setTap] = useState();
  const [state, setState] = useState([]);

  const fetchTrending = async () => {
    const data1 = await fetch(`https://phimapi.com/phim/${slug}`);
    const dataJ = await data1.json();

    setTap(dataJ.episodes);
  };

  useEffect(() => {
    if (Cookies.get("username")) {
      setLoggedIn(true);
    }
    fetchTrending();
  }, [slug]);

  const fetchTrending1 = async () => {
    const data = await fetch(`https://phimapi.com/danh-sach/phim-moi-cap-nhat?`);
    const dataJ = await data.json(); // fetching data from API in JSON Format
    setState(dataJ.items.slice(0, 4)); //storing that data in the state
  };

  useEffect(() => {
    fetchTrending1(); //calling the fetchTrending function only during the initial rendering of the app.
  }, []);

  return (
    <>
      <div className="container">
        <div className="container-play-video">
          {tap &&
            tap.map((Val) => {
              const { server_name, server_data } = Val;
              if (Val.server_name == "#Hà Nội") {
                Val.server_data.map((Ep) => {
                  const { name, slug, link_embed } = Ep;
                  if (Ep.slug == EpSlug) {
                    console.log(Ep.link_embed);
                    url_phim = Ep.link_embed;
                  }

                  // return setSelectedLink(Ep.link_embed);
                });
              }
            })}
          <iframe
            width="778"
            height="495"
            src={url_phim}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        {tap &&
          tap.map((Val) => {
            const { server_name, server_data } = Val;
            console.log(Val);
            return (
              <>
                <div className="border-list-ep">
                  <div className="list-ep">
                    <h3 className="server-name">TỔNG HỢP</h3>
                    {Val.server_data.map((Ep) => {
                            const { name, slug, link_embed } = Ep;
                            return(
                              <Episode key={Ep.slug} Ep={Ep} slug1={slug1} loggedIn = {loggedIn}/>
                            );
                          })}
                  </div>
                </div>
              </>
            );
          })}
        <div className="movie-list-container-left">
          <h1 className="movie-list-title-left">MỚI CẬP NHẬT</h1>
          <div className="movie-list-wrapper-home-left">
            <div className="movie-list-home-left">
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
                return (
                  <>
                    <MovieItem
                      _id={Val._id}
                      name={Val.name}
                      slug={Val.slug}
                      poster_url={Val.poster_url}
                      origin_name={Val.origin_name}
                      thumb_url={Val.thumb_url}
                      year={Val.year}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PlayVideo;
