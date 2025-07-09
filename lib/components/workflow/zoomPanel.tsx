import styles from './zoomPanel.module.css';
export const ZoomPanel = ({ handleZoomIn, handleZoomOut }: { handleZoomIn: () => void; handleZoomOut: () => void }) => {
  return (
    <div className={styles.zoompanel}>
      <button className={styles.zoombutton} onClick={handleZoomOut}>
        -
      </button>
      <button className={styles.zoombutton} onClick={handleZoomIn}>
        +
      </button>
    </div>
  );
};
