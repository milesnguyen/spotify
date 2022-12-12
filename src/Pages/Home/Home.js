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
  const [All, setAll] = useState();
  const [Vpop, setVpop] = useState();
  const [Others, setOthers] = useState();

  /* Fetching data from the api and setting the state of the data. */
  useEffect(() => {
    const fetchApi = async () => {
      const data = await homeServices.home(1);
      console.log(data);
      setTracks(data?.items[4]?.items);
      setPages(data?.items[5]?.items);
      setReleaseAll(data?.items[2]?.items.all);
      setReleasevPop(data?.items[2]?.items.vPop);
      setReleaseOthers(data?.items[2]?.items.others);
      setTop(data?.items[6].items.slice(0, 6));
      setTitle(data?.items[5].title);
      setTitle1(data?.items[6].title);
    };
    fetchApi();
  });
  console.log(All);
  console.log(Vpop);
  console.log(Others);
  // useEffect(() => {
  //   setAll(true);
  //   setVpop(false);
  //   setOthers(false);
  // });
  const handleClickALl = () => {
    setAll(true);
    console.log("all", All);
    setVpop(false);
    setOthers(false);
  };
  const handleClickvPop = () => {
    setVpop(true);
    console.log("vPop", Vpop);
    setAll(false);
    setOthers(false);
  };
  const handleClickOthers = () => {
    setOthers(true);
    console.log("Others", Others);
    setAll(false);
    setVpop(false);
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
