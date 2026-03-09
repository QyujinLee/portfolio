import Image from 'next/image';
import type { Category, Project } from '../../data/portfolio';
import styles from './WorksSection.module.scss';

interface WorksSectionProps {
  refCallback: (element: HTMLElement | null) => void;
  categories: Category[];
  projects: Project[];
  filteredProjects: Project[];
  projectFilter: '*' | 'front-end' | 'back-end';
  isFiltering: boolean;
  onFilterClick: (nextFilter: '*' | 'front-end' | 'back-end') => void;
}

export default function WorksSection({
  refCallback,
  categories,
  projects,
  filteredProjects,
  projectFilter,
  isFiltering,
  onFilterClick,
}: WorksSectionProps) {
  return (
    <section id="works" ref={refCallback} className={styles.section}>
      <div className={styles.container}>
        <h2>My Works</h2>
        <p>Projects</p>

        <div className={styles.categories} role="tablist" aria-label="프로젝트 카테고리">
          {categories.map((category) => {
            const count = category.key === '*' ? projects.length : projects.filter((project) => project.type === category.key).length;

            return (
              <button
                key={category.key}
                type="button"
                role="tab"
                aria-selected={projectFilter === category.key}
                className={`${styles.categoryBtn} ${projectFilter === category.key ? styles.categoryBtnActive : ''}`}
                onClick={() => onFilterClick(category.key)}
              >
                {category.label}
                <span className={styles.categoryCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className={`${styles.projects} ${isFiltering ? styles.projectsAnimating : ''}`}>
          {filteredProjects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className={styles.projectCard}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} 상세 보기`}
            >
              <Image src={project.image} alt={project.title} width={200} height={250} className={styles.projectImg} />
              <div className={styles.projectDescription}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
