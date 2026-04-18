import { CRTMonitor, TextTyper } from "../components/CRTMonitor";

import Layout from "../components/Layout";
import styles from "../components/Linktree.module.css";
import { Signup, useApiSideEffects } from "./Home";
const links = [
  {
    title: "Prozac Nation Pre-save",
    url: "https://distrokid.com/hyperfollow/jetlag19/prozac-nation",
    featured: true,
  },
];

const Footer = () => {
  return (
    <footer className={styles.linktreeFooter}>
      <div className={styles.socialIcons}>
        {/* Instagram */}
        <a
          href="https://www.instagram.com/__jet__lag__/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className={styles.socialLink}
        >
          <svg viewBox="0 0 24 24" className={styles.socialSvg}>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@__jet_lag__"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
          className={styles.socialLink}
        >
          <svg viewBox="0 0 24 24" className={styles.socialSvg}>
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-3.33 2.76-6.1 6.04-6.44.57-.06 1.14-.04 1.71.02V9.59c-1.47-.28-3.04.14-4.14 1.16-1.16 1.01-1.8 2.63-1.61 4.16.12 1.34.88 2.59 2.02 3.32.96.65 2.13.92 3.28.77 1.2-.1 2.3-.82 2.89-1.87.35-.58.54-1.25.55-1.93.03-3.7-.01-7.39.02-11.1-.01-.03-.02-.07-.03-.1z" />
          </svg>
        </a>
      </div>
      <p className={styles.footerText}>jetlagged.world</p>
    </footer>
  );
};

const SoundCloudEmbed = () => {
  return (
    <div className={styles.embedContainer}>
      <iframe
        width="100%"
        height="20"
        scrolling="no"
        frameBorder="no" // React uses camelCase for this
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2297381831&color=%23000000&inverse=true&auto_play=false&show_user=true"
        title="Jetlagged SoundCloud Player"
      />
      <div className={styles.caption}>
        <a
          href="https://soundcloud.com/jetlagged-world"
          target="_blank"
          rel="noreferrer"
        >
          Jetlagged
        </a>
        {" · "}
        <a
          href="https://soundcloud.com/jetlagged-world/prozac-nation"
          target="_blank"
          rel="noreferrer"
        >
          Prozac Nation
        </a>
      </div>
    </div>
  );
};

const Links = () => {
  const { setSuccess, loading, setLoading, setError } = useApiSideEffects();
  return (
    <Layout>
      <div className={styles.linktreeWrapper}>
        <div
          style={{
            width: 350,
            height: 200,
            display: "flex",
            overflow: "hidden",
            position: "relative", // Added relative to help absolute children
            borderRadius: 12,
          }}
        >
          <CRTMonitor width={350} height={200}>
            {({ rgbOffset, blur }) => (
              <TextTyper
                rgbOffset={rgbOffset}
                blur={blur}
                strings={["Jetlag"]}
              />
            )}
          </CRTMonitor>
        </div>

        <SoundCloudEmbed />
        <nav className={styles.linktreeNav}>
          {links.map((link, i) => (
            <a key={i} href={link.url} className={styles.linktreeBtn}>
              {link.title}
            </a>
          ))}
        </nav>
        <Signup
          loading={loading}
          setLoading={setLoading}
          setError={setError}
          setSuccess={setSuccess}
        />

        <Footer />
      </div>
    </Layout>
  );
};

export default Links;
