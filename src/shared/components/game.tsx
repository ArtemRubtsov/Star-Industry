import { useEffect, useRef, useState } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import s from './Game.module.css';
import money from '../assets/svg/game/money.svg';
import Header from './header/Header';
import Stats from './Stats/Stats';
import ClaimButton from './Button/Button';
import Footer from './Footer/Footer';
import Grid from './Grid/Grid';
import {Modal} from './Modal/Modal';
import { useGameLogic } from '../hooks/useGame';
import { nanoid } from 'nanoid';
import image2 from '../assets/img/modal/bomb.png'
import cash from '../assets/svg/game/money.svg'
import bombIcons from '../assets/svg/game/bomb.svg'
import defuseIcon from '../assets/svg/modal/gem.svg'
import stopModal from '../assets/img/modal/stop.png'

const Game = () => {
  const {
    grid,
    opened,
    total,
    modalType,
    handleCellClick,
    handleClaim,
    resetGame,
    handleTakeHit,
    handleDefuse,
  } = useGameLogic();

  const totalDisplay = useMotionValue(0);
  const roundedTotal = useTransform(totalDisplay, Math.round);
  
  useEffect(() => {
    animate(totalDisplay, total, { duration: 1, ease: 'easeOut' });
  }, [total, totalDisplay]);

  const moneyRef = useRef<HTMLImageElement>(null);
  const [flyers, setFlyers] = useState<
    { id: string; startX: number; startY: number; targetX: number; targetY: number; value: number; isLast?: boolean }[]
  >([]);
  const [showTooltip, setShowTooltip] = useState(false); 

  const formatValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };
  
  const handleOpenCash = (startPos: { x: number; y: number }, value: number) => {
    if (moneyRef.current) {
      const moneyRect = moneyRef.current.getBoundingClientRect();
      const targetX = moneyRect.left + moneyRect.width / 2;
      const targetY = moneyRect.top + moneyRect.height / 2;
      const numBundles = 4;

      for (let i = 0; i < numBundles; i++) {
        setTimeout(() => {
          setFlyers((prev) => [
            ...prev,
            { 
              id: nanoid(), 
              startX: startPos.x, 
              startY: startPos.y, 
              targetX, 
              targetY, 
              value,
              isLast: i === numBundles - 1
            },
          ]);
        }, i * 150);
      }
    }
  };

  const isFlying = flyers.length > 0;
  const stats = {
    cash: grid.filter(c => c.type === 'cash').length,
    x2: grid.filter(c => c.type === 'x2').length,
    zero: grid.filter(c => c.type === 'zero').length,
    bomb: grid.filter(c => c.type === 'bomb').length,
  };

  const openedResources = opened
    .map(i => grid[i])
    .filter(c => c.type === 'cash')
    .map(c => (c as { type: 'cash'; value: number }).value);

  return (
    <div className={s.container}>
      <Header />
      <div className={s.title__wrapper}>
        <div className={s.titleContainer}>
          <div className={s.line}></div>
          <h1 className={s.title}>Roll Craft</h1>
          <div className={s.line}></div>
        </div>
        <div className={s.totalContainer} onClick={() => setShowTooltip(!showTooltip)}>
          <img src={money} ref={moneyRef} alt="money" />
          <motion.span className={s.roundedTotal} animate={{color: isFlying ? '#E8FFD1' : '#FFFFFF'}}>
            {roundedTotal}
          </motion.span>
          {showTooltip && (
            <motion.div 
              className={s.tooltip}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              Total earned: {formatValue(total)}
            </motion.div>
          )}
        </div>
      </div>
      <Grid
        grid={grid}
        opened={opened}
        handleCellClick={handleCellClick}
        onOpenCash={handleOpenCash}
        modalType={modalType} 
      />
      <Stats stats={stats} />
      <ClaimButton onClick={handleClaim} />
      <Modal
        show={modalType === 'bomb'}
        title="Danger ahead!"
        text="You’re on a Bomb Square! You hit a bomb and lose all rewards from this field..."
        icon={image2}
        rewardIcon={cash}
        rewardText="200K"
        subText="...or defuse it and save your run!"
        buttons={[
          { label: 'Take a hit', icon: bombIcons, onClick: handleTakeHit, className: s.takeHitButton },
          { label: 'Defuse for 49', icon: defuseIcon, onClick: handleDefuse, className: s.defuseButton },
        ]}
        titleShadow='0 0 8px rgba(255, 0, 0, 0.7)'
      />
      <Modal 
        show={modalType === 'claim'}
        title={'Game over!'}
        text={`You've reached the end of this run. Opened cash: ${openedResources.join(', ')}`}
        icon={stopModal}
        rewardIcon={cash}
        rewardText={formatValue(total)}
        subText='...claim and return to the main board'
        buttons={[{label: 'Claim', onClick: () => { console.log('Claimed:', total); resetGame(); }, className: s.claim}]}
        titleShadow='0 0 8px rgba(233, 229, 229, 0.7)'
      />
      <Footer />

      {flyers.map((flyer) => (
        <motion.div
          key={flyer.id}
          style={{
            left: 0,                 
            top: 0, 
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
          initial={{ 
            x: flyer.startX - 20, 
            y: flyer.startY - 40, 
            scale: 1, 
            opacity: 1 
          }}
          animate={{ 
            x: flyer.targetX - 20, 
            y: flyer.targetY - 40, 
            scale: 0.5, 
            opacity: 0 
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.37, 0, 0.63, 1]
          }}
          onAnimationComplete={() => {
            setFlyers((prev) => prev.filter((f) => f.id !== flyer.id));
          }}
        >
          {flyer.isLast && (
            <span 
              style={{ 
                color: '#ffffff', 
                fontSize: '24px', 
                fontWeight: 'bold',
                marginBottom: '5px'
              }}
            >
              {formatValue(flyer.value)}
            </span>
          )}
          <img 
            src={money} 
            alt="cash" 
            style={{ 
              width: '40px', 
              height: 'auto',
              ...(flyer.isLast ? { boxShadow: '0 0 10px #4ade80' } : {})
            }} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Game;