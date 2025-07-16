import styles from './zoomPanel.module.css';
export const ZoomPanel = ({ handleZoomIn, handleZoomOut, colorScale='blue' }: { handleZoomIn: () => void; handleZoomOut: () => void; colorScale: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' }) => {
  return (
    <div className={styles.zoompanel}>
      <button className={styles.zoombutton + ' ' + styles[colorScale]} onClick={handleZoomOut}>
        -
      </button>
      <button className={styles.zoombutton + ' ' + styles[colorScale]} onClick={handleZoomIn}>
        +
      </button>
    </div>
  );
};
