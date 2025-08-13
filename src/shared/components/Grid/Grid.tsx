import { motion, useAnimationControls } from 'framer-motion'; 
import { useEffect, useRef } from 'react';
import s from './grid.module.css';
import bomb from '../../assets/img/game/bomb.png';
import zero from '../../assets/img/game/zero.png';
import x2 from '../../assets/img/game/x2.png';
import dollar from '../../assets/img/dollar.png';
import { getCashImage } from '../../utils/index';

type Cell =
  | { type: 'cash' | 'zero'; value: number }
  | { type: 'x2' | 'bomb' };

type Props = {
  grid: Cell[];
  opened: Array<number>;
  handleCellClick: (i: number) => void;
  onOpenCash: (pos: { x: number; y: number }, value: number) => void;
  modalType: string | null;
};

export default function Grid({ grid, opened, handleCellClick, onOpenCash, modalType }: Props) {
  const gridControls = useAnimationControls();
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cashRefs = useRef<(HTMLImageElement | null)[]>([]); 
  const prevOpenedRef = useRef<number[]>([]);
  // const prevMultiplierRef = useRef(1);

  useEffect(() => {
    const newOpens = opened.filter((i) => !prevOpenedRef.current.includes(i));

    newOpens.forEach((index) => {
      const cell = grid[index];
      if (cell.type === 'cash') {
        const imgEl = cashRefs.current[index];
        if (imgEl) {
          const rect = imgEl.getBoundingClientRect();
          const startX = rect.left + rect.width / 2;
          const startY = rect.top + rect.height / 2;
          onOpenCash({ x: startX, y: startY }, cell.value);
        }
      } else if (cell.type === 'x2') {
        // CounterUp: анимировать открытые cash
        opened.forEach((idx) => {
          if (grid[idx].type === 'cash') {
            gridControls.start({ scale: [1, 1.2, 1], transition: { duration: 0.5 } });
          }
        });
      }
    });

    prevOpenedRef.current = [...opened];
  }, [opened, grid, onOpenCash, gridControls]);

  useEffect(() => {
    if (modalType === 'bomb') {
      // Эффект бомбы: shake grid
      gridControls.start({
        x: [0, 10, -10, 10, -10, 0],
        transition: { duration: 0.5, repeat: 1 },
      });
    }
  }, [modalType, gridControls]);

  return (
    <motion.div className={s.grid} animate={gridControls}>
      {grid.map((cell, index) => (
        <motion.div
          key={index}
          className={s.cell}
          onClick={() => handleCellClick(index)}
          ref={(el) => { cellRefs.current[index] = el; }}
          animate={
            opened.includes(index) && cell.type === 'cash' 
              ? { boxShadow: '0 0 20px #4ade80' } 
              : { boxShadow: '0 0 0 transparent' }
          }
          transition={{ duration: 0.5 }}
          variants={{
            fold: { scale: 0.9, rotateY: 180 },
          }}
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.95 }} // Добавил для button feel
        >
          <motion.div
            className={s.front}
            initial={{ rotateY: 0, scale: 1 }}
            animate={opened.includes(index) ? { rotateY: 180, scale: 0.9 } : { rotateY: 0, scale: 1 }} // Folding scale
            transition={{ duration: 0.5 }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <img src={dollar} alt="dollar" />
          </motion.div>

          <motion.div
            className={s.back}
            initial={{ rotateY: -180, scale: 1 }}
            animate={opened.includes(index) ? { rotateY: 0, scale: 1 } : { rotateY: -180, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {cell.type === 'cash' ? (
              <div className={s.cash}>
                <img src={getCashImage(cell.value)} alt="cash" ref={el => { cashRefs.current[index] = el; }} />
              </div>
            ) : cell.type === 'zero' ? (
              <div className={s.zero}>
                <img src={zero} alt="zero" />
              </div>
            ) : cell.type === 'x2' ? (
              <div className={s.x2}>
                <img src={x2} alt="x2" />
              </div>
            ) : cell.type === 'bomb' ? (
              <div className={s.bomb}>
                <img src={bomb} alt="bomb" />
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}