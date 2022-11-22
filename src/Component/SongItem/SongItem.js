import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrnetIndexSong,
  setInfoSongPlayer,
  setIsPlay,
  setPlaylistSong,
  setSongId,
} from "~/Redux/audioSlice";
import { PauseIcon, PlayIcon } from "../Icons";

import styles from "./SongItem.module.scss";

const cx = classNames.bind(styles);

function SongItem(data) {
  const songId = useSelector((state) => state.audio.songId);
  const currentIndexSong = useSelector((state) => state.audio.currentIndexSong);
  const playlistSong = useSelector((state) => state.audio.playlistSong);
  const isPlay = useSelector((state) => state.audio.isPlay);

  const dispatch = useDispatch();

  const handleClick = (info, song, id) => {
    dispatch(setSongId(id));
    dispatch(setInfoSongPlayer(info));
    dispatch(setPlaylistSong(song));
    dispatch(setIsPlay(true));
    if (playlistSong) {
      let currentSongs;
      playlistSong?.forEach((item, index) => {
        if (item.encodeId === id) currentSongs = index;
      });
      dispatch(setCurrnetIndexSong(currentSongs + 1));
    }
  };
  const handlePause = () => {
    dispatch(setIsPlay(true));
  };
  return (
    <div className={cx("wrapper")}>
      {data?.data?.map((songs) => {
        return (
          <div
            className={cx("inner")}
            key={songs?.encodeId}
            onClick={() => handleClick(songs, data?.data, songs?.encodeId)}
          >
            <div className={cx("controls")}>
              {!isPlay ? (
                <span>
                  <PlayIcon />
                </span>
              ) : (
                <span>
                  <PauseIcon />
                </span>
              )}
            </div>
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
