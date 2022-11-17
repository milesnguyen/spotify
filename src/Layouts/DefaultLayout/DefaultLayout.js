import classNames from "classnames/bind";

import Header from "~/Layouts/Component/Header";
import Sidebar from "~/Layouts/Component/Sidebar";
import styles from "./DefaultLayout.module.scss";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <Sidebar />

      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
