import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "./PlayBar.module.scss";

const cx = classNames.bind(styles);

function PlayBar(data) {
  // const [Track, setTrack] = useState([]);
  // const [isPlaying, setIsPlaying] = useState();

  // useEffect(() => {
  //   fetch(
  //     `https://apizingmp3.herokuapp.com/api/song?id=${data?.data?.encodeId}`
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setTrack(json.data));
  // });
  console.log(data);
  return (
    <div>
      <AudioPlayer className={cx("playBar")} layout="stacked-reverse" />
    </div>
  );
}

export default PlayBar;
