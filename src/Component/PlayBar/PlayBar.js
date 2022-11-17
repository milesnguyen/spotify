import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
import styles from "./PlayBar.module.scss";
import * as songServices from "~/Services/songServices";

const cx = classNames.bind(styles);

function PlayBar(data) {
  const srcAudio = useSelector((state) => state.audio.srcAudio);
  const songId = useSelector((state) => state.audio.songId);

  const [Track, setTrack] = useState([]);
  const [Data, setData] = useState([]);
  const [isPlaying, setIsPlaying] = useState();

  useEffect(() => {
    fetch(`https://apizingmp3.herokuapp.com/api/song?id=${songId}`)
      .then((response) => response.json())
      .then((json) => setTrack(json.data));
  });

  return (
    <div>
      <AudioPlayer
        src={Track[128]}
        className={cx("playBar")}
        layout="stacked-reverse"
      />
    </div>
  );
}

export default PlayBar;
