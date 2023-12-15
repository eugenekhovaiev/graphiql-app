import styles from './aboutCourse.module.scss';
import ContainerLayout from '../ContainerLayout';
import Link from 'next/link';

function AboutCourse(): JSX.Element {
  return (
    <section className={styles.aboutCourse}>
      <ContainerLayout>
        <div className={styles.aboutCourse__wrapper}>
          <h1 className={styles.aboutCourse__title}>React Course</h1>
          <p className={styles.aboutCourse__description}>
            <span className={styles.textHighlight}>RS School</span>, established
            by The Rolling Scopes developer community in 2013, is a
            community-based education program. As part of this program, the
            <span className={styles.textHighlight}> React Course</span> offers a
            <span className={styles.textHighlight}> cost-free</span> and
            <span className={styles.textHighlight}> online</span> learning
            experience in English, providing access to
            <span className={styles.textHighlight}> open-source</span> learning
            materials and the opportunity to receive an electronic
            <span className={styles.textHighlight}> certificate</span> upon
            successful completion.
          </p>
          <p className={styles.aboutCourse__description}>
            This course is specifically designed for students who have completed
            RS School Stage #2 during the 2022Q3 session, as well as new
            students with practical expertise and knowledge in JavaScript and
            TypeScript.
          </p>

          <Link target="_blank" href="https://rs.school/react/">
            Learn more
          </Link>
        </div>
      </ContainerLayout>
    </section>
  );
}

export default AboutCourse;
