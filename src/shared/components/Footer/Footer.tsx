import { IMAGES } from '../../constants/images';
import s from './footer.module.css';

const Footer = () => (
  <footer className={s.footer}>
    <ul className={s.footerList}>
                <li className={s.footerItem}>
            <a href="#" className={s.footerLink}>
              <img src={IMAGES.officeIcon} alt="Office" className={s.footerIcon} />
              <span className={s.footerText}>Office</span>
            </a>
          </li>
          <li className={s.footerItem}>
            <a href="#" className={s.footerLink}>
              <img src={IMAGES.resourcesIcon} alt="Resources" className={s.footerIcon} />
              <span className={s.footerText}>Resources</span>
            </a>
          </li>
          <li className={s.footerItem}>
            <a href="#" className={s.footerLink}>
              <img src={IMAGES.materialsIcon} alt="Materials" className={s.footerIcon} />
              <span className={s.footerText}>Materials</span>
            </a>
          </li>
          <li className={s.footerItem}>
            <a href="#" className={s.footerLink}>
              <img src={IMAGES.goodsIcon} alt="Goods" className={s.footerIcon} />
              <span className={s.footerText}>Goods</span>
            </a>
          </li>
          <li className={s.footerItem}>
            <a href="#" className={s.footerLink}>
              <img src={IMAGES.stockIcon} alt="Stock" className={s.footerIcon} />
              <span className={s.footerText}>Stock</span>
            </a>
          </li>

    </ul>
  </footer>
);

export default Footer;