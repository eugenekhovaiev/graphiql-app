import Link from 'next/link';
import styles from './linkElement.module.scss';

interface Props {
  title: string;
  href: string;
  styleType?: 'light';
  className?: string;
  onClick?: () => void;
}

function LinkElement({
  styleType,
  className,
  title,
  href,
  onClick,
}: Props): JSX.Element {
  return (
    <Link
      className={`${styles.link} ${
        styleType === 'light' ? styles.link_light : ''
      } ${className || ''}`}
      href={href}
      onClick={onClick}
    >
      {title}
    </Link>
  );
}

export default LinkElement;
