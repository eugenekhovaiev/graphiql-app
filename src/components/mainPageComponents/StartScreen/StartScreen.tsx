import styles from './startScreen.module.scss';
import Image from 'next/image';
import ContainerLayout from '../../ContainerLayout';
import graphQLSvg from '../../../../public/qraph-ql.svg';

function StartScreen(): JSX.Element {
  return (
    <section className={styles.startScreen}>
      <ContainerLayout>
        <div className={styles.startScreen__wrapper}>
          <div className={styles.startScreen__description}>
            <h1 className={styles.startScreen__title}>
              Your playground for GraphQL requests
            </h1>
            <p className={styles.startScreen__helperText}>
              Craft queries effortlessly with our user-friendly interface
            </p>
          </div>
          <div className={styles.startScreen__imageContainer}>
            <Image
              className={styles.startScreen__image}
              src={graphQLSvg}
              alt="image"
            />
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
}

export default StartScreen;
