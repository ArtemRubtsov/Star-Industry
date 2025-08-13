import { IMAGES } from '../../constants/images';
import s from './header.module.css'

const Header = () => (
  <header className={s.header}>
    <img src={IMAGES.logo} alt="Logo" />
  </header>
);

export default Header;