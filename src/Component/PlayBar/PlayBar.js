import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setCurrentIndexSongRandom,
  setCurrentTime,
  setCurrnetIndexSong,
  setInfoSongPlayer,
  SetIsMute,
  setIsPlay,
  setLoop,
  setRandom,
  setSongId,
  setSrcAudio,
  setVolume,
} from "~/Redux/audioSlice";
import * as songServices from "~/Services/songServices";
import {
  AudioIcon,
  AudioIcon0,
  AudioIcon1,
  LoopActiceIcon,
  LoopIcon,
  MuteIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  RandomActiveIcon,
  RandomIcon,
} from "../Icons";
import styles from "./PlayBar.module.scss";

const cx = classNames.bind(styles);
var intervalid;

function PlayBar(data) {
  const infoSongPlayer = useSelector((state) => state.audio.infoSongPlayer);
  const srcAudio = useSelector((state) => state.audio.srcAudio);
  const songId = useSelector((state) => state.audio.songId);
  const playlistSong = useSelector((state) => state.audio.playlistSong);
  const currentIndexSong = useSelector((state) => state.audio.currentIndexSong);
  const isPlay = useSelector((state) => state.audio.isPlay);
  const isMute = useSelector((state) => state.audio.isMute);
  const isLoop = useSelector((state) => state.audio.isLoop);
  const volume = useSelector((state) => state.audio.volume);
  const isRandom = useSelector((state) => state.audio.isRandom);
  const currentTime = useSelector((state) => state.audio.currentTime);
  const currentIndexSongRandom = useSelector(
    (state) => state.audio.currentIndexSongRandom
  );
  const dispatch = useDispatch();
  const [Track, setTrack] = useState([]);
  const [Data, setData] = useState([]);
  const [isPlaying, setIsPlaying] = useState();
  const audioRef = useRef();
  const volumeRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await songServices.songs(songId);
      if (data) {
        dispatch(setSrcAudio(data[128]));
      } else {
        dispatch(setIsPlay(false));
      }
    };
    fetchApi();
  }, [songId]);
  const notify = () => toast.info("Dành cho VIP");

  const handleNext = () => {
    if (isRandom) {
      const randomIndex = Math.round(Math.random() * playlistSong?.length) - 1;
      dispatch(setIsPlay(true));
      dispatch(setCurrentIndexSongRandom(randomIndex));
      dispatch(setSongId(playlistSong[currentIndexSongRandom]?.encodeId));
      dispatch(setInfoSongPlayer(playlistSong[currentIndexSongRandom]?.title));
      if (playlistSong[currentIndexSongRandom + 1]?.isWorldWide === false) {
        notify();
        dispatch(setSrcAudio(""));
        dispatch(setCurrnetIndexSong(currentIndexSongRandom + 1));
        dispatch(setSongId(playlistSong[currentIndexSongRandom + 1]?.encodeId));
        dispatch(setInfoSongPlayer(playlistSong[currentIndexSongRandom].title));
        dispatch(setIsPlay(false));
        return;
      }
    } else {
      dispatch(setIsPlay(true));
      dispatch(setCurrnetIndexSong(currentIndexSong + 1));
      dispatch(setSongId(playlistSong[currentIndexSong + 1]?.encodeId));
      dispatch(setInfoSongPlayer(playlistSong[currentIndexSong].title));
      if (playlistSong[currentIndexSong + 1]?.isWorldWide === false) {
        notify();
        dispatch(setSrcAudio(""));
        dispatch(setCurrnetIndexSong(currentIndexSong + 1));
        dispatch(setSongId(playlistSong[currentIndexSong + 1]?.encodeId));
        dispatch(setInfoSongPlayer(playlistSong[currentIndexSong].title));
        dispatch(setIsPlay(false));
        return;
      }
    }
  };
  const handlePrev = () => {
    if (playlistSong[currentIndexSong - 1]?.isWorldWide === false) {
      notify();
      dispatch(setIsPlay(false));
    } else {
      dispatch(setCurrnetIndexSong(currentIndexSong - 1));
      dispatch(setSongId(playlistSong[currentIndexSong - 1]?.encodeId));
      dispatch(setInfoSongPlayer(playlistSong[currentIndexSong].title));
    }
  };
  const handleShuffle = () => {
    if (isRandom) {
      dispatch(setRandom(false));
    } else {
      dispatch(setCurrentIndexSongRandom(-1));
      dispatch(setRandom(true));
    }
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
  const handleMute = () => {
    dispatch(SetIsMute(true));
    dispatch(setVolume(0));
    audioRef.current.volume = 0;
  };
  const handleUnMute = () => {
    dispatch(SetIsMute(false));
    if (volume === 0) {
      dispatch(setVolume(50));
      audioRef.current.volume = 50 / 100;
    }
  };
  const handleChange = (e) => {
    dispatch(setVolume(e.target.value));
    audioRef.current.volume = e.target.value / 100;
  };
  useEffect(() => {
    if (isPlay) {
      intervalid = setInterval(() => {
        dispatch(setCurrentTime(Math.round(audioRef.current.currentTime)));
      }, 1000);
    } else {
      intervalid && clearInterval(intervalid);
    }
  }, [isPlay]);
  const handleChangeProgressSong = (value) => {
    dispatch(setCurrentTime(value));
    audioRef.current.currentTime = value;
  };
  useEffect(() => {
    document.title = playlistSong[currentIndexSong]?.title;
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
            <p>{playlistSong[currentIndexSong]?.title}</p>
            <span>{playlistSong[currentIndexSong]?.artistsNames}</span>
          </div>
        </div>
        <div className={cx("body")}>
          <div className={cx("controls")}>
            <span>
              {isRandom ? (
                <Tippy content={"Disable Shuffle"}>
                  <span
                    onClick={() => {
                      dispatch(setRandom(false));
                    }}
                  >
                    <RandomActiveIcon />
                  </span>
                </Tippy>
              ) : (
                <Tippy content={"Enable Shuffle"}>
                  <span onClick={handleShuffle}>
                    <RandomIcon />
                  </span>
                </Tippy>
              )}
            </span>

            <Tippy content={"Previous"}>
              <span onClick={handlePrev} className={cx(isRandom && "random")}>
                <PrevIcon />
              </span>
            </Tippy>

            <div>
              {isPlay ? (
                <Tippy content={"Pause"}>
                  <span className={cx("pause")} onClick={handlePause}>
                    <PauseIcon />
                  </span>
                </Tippy>
              ) : (
                <Tippy content={"play"}>
                  <span
                    className={cx(
                      "play",
                      playlistSong[currentIndexSong]?.isWorldWide === false &&
                        "play-vip"
                    )}
                    onClick={handlePlay}
                  >
                    <PlayIcon />
                  </span>
                </Tippy>
              )}
            </div>

            <Tippy content={"Next"}>
              <span onClick={handleNext}>
                <NextIcon />
              </span>
            </Tippy>
            {isLoop ? (
              <Tippy content={"Disable Repeat"}>
                <span onClick={() => dispatch(setLoop(false))}>
                  <LoopActiceIcon />
                </span>
              </Tippy>
            ) : (
              <Tippy content={"Enable Repeat"}>
                <span onClick={() => dispatch(setLoop(true))}>
                  <LoopIcon />
                </span>
              </Tippy>
            )}

            <audio
              ref={audioRef}
              src={srcAudio}
              loop={isLoop}
              onEnded={handleNext}
            />
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
          <div className={cx("bottom")}>
            <span className={cx("time")}>
              {Math.floor(currentTime / 60) < 10
                ? "0" + Math.floor(currentTime / 60)
                : Math.floor(currentTime / 60)}
              :
              {currentTime % 60 < 10
                ? "0" + (currentTime % 60)
                : currentTime % 60}
            </span>
            <div className={cx("range")}>
              <input
                onChange={(e) => handleChangeProgressSong(e.target.value)}
                type="range"
                className={cx("progress")}
                value={currentTime}
                min={0}
                max={
                  isRandom
                    ? playlistSong[currentIndexSong]?.duration
                    : playlistSong[currentIndexSongRandom]?.duration
                }
              />
            </div>

            <span className={cx("time")}>
              {Math.floor(playlistSong[currentIndexSong]?.duration / 60) < 10
                ? "0" +
                  Math.floor(playlistSong[currentIndexSong]?.duration / 60)
                : Math.floor(playlistSong[currentIndexSong]?.duration / 60)}
              :
              {playlistSong[currentIndexSong]?.duration % 60 < 10
                ? "0" + (playlistSong[currentIndexSong]?.duration % 60)
                : playlistSong[currentIndexSong]?.duration % 60}
            </span>
          </div>
        </div>
        <div className={cx("footer")}>
          {!isMute ? (
            <span onClick={handleMute}>
              {volume >= 60 ? (
                <AudioIcon className={cx("icon")} />
              ) : volume >= 30 ? (
                <AudioIcon1 className={cx("icon")} />
              ) : (
                <AudioIcon0 className={cx("icon")} />
              )}
            </span>
          ) : (
            <span onClick={handleUnMute}>
              <MuteIcon className={cx("icon")} />
            </span>
          )}

          <span className={cx("volume")}>
            <input
              onChange={handleChange}
              type="range"
              value={volume}
              min={0}
              max="100"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlayBar;
