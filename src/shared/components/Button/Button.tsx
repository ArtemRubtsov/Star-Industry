import s from './button.module.css';

interface ClaimButtonProps {
  onClick: () => void;
}

const ClaimButton = ({ onClick }: ClaimButtonProps) => (
  <button onClick={onClick} className={s.claimButton}>
    Claim
  </button>
);

export default ClaimButton;