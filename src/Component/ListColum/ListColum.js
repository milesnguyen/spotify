import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setIsPlay, setPlaylistId } from "~/Redux/audioSlice";
import Button from "../Button";
import { PauseIcon, PlayIcon } from "../Icons";
import styles from "./ListColum.module.scss";

const cx = classNames.bind(styles);

function ListColum(data) {
  const dispatch = useDispatch();
  const playlistId = useSelector((state) => state.audio.playlistId);

  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickPlay = (list) => {
    dispatch(setPlaylistId(list?.encodeId));
    if (playlistId === list?.encodeId) {
      dispatch(setIsPlay(true));
    }
  };
  return (
    <div className={cx("wrapper")}>
      {[data.data].map((track, index) => {
        return (
          <div className={cx("inner")} key={index}>
            {track.map((list) => {
              return (
                <Link
                  key={list.encodeId}
                  className={cx("item")}
                  to={`/id=${list.encodeId}`}
                >
                  <img
                    className={cx("img")}
                    src={list.thumbnail}
                    alt={list.title}
                  />
                  <div className={cx("desc")}>
                    <div className={cx("text")}>
                      <span>{list.title}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ListColum;
