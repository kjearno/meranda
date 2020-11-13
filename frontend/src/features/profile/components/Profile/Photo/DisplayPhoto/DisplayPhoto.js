import React, { useState, useEffect } from "react";

import { Skeleton } from "@material-ui/lab";
import { NoUserPhoto } from "@ui/assets";
import { DeletePhoto } from "./DeletePhoto";
import styles from "./DisplayPhoto.module.scss";

export const DisplayPhoto = ({ src }) => {
  const [isLoading, setLoading] = useState(!!src);

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;

      img.onload = () => setLoading(false);
    }
  }, [src]);

  const photo = src ? src : NoUserPhoto;

  return isLoading ? (
    <Skeleton variant="rect" width={300} height={300} />
  ) : (
    <div className={styles.photo} style={{ backgroundImage: `url(${photo})` }}>
      {src && <DeletePhoto />}
    </div>
  );
};
