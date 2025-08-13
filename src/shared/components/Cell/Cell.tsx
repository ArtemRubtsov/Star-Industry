import { motion } from 'framer-motion';
import { IMAGES } from '../../constants/images';
import type { Cell as CellType } from '../../types/types';
import s from './cell.module.css';
import React from 'react';

interface CellProps {
  cell: CellType;
  isOpened: boolean;
  onClick: () => void;
  getCashImage: (value: number) => string;
}

const Cell = ({ cell, isOpened, onClick, getCashImage }: CellProps) => (
  <motion.div className={s.cell} onClick={onClick}>
    <motion.div
      className={s.front}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isOpened ? 180 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ backfaceVisibility: 'hidden' }}
    >
      <img src={IMAGES.dollar} alt="Dollar" />
    </motion.div>
    <motion.div
      className={s.back}
      initial={{ rotateY: -180 }}
      animate={{ rotateY: isOpened ? 0 : -180 }}
      transition={{ duration: 0.5 }}
      style={{ backfaceVisibility: 'hidden' }}
    >
      {cell.type === 'cash' ? (
        <div className={s.cash}>
          <img src={getCashImage(cell.value)} alt="Cash" />
        </div>
      ) : cell.type === 'zero' ? (
        <div className={s.zero}>
          <img src={IMAGES.zero} alt="Zero" />
        </div>
      ) : cell.type === 'x2' ? (
        <div className={s.x2}>
          <img src={IMAGES.x2} alt="x2" />
        </div>
      ) : cell.type === 'bomb' ? (
        <div className={s.bomb}>
          <img src={IMAGES.bomb} alt="Bomb" />
        </div>
      ) : cell.type === 'stop' ? (
        <div className={s.stop}>
          <img src={IMAGES.stop} alt="Stop" />
        </div>
      ) : null}
    </motion.div>
  </motion.div>
);

export default React.memo(Cell);