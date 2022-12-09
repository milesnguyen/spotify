import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  children,
  circle = false,
  outline = false,
  primary = false,
  onClick,
  className,
}) {
  let Comp = "button";
  const props = {
    onClick,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = to;
    Comp = "a";
  }

  const classes = cx("wrapper", {
    [className]: className,
    circle,
    outline,
    primary,
  });

  return (
    <Comp className={classes} {...props}>
      <span className={cx("title")}>{children}</span>
    </Comp>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  circle: PropTypes.bool,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
