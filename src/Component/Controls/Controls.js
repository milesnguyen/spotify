import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "../Icons";
import styles from "./Controls.module.scss";

const cx = classNames.bind(styles);

function Controls(data) {
  const [Track, setTrack] = useState([]);
  const [isPlaying, setIsPlaying] = useState();
  const handlePlay = (isPlaying) => {};

  useEffect(() => {
    fetch(
      `https://apizingmp3.herokuapp.com/api/song?id=${data?.data?.encodeId}`
    )
      .then((response) => response.json())
      .then((json) => setTrack(json.data));
  });
  //   console.log(Track?.["128"]);
  return (
    <div className={cx("wrapper")}>
      <PlayIcon className={cx("icon")} />
    </div>
  );
}

export default Controls;
