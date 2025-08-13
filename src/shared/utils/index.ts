import Cash from '../assets/img/game/Cash.png';
import Cash500 from '../assets/img/game/Cash-500.png';
import Cash1000 from '../assets/img/game/Cash-1000.png';
import Cash10k from '../assets/img/game/Cash-10k.png';

export const getCashImage = (value: number) => {
  if (value >= 10000) return Cash10k;
  if (value >= 1000) return Cash1000;
  if (value >= 500) return Cash500;
  return Cash;
};