import styles from "../components/Linktree.module.css";

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

export default SoundCloudEmbed;
