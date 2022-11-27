import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setCurrentTime,
  setCurrnetIndexSong,
  setInfoSongPlayer,
  setIsPlay,
  setPlaylistSong,
  setSongId,
} from "~/Redux/audioSlice";

import styles from "./SongItem.module.scss";

const cx = classNames.bind(styles);

function SongItem(data) {
  const songId = useSelector((state) => state.audio.songId);
  const playlistId = useSelector((state) => state.audio.playlistId);
  const currentIndexSong = useSelector((state) => state.audio.currentIndexSong);
  const playlistSong = useSelector((state) => state.audio.playlistSong);
  const isPlay = useSelector((state) => state.audio.isPlay);

  const dispatch = useDispatch();

  const handleClick = (info, song, id) => {
    dispatch(setSongId(id));
    dispatch(setInfoSongPlayer(info));
    dispatch(setPlaylistSong(song));
    dispatch(setCurrentTime(0));
    dispatch(setIsPlay(true));
    if (playlistSong) {
      let currentSongs;
      playlistSong?.forEach((item, index) => {
        if (item.encodeId === id) currentSongs = index;
      });
      dispatch(setCurrnetIndexSong(currentSongs));
    }
  };
  return (
    <div className={cx("wrapper")}>
      {data?.data?.map((songs, index) => {
        return (
          <div
            onClick={() => handleClick(songs, data?.data, songs?.encodeId)}
            className={cx(
              "inner",
              songId === songs?.encodeId && "play",
              songs?.isWorldWide === false && "vip"
            )}
            key={songs?.encodeId}
          >
            <div className={cx("id")}>
              <p>{index + 1}</p>
              <img
                className={cx("equalizer")}
                src="https://open.spotifycdn.com/cdn/images/equaliser-green.1184ed87.svg"
              />
            </div>
            <div className={cx("head")}>
              <img src={songs.thumbnailM} className={cx("thumb")} />
              <div className={cx("items")}>
                <h1>{songs.title}</h1>
                <span>{songs.artistsNames}</span>
              </div>

              {songs.isWorldWide === false ? (
                <span className={cx("tag")}>VIP</span>
              ) : (
                <span></span>
              )}
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
