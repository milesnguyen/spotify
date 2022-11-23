import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentTime,
  setCurrnetIndexSong,
  setInfoSongPlayer,
  setIsPlay,
  setPlaylistSong,
  setSongId,
  setSrcAudio,
} from "~/Redux/audioSlice";
import { PauseIcon, PlayIcon } from "../Icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./SongItem.module.scss";

const cx = classNames.bind(styles);

function SongItem(data) {
  const notify = () => toast.info("Dành cho VIP");

  const songId = useSelector((state) => state.audio.songId);
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
  const handlePause = () => {
    dispatch(setIsPlay(true));
  };
  return (
    <div className={cx("wrapper")}>
      {data?.data?.map((songs) => {
        return (
          <div
            className={cx(
              "inner",
              songId === songs?.encodeId && "play",
              songs?.isWorldWide === false && "vip"
            )}
            key={songs?.encodeId}
          >
            <div
              className={cx("controls")}
              onClick={() => handleClick(songs, data?.data, songs?.encodeId)}
            >
              {songId === songs?.encodeId && isPlay === false ? (
                <span
                  className={cx("icon")}
                  onClick={() => dispatch(setIsPlay(true))}
                >
                  <PlayIcon />
                </span>
              ) : (
                ""
              )}
              {songId === songs?.encodeId && isPlay ? (
                <span
                  className={cx("icon")}
                  onClick={() => dispatch(setIsPlay(false))}
                >
                  <PauseIcon />
                </span>
              ) : (
                ""
              )}
              {songId != songs?.encodeId ? (
                <span
                  className={cx("icon")}
                  onClick={() => dispatch(setIsPlay(true))}
                >
                  <PlayIcon />
                </span>
              ) : (
                ""
              )}
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

              <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
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
