import Link from 'next/link';
import styles from './linkElement.module.scss';

interface Props {
  styleType?: 'light';
  title: string;
  href: string;
}

function LinkElement({ styleType, title, href }: Props): JSX.Element {
  return (
    <Link
      className={`
      ${styles.link}
      ${styleType === 'light' && styles.link_light}
      `}
      href={href}
    >
      {title}
    </Link>
  );
}

export default LinkElement;
