import type { PropsWithChildren } from "react";
import styles from "./CRTMonitor.module.css";

const Layout = ({ children }: PropsWithChildren<{}>) => (
  <div className={styles.container}>{children}</div>
);

export default Layout;
