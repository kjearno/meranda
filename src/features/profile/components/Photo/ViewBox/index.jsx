import { Skeleton } from "@material-ui/lab";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { noUserPhoto } from "@shared/assets";
import { RecycleBin } from "./RecycleBin";
import styles from "./ViewBox.module.scss";

export function ViewBox({ src }) {
  const [isLoading, setLoading] = useState(!!src);

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;

      img.onload = () => setLoading(false);
    }
  }, [src]);

  const photo = isLoading ? (
    <Skeleton variant="rect" height="300px" />
  ) : (
    <img src={src || noUserPhoto} alt="" />
  );

  return (
    <div className={styles.photo}>
      {photo}
      {src && <RecycleBin />}
    </div>
  );
}

ViewBox.propTypes = {
  src: PropTypes.string,
};

ViewBox.defaultProps = {
  src: null,
};
