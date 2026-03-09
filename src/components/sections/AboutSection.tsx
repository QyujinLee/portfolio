import Image from 'next/image';
import { jobs, majors, type Profile } from '../../data/portfolio';
import styles from './AboutSection.module.scss';

interface AboutSectionProps {
  refCallback: (element: HTMLElement | null) => void;
  profile: Profile;
}

export default function AboutSection({ refCallback, profile }: AboutSectionProps) {
  return (
    <section id="about" ref={refCallback} className={styles.section}>
      <div className={styles.container}>
        <h2>About Me</h2>
        {profile.about.map((line) => (
          <p key={line}>{line}</p>
        ))}

        <div className={styles.majors}>
          {majors.map((major) => (
            <article key={major.title} className={styles.majorCard}>
              <div className={styles.majorIcon}>{major.icon}</div>
              <h3>{major.title}</h3>
              <p>{major.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.jobs}>
          {jobs.map((job) => (
            <article key={job.company} className={styles.job}>
              <Image src={job.logo} alt={`${job.company} 로고`} width={140} height={70} className={styles.jobLogo} />
              <div>
                <p className={styles.jobName}>
                  {job.company} | {job.role}
                </p>
                <p className={styles.jobPeriod}>{job.period}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
