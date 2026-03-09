'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './PortfolioPage.module.scss';
import {
  categories,
  navItems,
  profile,
  projects,
  sectionOrder,
  type Project,
  type SectionId,
} from '../data/portfolio';
import ScrollTopButton from './common/ScrollTopButton';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import HomeSection from './sections/HomeSection';
import Navbar from './sections/Navbar';
import SkillsSection from './sections/SkillsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import WorksSection from './sections/WorksSection';

type SectionElementMap = Record<SectionId, HTMLElement | null>;

export default function PortfolioPage() {
  const sectionRefs = useRef<SectionElementMap>({
    home: null,
    about: null,
    skills: null,
    works: null,
    testimonials: null,
    contact: null,
  });

  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isNavbarDark, setIsNavbarDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [homeOpacity, setHomeOpacity] = useState(1);
  const [projectFilter, setProjectFilter] = useState<'*' | 'front-end' | 'back-end'>('*');
  const [isFiltering, setIsFiltering] = useState(false);

  const filteredProjects = useMemo<Project[]>(() => {
    if (projectFilter === '*') return projects;
    return projects.filter((project) => project.type === projectFilter);
  }, [projectFilter]);

  const assignSectionRef = (id: SectionId) => (element: HTMLElement | null) => {
    sectionRefs.current[id] = element;
  };

  const scrollToSection = (id: SectionId) => {
    const element = sectionRefs.current[id];
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const homeSection = sectionRefs.current.home;
      const scrollY = window.scrollY;

      setIsNavbarDark(scrollY > 72);

      if (homeSection) {
        const nextOpacity = 1 - scrollY / homeSection.offsetHeight;
        setHomeOpacity(Math.max(0, Math.min(1, nextOpacity)));
        setShowScrollTop(scrollY > homeSection.offsetHeight / 2);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const elements = sectionOrder.map((id) => sectionRefs.current[id]).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { root: null, threshold: 0.4 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const handleProjectFilter = (nextFilter: '*' | 'front-end' | 'back-end') => {
    if (nextFilter === projectFilter) return;
    setIsFiltering(true);
    setTimeout(() => {
      setProjectFilter(nextFilter);
      setIsFiltering(false);
    }, 220);
  };

  return (
    <main className={styles.page}>
      <a href="#home" className={styles.skipLink}>
        본문으로 이동
      </a>

      <Navbar
        navItems={navItems}
        activeSection={activeSection}
        isNavbarDark={isNavbarDark}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onNavigate={scrollToSection}
        logoName={profile.name}
      />

      <HomeSection
        refCallback={assignSectionRef('home')}
        profile={profile}
        homeOpacity={homeOpacity}
        onContactClick={() => scrollToSection('contact')}
      />

      <AboutSection refCallback={assignSectionRef('about')} profile={profile} />

      <SkillsSection refCallback={assignSectionRef('skills')} />

      <WorksSection
        refCallback={assignSectionRef('works')}
        categories={categories}
        projects={projects}
        filteredProjects={filteredProjects}
        projectFilter={projectFilter}
        isFiltering={isFiltering}
        onFilterClick={handleProjectFilter}
      />

      <TestimonialsSection refCallback={assignSectionRef('testimonials')} />

      <ContactSection refCallback={assignSectionRef('contact')} profile={profile} />

      <ScrollTopButton visible={showScrollTop} onClick={() => scrollToSection('home')} />
    </main>
  );
}
