import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MusicCard.module.scss";

const cx = classNames.bind(styles);

function MusicCard(data) {
  return (
    <div className={cx("wrapper")}>
      <div>
        {[data?.data].map((item, index) => {
          return (
            <div className={cx("inner")} key={index}>
              {item.map((list) => {
                return (
                  <Link
                    to={`/id=${list?.encodeId}`}
                    className={cx("card")}
                    key={list?.encodeId}
                  >
                    <div className={cx("head")}>
                      <img src={list?.thumbnail} alt={list?.encodeId} />
                    </div>
                    <div className={cx("body")}>
                      <h1 className={cx("text")}>{list?.title}</h1>
                      <p>{list?.sortDescription}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MusicCard;
