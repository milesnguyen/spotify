import classNames from "classnames/bind";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  HomeActiveIcon,
  HomeIcon,
  LibActiveIcon,
  LibIcon,
  LogoIcon,
  SearchActiveIcon,
  SearchIcon,
} from "~/Component/Icons";
import config from "~/Config";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function Sidebar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>
          <Link to={config.routes.home}>
            <LogoIcon />
          </Link>
        </div>
        <div className={cx("nav")}>
          <ul className={cx("list")}>
            <li className={cx("item")}>
              <NavLink
                className={(nav) => cx("link", { active: nav.isActive })}
                to={config.routes.home}
              >
                <HomeIcon className={cx("icon")} />
                <HomeActiveIcon className={cx("activeIcon")} />
                <span>Trang chủ</span>
              </NavLink>
            </li>
            <li className={cx("item")}>
              <NavLink
                className={(nav) => cx("link", { active: nav.isActive })}
                to={config.routes.search}
              >
                <SearchIcon className={cx("icon")} />
                <SearchActiveIcon className={cx("activeIcon")} />
                <span>Tìm kiếm</span>
              </NavLink>
            </li>
            <li className={cx("item")}>
              <NavLink
                className={(nav) => cx("link", { active: nav.isActive })}
                to={config.routes.collection}
              >
                <LibIcon className={cx("icon")} />
                <LibActiveIcon className={cx("activeIcon")} />
                <span>Thư viện</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
