import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrnetIndexSong,
  setInfoSongPlayer,
  setIsPlay,
  setSongId,
  setSrcAudio,
} from "~/Redux/audioSlice";
import * as songServices from "~/Services/songServices";
import {
  AudioIcon,
  LoopIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  RandomIcon,
} from "../Icons";
import styles from "./PlayBar.module.scss";

const cx = classNames.bind(styles);

function PlayBar(data) {
  const infoSongPlayer = useSelector((state) => state.audio.infoSongPlayer);
  const srcAudio = useSelector((state) => state.audio.srcAudio);
  const songId = useSelector((state) => state.audio.songId);
  const playlistSong = useSelector((state) => state.audio.playlistSong);
  const currentIndexSong = useSelector((state) => state.audio.currentIndexSong);
  const isPlay = useSelector((state) => state.audio.isPlay);
  const dispatch = useDispatch();

  const [Track, setTrack] = useState([]);
  const [Data, setData] = useState([]);
  const [isPlaying, setIsPlaying] = useState();
  const audioRef = useRef();

  useEffect(() => {
    const fetchApi = async () => {
      const data = await songServices.songs(songId);

      dispatch(setSrcAudio(data[128]));
    };
    fetchApi();
  }, [songId]);

  const handleNext = () => {
    dispatch(setCurrnetIndexSong(currentIndexSong + 1));
    dispatch(setSongId(playlistSong[currentIndexSong]?.encodeId));
    dispatch(setInfoSongPlayer(playlistSong[currentIndexSong].title));
    dispatch(setIsPlay(true));
  };
  const handlePrev = () => {
    dispatch(setCurrnetIndexSong(currentIndexSong - 1));
    dispatch(setSongId(playlistSong[currentIndexSong]?.encodeId));
    dispatch(setInfoSongPlayer(playlistSong[currentIndexSong].title));
    dispatch(setIsPlay(true));

    console.log(isPlay);
  };
  const handlePlay = () => {
    if (isPlay) {
      dispatch(setIsPlay(false));
      if (audioRef) {
        audioRef.current.pause();
      }
    } else {
      dispatch(setIsPlay(true));
      if (audioRef) {
        audioRef.current.play();
      }
    }
  };
  const handlePause = () => {
    audioRef.current.pause();
    dispatch(setIsPlay(false));
  };
  useEffect(() => {
    document.title = playlistSong[currentIndexSong].title;
  });
  useEffect(() => {
    if (isPlay) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  });
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("head")}>
          <img
            className={cx("thumb")}
            src={playlistSong[currentIndexSong]?.thumbnail}
            alt={playlistSong[currentIndexSong]?.alias}
          />
          <div className={cx("item")}>
            <p>{playlistSong[currentIndexSong].title}</p>
            <span>{playlistSong[currentIndexSong].artistsNames}</span>
          </div>
        </div>
        <div className={cx("body")}>
          <div className={cx("controls")}>
            <Tippy content={"Random"}>
              <span>
                <RandomIcon />
              </span>
            </Tippy>
            <Tippy content={"Previous"}>
              <span onClick={handlePrev}>
                <PrevIcon />
              </span>
            </Tippy>
            {isPlay ? (
              <Tippy content={"Pause"}>
                <span className={cx("pause")} onClick={handlePause}>
                  <PauseIcon />
                </span>
              </Tippy>
            ) : (
              <Tippy content={"play"}>
                <span className={cx("play")} onClick={handlePlay}>
                  <PlayIcon />
                </span>
              </Tippy>
            )}

            <Tippy content={"Next"}>
              <span onClick={handleNext}>
                <NextIcon />
              </span>
            </Tippy>
            <Tippy content={"Loop"}>
              <span>
                <LoopIcon />
              </span>
            </Tippy>
            <audio ref={audioRef} src={srcAudio} />
          </div>
          <div className={cx("bottom")}>
            <span className={cx("time")}>00:00</span>
            <input
              type="range"
              className={cx("progress")}
              min={0}
              max={playlistSong[currentIndexSong].duration}
            />
            <span className={cx("time")}>
              {" "}
              {Math.floor(playlistSong[currentIndexSong].duration / 60) < 10
                ? "0" + Math.floor(playlistSong[currentIndexSong].duration / 60)
                : Math.floor(playlistSong[currentIndexSong].duration / 60)}
              :
              {playlistSong[currentIndexSong].duration % 60 < 10
                ? "0" + (playlistSong[currentIndexSong].duration % 60)
                : playlistSong[currentIndexSong].duration % 60}
            </span>
          </div>
        </div>
        <div className={cx("footer")}>
          <AudioIcon className={cx("icon")} />
          <input type="range" className={cx("volume")} min={0} max="100" />
        </div>
      </div>
    </div>
  );
}

export default PlayBar;
