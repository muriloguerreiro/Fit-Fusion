import Link from 'next/link'
import styles from './page.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Bem-vindo ao Fit Fusion!</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.cardContainer}>

          <div className={styles.card}>
            <Link className={styles.link} href="/workouts/1">
                <h1 className={styles.cardTitle}>Treinos</h1>
            </Link>
          </div>

          <div className={styles.card}>
            <Link className={styles.link} href="/workouts/1">
                <h1 className={styles.cardTitle}>Dieta</h1>
            </Link>
          </div>

          <div className={styles.card}>
            <Link className={styles.link} href="/workouts/1">
                <h1 className={styles.cardTitle}>Medidas</h1>
            </Link>
          </div>

          <div className={styles.card}>
            <Link className={styles.link} href="/workouts/1">
                <h1 className={styles.cardTitle}>Perfil</h1>
            </Link>
          </div>
        </div>
      </main >
    </div >
  );
}
