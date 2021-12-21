import React from "react";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.lds}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}