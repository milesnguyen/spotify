import classNames from "classnames/bind";
import styles from "./MusicCard.module.scss";

const cx = classNames.bind(styles);

function MusicCard() {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Nhạc Mới Mỗi Ngày</h2>
      <div className={cx("inner")}>
        <div className={cx("card")}>
          <div className={cx("head")}>
            <img src="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/3/0/e/5/30e5874415c8c43913221a6ed81d79d0.jpg" />
          </div>
          <div className={cx("body")}>
            <h1 className={cx("text")}>V-Pop Tháng 11/2022</h1>
            <p>Muôn màu V-Pop tháng 11</p>
          </div>
        </div>
        <div className={cx("card")}>
          <div className={cx("head")}>
            <img src="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/3/0/e/5/30e5874415c8c43913221a6ed81d79d0.jpg" />
          </div>
          <div className={cx("body")}>
            <h1 className={cx("text")}>V-Pop Tháng 11/2022</h1>
            <p>Muôn màu V-Pop tháng 11</p>
          </div>
        </div>
        <div className={cx("card")}>
          <div className={cx("head")}>
            <img src="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/3/0/e/5/30e5874415c8c43913221a6ed81d79d0.jpg" />
          </div>
          <div className={cx("body")}>
            <h1 className={cx("text")}>V-Pop Tháng 11/2022</h1>
            <p>Muôn màu V-Pop tháng 11</p>
          </div>
        </div>
        <div className={cx("card")}>
          <div className={cx("head")}>
            <img src="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/3/0/e/5/30e5874415c8c43913221a6ed81d79d0.jpg" />
          </div>
          <div className={cx("body")}>
            <h1 className={cx("text")}>V-Pop Tháng 11/2022</h1>
            <p>Muôn màu V-Pop tháng 11</p>
          </div>
        </div>
        <div className={cx("card")}>
          <div className={cx("head")}>
            <img src="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/3/0/e/5/30e5874415c8c43913221a6ed81d79d0.jpg" />
          </div>
          <div className={cx("body")}>
            <h1 className={cx("text")}>V-Pop Tháng 11/2022</h1>
            <p>Muôn màu V-Pop tháng 11</p>
          </div>
        </div>
        <div className={cx("card")}>
          <div className={cx("head")}>
            <img src="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/3/0/e/5/30e5874415c8c43913221a6ed81d79d0.jpg" />
          </div>
          <div className={cx("body")}>
            <h1 className={cx("text")}>V-Pop Tháng 11/2022</h1>
            <p>Muôn màu V-Pop tháng 11</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicCard;
