import Image from 'next/image';
import type { Profile } from '../../data/portfolio';
import styles from './HomeSection.module.scss';
import profileImage from '@public/images/profile.jpeg';
import homeBg from '@public/images/home-background.png';

interface HomeSectionProps {
  refCallback: (element: HTMLElement | null) => void;
  profile: Profile;
  homeOpacity: number;
  onContactClick: () => void;
}

export default function HomeSection({ refCallback, profile, homeOpacity, onContactClick }: HomeSectionProps) {
  return (
    <section
      id="home"
      ref={refCallback}
      className={styles.home}
      style={{ backgroundImage: `url(${homeBg.src})` }}
    >
      <div className={styles.container} style={{ opacity: homeOpacity }}>
        <Image
          src={profileImage}
          alt="이규진 프로필 사진"
          width={250}
          height={250}
          className={styles.avatar}
          priority
        />
        <h1 className={styles.title}>{profile.title}</h1>
        <p className={styles.subtitle}>{profile.subtitle}</p>
        <button type="button" className={styles.contactBtn} onClick={onContactClick}>
          Contact Me
        </button>
      </div>
    </section>
  );
}
