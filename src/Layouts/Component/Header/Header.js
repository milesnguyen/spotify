import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Button from "~/Component/Button";
import { BottomIcon, LeftIcon, RightIcon, TopIcon } from "~/Component/Icons";
import Tippy from "@tippyjs/react/";
import TippyHeadless from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { useState } from "react";

const cx = classNames.bind(styles);

function Header() {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("controls")}>
          <Tippy content="Quay lại" arrow={false}>
            <span>
              <Button className={cx("btn")} circle>
                <LeftIcon />
              </Button>
            </span>
          </Tippy>

          <Tippy content="Tiếp theo" arrow={false}>
            <span>
              <Button className={cx("btn")} circle>
                <RightIcon />
              </Button>
            </span>
          </Tippy>
        </div>
        <div className={cx("user")} onClick={visible ? hide : show}>
          <div className={cx("avt")}>
            <img src="https://scontent.fvga9-1.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c94.0.320.320a_dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=12b3be&_nc_ohc=etkWrvflumQAX86FnkP&_nc_ht=scontent.fvga9-1.fna&edm=AP4hL3IEAAAA&oh=00_AfAvYGq1FseEXFMvIstSb0phK_Fn5RSCfGh_uf7Mdl2Kxw&oe=639648D9" />
          </div>
          <span className={cx("name")}>Thịnh Nguyễn</span>

          <TippyHeadless
            interactive
            visible={visible}
            offset={[10, 16]}
            placement="bottom-start"
            render={(attrs) => (
              <div className={cx("menu")} tabIndex="-1" {...attrs}>
                <ul className={cx("list")}>
                  <li className={cx("item")}>Tài khoản</li>
                  <li className={cx("item")}>Hồ Sơ</li>
                  <li className={cx("item")}>Nâng cấp lên Premium</li>
                  <li className={cx("item")}>Cài đặt</li>
                  <li className={cx("item", "separate")}>Đăng xuất</li>
                </ul>
              </div>
            )}
          >
            <div className={cx("btnBottom")}>
              {!visible ? <BottomIcon /> : <TopIcon />}
            </div>
          </TippyHeadless>
        </div>
      </div>
    </div>
  );
}

export default Header;
