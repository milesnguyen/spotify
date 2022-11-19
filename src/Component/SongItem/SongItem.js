import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import {
  setCurrnetIndexSong,
  setInfoSongPlayer,
  setPlaylistSong,
  setSongId,
} from "~/Redux/audioSlice";

import styles from "./SongItem.module.scss";

const cx = classNames.bind(styles);

function SongItem(data) {
  const songId = useSelector((state) => state.audio.songId);
  const currentIndexSong = useSelector((state) => state.audio.currentIndexSong);
  const playlistSong = useSelector((state) => state.audio.playlistSong);

  const dispatch = useDispatch();

  const handlePlay = (title, song, id) => {
    dispatch(setSongId(id));
    dispatch(setInfoSongPlayer(title));
    dispatch(setPlaylistSong(song));

    if (playlistSong) {
      let currentSongs;
      playlistSong?.forEach((item, index) => {
        if (item.encodeId === id) currentSongs = index;
      });
      dispatch(setCurrnetIndexSong(currentSongs + 1));
    }
  };

  return (
    <div className={cx("wrapper")}>
      {data?.data?.map((songs) => {
        return (
          <div
            className={cx("inner")}
            key={songs?.encodeId}
            onClick={() =>
              handlePlay(songs?.title, data?.data, songs?.encodeId)
            }
          >
            <div className={cx("head")}>
              <img src={songs.thumbnailM} className={cx("thumb")} />
              <div className={cx("items")}>
                <h1>{songs.title}</h1>
                <span>{songs.artistsNames}</span>
              </div>
            </div>
            <div className={cx("album")}>
              <span>{songs?.album?.title}</span>
            </div>
            <div className={cx("time")}>
              {Math.floor(songs.duration / 60) < 10
                ? "0" + Math.floor(songs.duration / 60)
                : Math.floor(songs.duration / 60)}
              :
              {songs.duration % 60 < 10
                ? "0" + (songs.duration % 60)
                : songs.duration % 60}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SongItem;
