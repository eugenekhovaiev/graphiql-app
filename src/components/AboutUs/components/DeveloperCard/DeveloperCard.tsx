import Image from 'next/image';
import styles from './developerCard.module.scss';
import Link from 'next/link';

interface Props {
  name: string;
  position: string;
  description: string;
  gitHubUrl: string;
  imageUrl?: string;
}

function DeveloperCard({
  name,
  position,
  description,
  gitHubUrl,
  imageUrl,
}: Props): JSX.Element {
  return (
    <div className={styles.card}>
      <Image
        src={imageUrl || '/card-placeholder.svg'}
        className={styles.card__image}
        width={250}
        height={250}
        alt="photo"
        priority
      />
      <div className={styles.card__info}>
        <h2 className={styles.card__title}>{name}</h2>
        <Link
          href={gitHubUrl}
          target="_blank"
          className={styles.card__subtitle}
        >
          <Image
            src="./logo-github-blue.svg"
            width={25}
            height={26}
            className={styles.card__ghLogo}
            alt="GitHub logo"
          />
          <span className={styles.card__ghText}>{position}</span>
        </Link>
        <p className={styles.card__description}>{description}</p>
      </div>
    </div>
  );
}

export default DeveloperCard;
