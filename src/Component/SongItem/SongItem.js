import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { setInfoSongPlayer, setSongId } from "~/Redux/audioSlice";

import { PlayIcon } from "../Icons";
import styles from "./SongItem.module.scss";

const cx = classNames.bind(styles);

function SongItem(data) {
  const dispatch = useDispatch();

  const handlePlay = (title, artists, id) => {
    dispatch(setSongId(id));
    dispatch(setInfoSongPlayer(title));
  };

  return (
    <div className={cx("wrapper")}>
      {[data?.data?.song].map((songs, index) => {
        return (
          <div className="inner" key={index}>
            {songs?.items.map((item) => {
              return (
                <div className={cx("items")} key={item.encodeId}>
                  <div
                    className={cx("controls")}
                    onClick={() =>
                      handlePlay(item.title, item.artistsNames, item?.encodeId)
                    }
                  >
                    <PlayIcon className={cx("icon")} />
                  </div>
                  <img className={cx("thumb")} src={item.thumbnail} />
                  <div className={cx("desc")}>
                    <div className={cx("title")}>
                      <p>{item.title}</p>
                      <span>{item.artistsNames}</span>
                    </div>
                    {[item?.album].map((alums, index) => {
                      return (
                        <div className={cx("artists")} key={alums?.encodeId}>
                          {alums?.title}
                        </div>
                      );
                    })}
                    <div className={cx("time")}>
                      {Math.floor(item.duration / 60) < 10
                        ? "0" + Math.floor(item.duration / 60)
                        : Math.floor(item.duration / 60)}
                      :
                      {item.duration % 60 < 10
                        ? "0" + (item.duration % 60)
                        : item.duration % 60}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default SongItem;
