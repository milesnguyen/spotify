import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PlayBar.module.scss";
import * as songServices from "~/Services/songServices";
import {
  setCurrnetIndexSong,
  setInfoSongPlayer,
  setSongId,
  setSrcAudio,
} from "~/Redux/audioSlice";

const cx = classNames.bind(styles);

function PlayBar(data) {
  const infoSongPlayer = useSelector((state) => state.audio.infoSongPlayer);
  const srcAudio = useSelector((state) => state.audio.srcAudio);
  const songId = useSelector((state) => state.audio.songId);
  const playlistSong = useSelector((state) => state.audio.playlistSong);
  const currentIndexSong = useSelector((state) => state.audio.currentIndexSong);
  const dispatch = useDispatch();

  const [Track, setTrack] = useState([]);
  const [Data, setData] = useState([]);
  const [isPlaying, setIsPlaying] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const data = await songServices.songs(songId);

      dispatch(setSrcAudio(data[128]));
    };
    fetchApi();
  }, [songId]);

  const handleNext = () => {
    dispatch(setCurrnetIndexSong(currentIndexSong + 1));
    dispatch(setSongId(playlistSong[currentIndexSong].encodeId));
    dispatch(setInfoSongPlayer(playlistSong[currentIndexSong].title));
  };
  const handlePrev = () => {
    dispatch(setCurrnetIndexSong(currentIndexSong - 1));
    dispatch(setSongId(playlistSong[currentIndexSong].encodeId));
    dispatch(setInfoSongPlayer(playlistSong[currentIndexSong].title));
  };

  useEffect(() => {
    document.title = infoSongPlayer;
  });
  return (
    <div>
      <AudioPlayer
        src={srcAudio}
        className={cx("playBar")}
        layout="stacked-reverse"
        showSkipControls={true}
        onClickNext={handleNext}
        onClickPrevious={handlePrev}
      />
    </div>
  );
}

export default PlayBar;
