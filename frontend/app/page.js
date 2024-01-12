import Link from 'next/link'
import styles from './page.module.css'
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

const baseUrl = process.env.API_URL;

export default async function Home() {

  async function getApiDataByLoggedUser(token) {
    "use server"

    const res = await fetch(`${baseUrl}/workouts/user`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })


    if (res.status == "403") {
      redirect('/login')
    }

    if (!res.ok) {
      throw new Error('Failed to fetch WorkoutsByLoggedUser')
    }

    return res.json()
  }

  const nextCookies = cookies()
  const token = nextCookies.get('token')

  if (!token) {
    throw new Error('Failed to get token')
  }

  const response = await getApiDataByLoggedUser(token.value)

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Bem-vindo ao Fit Fusion!</h1>
      </header>
      <main className={styles.main}>

        <div className={styles.card}>
          {response.workouts ?
            <Link className={styles.link} href={`/workouts/${response.workouts[0].id}/details`}>
              <h1 className={styles.cardTitle}>Treinos</h1>
            </Link> : 'Usuário não possui treino!'}
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
