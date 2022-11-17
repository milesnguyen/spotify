import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ListColum from "~/Component/ListColum";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
  const [Tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch("https://apizingmp3.herokuapp.com/api/home?page=1")
      .then((response) => response.json())
      .then((data) => setTracks(data.data.items[4].items));
  });
  return (
    <div className={cx("wrapper")}>
      {[Tracks].map((track, index) => {
        return <ListColum key={index} data={track} />;
      })}
    </div>
  );
}

export default Home;