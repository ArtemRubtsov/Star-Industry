import s from './stats.module.css';
import o from '../../assets/svg/game/0.svg'
import x2 from '../../assets/svg/game/x2.svg'
import money from '../../assets/svg/game/money.svg'
import bomb from '../../assets/svg/game/bomb.svg'

type StatsProps = {
  stats: { cash: number; x2: number; zero: number; bomb: number };
};

const Stats = ({ stats }: StatsProps) => (
  <div className={s.stats}>
    <div className={s.statItemCash}>
      <img src={money} alt="money" /> 
      <span>{stats.cash}</span>
    </div>
    <div className={s.statItemX2}>
      <img src={x2} alt="x2" /> 
      <span>{stats.x2}</span>
    </div>
    <div className={s.statItemZero}>
      <img src={o} alt="0" />
      <span>{stats.zero}</span>
    </div>
    <div className={s.statItemBomb}>
      <img src={bomb} alt="bomb" /> 
      <span>{stats.bomb}</span>
    </div>
  </div>
);

export default Stats;