export type SectionId = 'home' | 'about' | 'skills' | 'works' | 'testimonials' | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  about: string[];
  email: string;
  github: string;
}

export interface Major {
  title: string;
  icon: string;
  description: string;
}

export interface Job {
  company: string;
  role: string;
  period: string;
  logo: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Category {
  key: '*' | 'front-end' | 'back-end';
  label: string;
}

export interface Project {
  title: string;
  description: string;
  type: 'front-end' | 'back-end';
  image: string;
  href: string;
}

export interface Testimonial {
  name: string;
  company: string;
  text: string;
}

export const sectionOrder: SectionId[] = ['home', 'about', 'skills', 'works', 'testimonials', 'contact'];

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'works', label: 'My Works' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

export const profile: Profile = {
  name: 'Gyujin',
  title: "Hello, I'm a Web Developer",
  subtitle: '데이터로 소통하는 개발자, 이규진입니다.',
  about: [
    '4년 이상 SI 환경에서 대규모 서비스 개발과 운영을 경험했습니다.',
    '프론트엔드와 백엔드를 구분하지 않고 문제를 해결하는 풀스택 업무를 수행해 왔습니다.',
    '재사용 가능한 컴포넌트와 명확한 구조를 기반으로 협업 효율을 높이는 것을 중요하게 생각합니다.',
    '요구사항이 바뀌는 상황에서도 우선순위를 정리하고 안정적으로 납기하는 데 강점이 있습니다.',
  ],
  email: 'gyujin89@gmail.com',
  github: 'https://github.com/QyujinLee',
};

export const majors: Major[] = [
  {
    title: 'Front-End',
    icon: 'FE',
    description: 'HTML, CSS, JavaScript, React, Vue, Web APIs',
  },
  {
    title: 'Back-End',
    icon: 'BE',
    description: 'Java, Spring Boot, MySQL',
  },
];

export const jobs: Job[] = [
  {
    company: '오픈아이티',
    role: '서비스사업부 | 대리',
    period: '2018.11.01 ~ 현재',
    logo: '/images/jobs/logo-openit.png',
  },
];

export const skills: Skill[] = [
  { name: 'HTML', level: 99 },
  { name: 'JavaScript', level: 99 },
  { name: 'React', level: 90 },
  { name: 'Vue', level: 80 },
  { name: 'Spring Boot', level: 82 },
  { name: 'MySQL', level: 78 },
];

export const tools: string[] = ['Visual Studio Code', 'IntelliJ', 'Postman', 'DBeaver', 'Sourcetree'];

export const etcSkills: string[] = ['Git'];

export const categories: Category[] = [
  { key: '*', label: 'All' },
  { key: 'front-end', label: 'Front-End' },
  { key: 'back-end', label: 'Back-End' },
];

export const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description: 'HTML/CSS 기반 반응형 포트폴리오 구축',
    type: 'front-end',
    image: '/images/projects/sample_project.png',
    href: '#',
  },
  {
    title: 'Admin Dashboard',
    description: '컴포넌트 중심 대시보드 UI 개발',
    type: 'front-end',
    image: '/images/projects/sample_project.png',
    href: '#',
  },
  {
    title: 'API Service',
    description: 'Spring Boot 기반 업무 API 서버 구현',
    type: 'back-end',
    image: '/images/projects/sample_project.png',
    href: '#',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: '김주임',
    company: 'EMBIOME',
    text: '요구사항을 빠르게 구조화하고, 구현까지 책임감 있게 마무리하는 개발자입니다.',
  },
  {
    name: '최대리',
    company: 'Sentbe',
    text: '협업 커뮤니케이션이 명확하고, 일정 관리가 안정적입니다.',
  },
  {
    name: '박매니저',
    company: 'Kakao',
    text: '복잡한 이슈를 단계적으로 정리해 팀이 이해하기 쉬운 형태로 공유합니다.',
  },
];
