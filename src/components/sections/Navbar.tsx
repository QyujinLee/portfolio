import Image from 'next/image';
import type { Dispatch, SetStateAction } from 'react';
import type { NavItem, SectionId } from '../../data/portfolio';
import styles from './Navbar.module.scss';

interface NavbarProps {
  navItems: NavItem[];
  activeSection: SectionId;
  isNavbarDark: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  onNavigate: (id: SectionId) => void;
  logoName: string;
}

export default function Navbar({
  navItems,
  activeSection,
  isNavbarDark,
  isMenuOpen,
  setIsMenuOpen,
  onNavigate,
  logoName,
}: NavbarProps) {
  return (
    <nav className={`${styles.navbar} ${isNavbarDark ? styles.navbarDark : ''}`} aria-label="Main navigation">
      <div className={styles.logoWrap}>
        <Image src="/images/web-icon-white.png" alt="logo" width={22} height={22} className={styles.logoIcon} />
        <button type="button" className={styles.logoButton} onClick={() => onNavigate('home')}>
          {logoName}
        </button>
      </div>

      <button
        type="button"
        className={styles.toggleBtn}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="모바일 메뉴 열기"
        aria-expanded={isMenuOpen}
        aria-controls="global-navigation"
      >
        ≡
      </button>

      <ul id="global-navigation" className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`${styles.menuItem} ${activeSection === item.id ? styles.menuItemActive : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
