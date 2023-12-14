import styles from './startScreen.module.scss';
import Image from 'next/image';
import ContainerLayout from '../ContainerLayout';

function StartScreen(): JSX.Element {
  return (
    <section className={styles['start-screen']}>
      <ContainerLayout>
        <div className={styles['start-screen__wrapper']}>
          <div className={styles['start-screen__description']}>
            <h1 className={styles['start-screen__title']}>
              Your playground for GraphQL requests
            </h1>
            <p className={styles['start-screen__helper-text']}>
              Craft queries effortlessly with our user-friendly interface
            </p>
          </div>
          <div className={styles['start-screen__image-container']}>
            <Image
              className={styles['start-screen__image']}
              src={'/qraph-ql.svg'}
              width={200}
              height={203}
              alt="image"
              priority
            />
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
}

export default StartScreen;
