import { etcSkills, skills, tools } from '../../data/portfolio';
import styles from './SkillsSection.module.scss';

interface SkillsSectionProps {
  refCallback: (element: HTMLElement | null) => void;
}

export default function SkillsSection({ refCallback }: SkillsSectionProps) {
  return (
    <section id="skills" ref={refCallback} className={styles.section}>
      <div className={styles.container}>
        <h2>Skills</h2>
        <p>프론트엔드와 백엔드 전반을 다루며, 구현부터 운영까지 책임지고 수행합니다.</p>

        <div className={styles.skillset}>
          <div className={styles.skillLeft}>
            <h3>Skills</h3>
            {skills.map((skill) => (
              <div key={skill.name} className={styles.skillItem}>
                <div className={styles.skillMeta}>
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className={styles.skillBar}>
                  <div className={styles.skillValue} style={{ width: `${skill.level}%` }} aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.skillRight}>
            <div className={styles.skillBlock}>
              <h3>Tools</h3>
              <ul>
                {tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
            <div className={styles.skillBlock}>
              <h3>Etc</h3>
              <ul>
                {etcSkills.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
