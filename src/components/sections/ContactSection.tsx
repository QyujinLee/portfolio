import type { Profile } from '../../data/portfolio';
import styles from './ContactSection.module.scss';

interface ContactSectionProps {
  refCallback: (element: HTMLElement | null) => void;
  profile: Profile;
}

export default function ContactSection({ refCallback, profile }: ContactSectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <section id="contact" ref={refCallback} className={styles.section}>
      <h2>Let&apos;s Talk</h2>
      <p className={styles.email}>{profile.email}</p>
      <a href={profile.github} target="_blank" rel="noreferrer" className={styles.githubLink} aria-label="GitHub 프로필 열기">
        GitHub
      </a>
      <p className={styles.rights}>{currentYear} Gyujin - All rights reserved</p>
    </section>
  );
}
