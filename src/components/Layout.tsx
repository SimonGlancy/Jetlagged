import type { PropsWithChildren } from "react";
import styles from "./CRTMonitor.module.css";

const Layout = ({
  children,
  withScroll,
}: PropsWithChildren<{ withScroll?: boolean }>) => (
  <div className={withScroll ? styles.scrollContainer : styles.container}>
    {children}
  </div>
);

export default Layout;
