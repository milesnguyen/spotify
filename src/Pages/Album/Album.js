import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SongItem from "~/Component/SongItem";
import styles from "./Album.module.scss";

const cx = classNames.bind(styles);

function Album() {
  const location = useLocation();
  const data = location.pathname;

  const [playList, setPlayList] = useState([]);

  useEffect(() => {
    fetch(
      `https://apizingmp3.herokuapp.com/api/detailplaylist?id=${data.slice(4)}`
    )
      .then((response) => response.json())
      .then((json) => setPlayList(json.data));
  });

  return (
    <div className={cx("wrapper")}>
      <header className={cx("top")}>
        <img src={playList.thumbnail} />
        <div className={cx("inner")}>
          <h2 className={cx("title")}>{playList.title}</h2>
          <p className={cx("desc")}>{playList.sortDescription}</p>
          <span className={cx("artists")}>{playList.artistsNames}</span>
          <span>
            <p>{playList.like} Lượt thích</p> <p>{playList.listen} Lượt nghe</p>
          </span>
        </div>
      </header>
      <div className={cx("body")}>
        <div className={cx("head")}>
          <h4>title</h4>
          <p>album</p>
          <span>time</span>
        </div>
        {[playList].map((songs, index) => {
          return <SongItem key={index} data={songs} />;
        })}
      </div>
    </div>
  );
}

export default Album;