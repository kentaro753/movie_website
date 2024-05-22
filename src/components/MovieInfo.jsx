import "../style.css";
import "../App.css";
import { img_300, unavailable } from "./config";
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

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
      // .then((res) => {
      //   if (res.data.success) {
      //     alert("Lưu phim thành công!");
      //   } else {
      //     alert(
      //       "Lưu phim thất bại!" + res.data.error
      //     );
      //   }
      // })
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
        throw new Error("Failed to fetch history status");
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
          pathname: "/movieinfo/" + slug1 + "/" + Ep.slug,
          aboutProps: { slug: Ep.slug },
        }}
        exact
      >
        {loggedIn ? (
          isWatch ? (
            <button
              className="ep-btn"
              style={{ opacity: 0.5 }}
              onClick={onAddHis}
            >
              {Ep.name}
            </button>
          ) : (
            <button className="ep-btn" onClick={onAddHis}>
              {Ep.name}
            </button>
          )
        ) : (
          <button className="ep-btn">{Ep.name}</button>
        )}
      </NavLink>
    </>
  );
}
function MovieInfo() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  var i = 0;
  const { slug } = useParams();
  const slug1 = slug;
  const [data, setData] = useState();
  const [tap, setTap] = useState();

  // useEffect(() => {
  //   axios
  //     .get(`https://phimapi.com/phim/${slug}`)
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [slug]);

  const fetchTrending = async () => {
    const data1 = await fetch(`https://phimapi.com/phim/${slug}`);
    const dataJ = await data1.json();
    setData(dataJ.movie);
    setTap(dataJ.episodes);
  };

  useEffect(() => {
    if (Cookies.get("username")) {
      setLoggedIn(true);
    }
    fetchTrending();
    checkFavorite();
  }, [slug]);

  const checkFavorite = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/checkFavorite?userid=${Cookies.get(
          "userid"
        )}&slug=${slug}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch favorite status");
      }

      const data = await response.json();
      setIsFavorite(data.saved);
    } catch (error) {
      console.error(error);
      alert("Không thể kiểm tra trạng thái yêu thích");
    }
  };

  const onAddFav = () => {
    axios
      .post("http://localhost:5000/addfav", {
        userid: Cookies.get("userid"),
        slug: data.slug,
        name: data.name,
        thumb_url: data.thumb_url,
      })
      .then((res) => {
        if (res.data.success) {
          alert("Lưu phim thành công!");
          window.location.reload();
        } else {
          alert("Lưu phim thất bại!" + res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const onDeleteFav = () => {
    axios
      .delete("http://localhost:5000/deletefav", {
        params: {
          userid: Cookies.get("userid"),
          slug: data.slug,
        },
      })
      .then((res) => {
        if (res.data.success) {
          alert("Hủy lưu phim thành công!");
          setIsFavorite(false);
          window.location.reload();
        } else {
          alert("Hủy lưu phim thất bại!" + res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <div className="content-container">
        <div className="label">
          <h1 style={{ fontSize: "2.5em" }}>Thông tin phim </h1>
        </div>
        <div className="movie-detail">
          <div
            className="backdrop-image"
            style={{
              backgroundImage: `url(${data?.thumb_url})`,
            }}
          ></div>
          <div>
            <figure className="poster-box movie-poster">
              <img
                src={
                  data && data.poster_url
                    ? `${data && data.poster_url}`
                    : unavailable
                }
                alt={data && data.name}
                className="img-cover"
              />
            </figure>
            <div className="watch-movie">
              {tap &&
                tap.map((Val) => {
                  const { server_name, server_data } = Val;
                  console.log(Val);

                  // Extracting the first element of server_data array
                  const firstChapter = server_data[0];

                  if (firstChapter) {
                    const { name, slug, link_embed } = firstChapter;
                    const onAddHis = () => {
                      axios
                        .post("http://localhost:5000/addhis", {
                          userid: Cookies.get("userid"),
                          slug_phim: slug1,
                          slug_tap: firstChapter.slug,
                        })
                        // .then((res) => {
                        //   if (res.data.success) {
                        //     alert("Lưu phim thành công!");
                        //   } else {
                        //     alert(
                        //       "Lưu phim thất bại!" + res.data.error
                        //     );
                        //   }
                        // })
                        .catch((error) => {
                          console.error("Error:", error);
                        });
                    };
                    return (
                      <div className="server-ep">
                        <NavLink
                          to={{
                            pathname:
                              "/movieinfo/" +
                              `${slug1}` +
                              `/${firstChapter.slug}`,
                            aboutProps: { slug },
                          }}
                          exact
                        >
                          {loggedIn ? (
                            <button className="button-watch" onClick={onAddHis}>
                              XEM PHIM
                            </button>
                          ) : (
                            <button className="button-watch">XEM PHIM</button>
                          )}
                        </NavLink>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <div className="detail-box">
            <div className="detail-content">
              <h1 className="heading" style={{ fontSize: "3.2em" }}>
                {data && data.name}
              </h1>
              <div className="meta-list">
                {/* <div className="meta-item">
                  <span className="span">⭐ {data && data.vote_average}</span>
                </div> */}
                <div className="separator"></div>
                <div className="meta-item">{data && data.time}</div>
                <div className="separator"></div>
                <div className="meta-item">{data && data.year}</div>
                <div className="meta-item card-badge">PG-13</div>
                {/* <p className="genre">Hành động, Khoa học - Viễn tưởng</p> */}
                <p className="overview">{data && data.content}</p>
                <ul className="detail-list">
                  <div className="list-item">
                    <p className="list-name">Có sự tham gia: </p>
                    <p>
                      {data &&
                        data.actor.map((Val) => {
                          if (i == 0) {
                            i = i + 1;
                            console.log(i);
                            return <>{Val}</>;
                          } else {
                            return <>, {Val}</>;
                          }
                        })}
                    </p>
                  </div>
                  <div className="list-item">
                    <p className="list-name">Đạo diễn bởi: </p>
                    <p>{data && data.director}</p>
                  </div>
                </ul>
                {loggedIn ? (
                  isFavorite ? (
                    <button onClick={onDeleteFav} className="button-fav">
                      Hủy Lưu
                    </button>
                  ) : (
                    <button onClick={onAddFav} className="button-fav">
                      Lưu phim
                    </button>
                  )
                ) : (
                  <button
                    disabled
                    style={{ opacity: 0.5 }}
                    className="button-fav"
                  >
                    Lưu phim
                  </button>
                )}
              </div>
            </div>

            <div className="title-wrapper">
              <h3 className="title-large">Tập phim</h3>
            </div>
            <div className="slider-list">
              <div className="slider-inner">
                {/* {video1.map((Val) => {
                  const { type, key, site } = Val;
                  if (
                    (Val.type == "Teaser" || Val.type == "Trailer") &&
                    Val.site == "YouTube"
                  ) {
                    const u =
                      "https://www.youtube.com/embed/" +
                      Val.key +
                      "?theme=dark&color=white&rel=0";
                    return (
                      <>
                        <div className="video-card">
                          <iframe
                            width="500"
                            height="294"
                            src={u}
                            frameBorder="0"
                            allowFullScreen="1"
                          ></iframe>
                        </div>
                      </>
                    );
                  }
                })} */}
                {tap &&
                  tap.map((Val) => {
                    const { server_name, server_data } = Val;

                    console.log(Val);
                    return (
                      <>
                        <div className="server-ep">
                          {Val.server_data.map((Ep) => {
                            const { name, slug, link_embed } = Ep;
                            return (
                              <Episode
                                key={Ep.slug}
                                Ep={Ep}
                                slug1={slug1}
                                loggedIn={loggedIn}
                              />
                            );
                          })}
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
