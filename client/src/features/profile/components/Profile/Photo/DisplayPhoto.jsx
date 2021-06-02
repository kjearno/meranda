import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@material-ui/lab";
import { NoUserPhoto } from "@shared/assets";
import { DeletePhoto } from "./DeletePhoto";
import styles from "./DisplayPhoto.module.scss";

export function DisplayPhoto({ src }) {
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
    <img src={src || NoUserPhoto} alt="" />
  );

  return (
    <div className={styles.photo}>
      {photo}
      {src && <DeletePhoto />}
    </div>
  );
}

DisplayPhoto.propTypes = {
  src: PropTypes.string,
};

DisplayPhoto.defaultProps = {
  src: null,
};
