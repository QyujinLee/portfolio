import Image from 'next/image';
import { testimonials } from '../../data/portfolio';
import styles from './TestimonialsSection.module.scss';

interface TestimonialsSectionProps {
  refCallback: (element: HTMLElement | null) => void;
}

export default function TestimonialsSection({ refCallback }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" ref={refCallback} className={styles.section}>
      <div className={styles.container}>
        <h2>Testimonials</h2>
        <p>See what they say about me</p>

        <div className={styles.testimonials}>
          {testimonials.map((item) => (
            <article key={item.name} className={styles.testimonial}>
              <Image src="/images/testimonials/sample_person.png" alt={`${item.name} 프로필`} width={120} height={120} className={styles.avatar} />
              <div className={styles.bubble}>
                <p>{item.text}</p>
                <p className={styles.name}>
                  {item.name} / {item.company}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
