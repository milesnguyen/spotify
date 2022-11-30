import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ListColum from "~/Component/ListColum";
import styles from "./Home.module.scss";
import * as homeServices from "~/Services/homeServices";
import MusicCard from "~/Component/MusicCard";

const cx = classNames.bind(styles);

function Home() {
  const [Tracks, setTracks] = useState([]);
  const [Pages, setPages] = useState([]);

  // useEffect(() => {
  //   fetch("https://apizingmp3.herokuapp.com/api/home?page=1")
  //     .then((response) => response.json())
  //     .then((data) => setTracks(data.data.items[4].items));
  // });

  useEffect(() => {
    const fetchApi = async () => {
      const data = await homeServices.home(1);
      setTracks(data?.items[4]?.items);
    };
    fetchApi();
  });
  useEffect(() => {
    const fetchApi = async () => {
      const page = await homeServices.home(2);
      setPages(page.items[0].items);
    };
    fetchApi();
  });
  return (
    <div className={cx("wrapper")}>
      {[Tracks].map((track, index) => {
        return <ListColum key={index} data={track} />;
      })}
      <MusicCard data={Pages} />
    </div>
  );
}

export default Home;
