import styles from './aboutProject.module.scss';
import ContainerLayout from '../ContainerLayout';

function AboutProject(): JSX.Element {
  return (
    <section className={styles['about-project']}>
      <ContainerLayout>
        <div className={styles['about-project__wrapper']}>
          <h1 className={styles['about-project__title']}>About Project</h1>
          <p className={styles['about-project__description']}>
            <span className={styles['text_highlight']}>
              The GraphiQL Editor
            </span>{' '}
            is an application developed as the final project of the React Course
            offered by Rolling Scopes School. This app serves as a GraphQL
            playground/IDE, with additional functionalities such as
            authentication, authorization, and the ability to interact with any
            user-specified open GraphQL endpoint.
          </p>
        </div>
      </ContainerLayout>
    </section>
  );
}

export default AboutProject;
