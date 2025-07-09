import { useEffect, useState } from 'react';
import styles from './socket.module.css';
import { SocketPosition } from '../../../types';
import React from 'react';

export const Socket = React.forwardRef<
  HTMLDivElement,
  { selectNode: (position: SocketPosition) => boolean; position: SocketPosition; scale: number; connected?: boolean }
>((props, ref) => {
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (props.connected) setIsConnecting(false);
  }, [props.connected]);

  const positionX = () => {
    if (props.position === SocketPosition.UP || props.position === SocketPosition.DOWN) return '50%';
    if (props.position === SocketPosition.LEFT) return '0%';
    if (props.position === SocketPosition.RIGHT) return '100%';
  };
  const positionY = () => {
    if (props.position === SocketPosition.UP) return '0%';
    if (props.position === SocketPosition.DOWN) return '100%';
    if (props.position === SocketPosition.LEFT || props.position === SocketPosition.RIGHT) return '50%';
  };

  const onClick = () => {
    if (!isConnecting && !props.connected) {
      if (props.selectNode(props.position)) setIsConnecting(true);
    }
  };

  return (
    <>
      <div
        ref={ref}
        className={`${styles.socket} ${isConnecting ? styles.connecting : ''} ${props.connected ? styles.connected : ''}`}
        onClick={!props.connected ? onClick : undefined}
        style={{
          position: 'absolute',
          transformOrigin: 'center',
          transform: `scale(${props.scale}) translate(-50%,-50%)`,
          top: positionY(),
          left: positionX(),
        }}
      ></div>
    </>
  );
});
