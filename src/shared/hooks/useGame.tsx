import { useCallback, useState } from "react";

type CashCell = { type: 'cash'; value: number };
type ZeroCell = { type: 'zero'; value: number };
type MultiplierCell = { type: 'x2' };
type BombCell = { type: 'bomb' };

type Cell = CashCell | ZeroCell | MultiplierCell | BombCell;

type ModalType = 'bomb' | 'claim' | null;

const INITIAL_ITEMS: Cell[] = [
  { type: 'cash', value: 1 },
  { type: 'cash', value: 8 },
  { type: 'cash', value: 100 },
  { type: 'cash', value: 200 },
  { type: 'cash', value: 1000000 },
  { type: 'cash', value: 500 },
  { type: 'zero', value: 0 },
  { type: 'x2' },
  { type: 'bomb' },
];

export const useGameLogic = () => {
  const generateGrid = useCallback((): Cell[] => {
    const items = [...INITIAL_ITEMS];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }, []);

  const [grid, setGrid] = useState<Cell[]>(generateGrid());
  const [opened, setOpened] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleCellClick = useCallback(
    (index: number) => {
      if (opened.includes(index) || gameOver) return;

      const newOpened = [...opened, index];
      setOpened(newOpened);

      const cell = grid[index];

      switch (cell.type) {
        case 'cash':
          setTotal((prev) => prev + cell.value * multiplier);
          break;
        case 'x2':
          setTotal((prev) => prev * 2);
          setMultiplier((prev) => prev * 2);
          break;
        case 'bomb':
          setModalType('bomb');
          break;
        default:
          break;
      }
    },
    [opened, gameOver, grid, multiplier]
  );

  const handleClaim = useCallback(() => {
    if (gameOver) return;
    setModalType('claim');
  }, [gameOver]);

  const resetGame = useCallback(() => {
    setGrid(generateGrid());
    setOpened([]);
    setTotal(0);
    setMultiplier(1);
    setGameOver(false);
    setModalType(null);
  }, [generateGrid]);

  const handleTakeHit = useCallback(() => {
    setTotal(0);
    setOpened([...Array(9).keys()]); 
    setGameOver(true);
    setModalType('claim');
  }, []);

  const handleDefuse = useCallback(() => {
    setModalType(null);
  }, []);

  return {
    grid,
    opened,
    total,
    gameOver,
    modalType,
    handleCellClick,
    handleClaim,
    resetGame,
    handleTakeHit,
    handleDefuse,
  };
};