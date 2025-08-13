import { motion } from 'framer-motion';
import s from './modal.module.css';

interface ModalButton {
  label: string;
  icon?: string;
  onClick: () => void;
  className?: string;
}

interface ModalProps {
  show: boolean;
  title: string;
  text: string;
  icon?: string;
  subText?: string;
  rewardIcon?: string;
  rewardText?: string;
  buttons: ModalButton[];
  titleShadow?: string;
}

export const Modal = ({
  show,
  title,
  text,
  icon,
  subText,
  rewardIcon,
  rewardText,
  buttons,
  titleShadow
}: ModalProps) => {
  if (!show) return null;

  return (
    <motion.div className={s.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className={s.modalContent}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={s.iconWrapper}>
          <div className={s.header}>
            <h2 className={s.dangerTitle} style={titleShadow ? { textShadow: titleShadow } : {}}>
              {title}
              </h2>
            <p className={s.dangerText}>{text}</p>
          </div>

          <img src={icon} alt="Modal icon" className={s.bombIcon} />

          {rewardIcon && rewardText && (
            <div className={s.reward}>
              <img src={rewardIcon} alt="Reward" />
              <span>{rewardText}</span>
            </div>
          )}

          {subText && <p className={s.subText}>{subText}</p>}

          <div className={s.modalButtons}>
            {buttons.map((btn, i) => (
              <button key={i} onClick={btn.onClick} className={btn.className}>
                {btn.icon && <img src={btn.icon} alt="" />}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
