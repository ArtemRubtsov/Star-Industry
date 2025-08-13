import { motion } from 'framer-motion';
import { MotionValue } from 'framer-motion';
import { IMAGES } from '../../constants/images';
import s from './total.module.css';

interface TotalDisplayProps {
  roundedTotal: MotionValue<number>;
}

const TotalDisplay = ({ roundedTotal }: TotalDisplayProps) => (
  <div className={s.totalContainer}>
    <img src={IMAGES.money} alt="Money icon" />
    <motion.span>{roundedTotal}</motion.span>
  </div>
);

export default TotalDisplay;