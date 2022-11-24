import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SongItem from "~/Component/SongItem";
import styles from "./Album.module.scss";
import * as playListServices from "~/Services/playListServices";
import { useDispatch } from "react-redux";
import { setPlaylistId } from "~/Redux/audioSlice";

const cx = classNames.bind(styles);

function Album() {
  const location = useLocation();
  const data = location.pathname;

  const dispatch = useDispatch();

  const [playList, setPlayList] = useState([]);
  // useEffect(() => {
  //   fetch(
  //     `https://apizingmp3.herokuapp.com/api/detailplaylist?id=${data.slice(4)}`
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setPlayList(json.data));
  // });

  useEffect(() => {
    const fetchApi = async () => {
      const res = await playListServices.album(`=${data.slice(4)}`);
      setPlayList(res);
    };
    fetchApi();
  }, [data]);

  return (
    <div className={cx("wrapper")}>
      <header className={cx("top")}>
        <img src={playList.thumbnail} />
        <div className={cx("inner")}>
          <h2 className={cx("title")}>{playList.title}</h2>
          <p className={cx("desc")}>{playList.sortDescription}</p>
          <span className={cx("artists")}>{playList.artistsNames}</span>
          <span>
            <p>{`${Math.round(playList.like / 1000)}`} Lượt thích</p>
            <p>{`${Math.round(playList.listen / 1000)}`} Lượt nghe</p>
          </span>
        </div>
      </header>
      <div className={cx("body")}>
        <div className={cx("head")}>
          <h2>#</h2>
          <h4>title</h4>
          <p>album</p>
          <span>time</span>
        </div>
        {[playList?.song?.items].map((songs, index) => {
          return <SongItem data={songs} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Album;
