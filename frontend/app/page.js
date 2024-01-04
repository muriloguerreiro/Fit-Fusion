import Link from 'next/link'
import styles from './page.module.css'
import WorkoutHandler from './WorkoutHandler'

const baseUrl = process.env.API_URL;

export default function Home() {

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Bem-vindo ao Fit Fusion!</h1>
      </header>
      <main className={styles.main}>

        <div className={styles.card}>
          <WorkoutHandler />
        </div>

        <div className={styles.card}>
          <Link className={styles.link} href="/">
            <h1 className={styles.cardTitle}>Dieta</h1>
          </Link>
        </div>

        <div className={styles.card}>
          <Link className={styles.link} href="/">
            <h1 className={styles.cardTitle}>Medidas</h1>
          </Link>
        </div>

        <div className={styles.card}>
          <Link className={styles.link} href="/">
            <h1 className={styles.cardTitle}>Perfil</h1>
          </Link>
        </div>

      </main >
    </div >
  );
}
