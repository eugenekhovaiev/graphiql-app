import Link from 'next/link';
import styles from './linkElement.module.scss';

interface IProps {
  type?: 'light';
  title: string;
  href: string;
}

function LinkElement({ type, title, href }: IProps): JSX.Element {
  return (
    <Link
      className={`
      ${styles.link}
      ${type === 'light' && styles.link_light}
      `}
      href={href}
    >
      {title}
    </Link>
  );
}

export default LinkElement;
