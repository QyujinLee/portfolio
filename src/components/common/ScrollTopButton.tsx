import styles from './ScrollTopButton.module.scss';

interface ScrollTopButtonProps {
  visible: boolean;
  onClick: () => void;
}

export default function ScrollTopButton({ visible, onClick }: ScrollTopButtonProps) {
  return (
    <button
      type="button"
      aria-label="페이지 상단으로 이동"
      className={`${styles.arrowUp} ${visible ? styles.visible : ''}`}
      onClick={onClick}
    >
      ↑
    </button>
  );
}
