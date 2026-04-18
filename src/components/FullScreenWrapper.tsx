import type { PropsWithChildren } from "react";
import styles from "./CRTMonitor.module.css";

const FullScreenWrapper = ({ children }: PropsWithChildren<{}>) => (
  <div className={styles.container}>
    <div className={styles.crtFrame}>{children}</div>
  </div>
);

export default FullScreenWrapper;
