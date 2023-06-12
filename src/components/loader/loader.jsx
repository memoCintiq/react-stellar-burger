import React from "react";
import styles from './loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.background}>
      <div className={styles.image}></div>
      <div className={`${styles.image} ${styles.layer1}`}></div>
      <div className={`${styles.image} ${styles.layer2}`}></div>
      <div className={`${styles.image} ${styles.layer3}`}></div>
      <div className={`${styles.image} ${styles.layer4}`}></div>
    </div>
  )
}

export default React.memo(Loader);
