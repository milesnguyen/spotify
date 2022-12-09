import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ListColum from "~/Component/ListColum";
import styles from "./Home.module.scss";
import * as homeServices from "~/Services/homeServices";
import MusicCard from "~/Component/MusicCard";
import Button from "~/Component/Button";

const cx = classNames.bind(styles);

function Home() {
  const [Tracks, setTracks] = useState([]);
  const [Pages, setPages] = useState([]);
  const [Top, setTop] = useState([]);
  const [ReleaseAll, setReleaseAll] = useState([]);
  const [ReleasevPop, setReleasevPop] = useState([]);
  const [ReleaseOthers, setReleaseOthers] = useState([]);
  const [Title, setTitle] = useState([]);
  const [Title1, setTitle1] = useState([]);
  const [All, setAll] = useState(false);
  const [Vpop, setVpop] = useState(false);
  const [Others, setOthers] = useState(false);

  /* Fetching data from the api and setting the state of the data. */
  useEffect(() => {
    const fetchApi = async () => {
      const data = await homeServices.home(1);
      setTracks(data?.items[4]?.items);
      setPages(data?.items[5]?.items);
      setReleaseAll(data?.items[3]?.items.all.slice(0, 6));
      setReleasevPop(data?.items[3]?.items.vPop.slice(0, 6));
      setReleaseOthers(data?.items[3]?.items.others.slice(0, 6));
      setTop(data?.items[9].items.slice(0, 6));
      setTitle(data?.items[5].title);
      setTitle1(data?.items[9].title);
    };
    fetchApi();
  });
  useEffect(() => {
    setAll(true);
  });
  const handleClickALl = () => {
    setAll(true);
    // if (All === true) {
    //   setVpop(false);
    //   setOthers(false);
    // }
    console.log("all", All);
  };
  const handleClickvPop = () => {
    setVpop(true);
    // if (Vpop === true) {
    //   setAll(false);
    //   setOthers(false);
    // }
    console.log("vPop", Vpop);
  };
  const handleClickOthers = () => {
    setOthers(true);
    // if (Others === true) {
    //   setAll(false);
    //   setVpop(false);
    // }
    console.log("Others", Others);
  };
  return (
    <div className={cx("wrapper")}>
      <ListColum data={Tracks} />
      <div className={cx("release")}>
        <h2>Mới phát hành</h2>
        <div className={cx("control")}>
          <Button onClick={handleClickALl} outline>
            All
          </Button>
          <Button onClick={handleClickvPop} outline>
            Viet Nam
          </Button>
          <Button onClick={handleClickOthers} outline>
            Quoc Te
          </Button>
        </div>
        <div className={cx("items", All === true && "active")}>
          <ListColum data={ReleaseAll} />
        </div>
        <div className={cx("items", Vpop === true && "active")}>
          <ListColum data={ReleasevPop} />
        </div>
        <div className={cx("items", Others === true && "active")}>
          <ListColum data={ReleaseOthers} />
        </div>

        {/* {All ? <ListColum data={ReleaseAll} /> : <span></span>} */}
        {/* {Vpop ? <ListColum data={ReleasevPop} /> : <span></span>}
        {Others ? <ListColum data={ReleaseOthers} /> : <span></span>} */}
      </div>
      <h2 className={cx("title")}>{Title}</h2>
      <MusicCard data={Pages} />
      <h2 className={cx("title")}>{Title1}</h2>
      <MusicCard data={Top} />
    </div>
  );
}

export default Home;
