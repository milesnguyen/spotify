import classNames from "classnames/bind";

import Header from "~/Layouts/Component/Header";
import Sidebar from "~/Layouts/Component/Sidebar";
import styles from "./DefaultLayout.module.scss";

import PlayBar from "~/Component/PlayBar";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  // const [Data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     const data = await homeServices.home();
  //     setData(data);
  //   };
  //   fetchApi();
  // });

  return (
    <div>
      <Header />
      <Sidebar />
      <PlayBar />
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
