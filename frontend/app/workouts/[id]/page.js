import styles from './page.module.css'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const baseUrl = process.env.API_URL;

async function getApiData(id) {

  const nextCookies = cookies()
  const token = nextCookies.get('token')

  if (!token) {
    redirect("/login")
  }

  const res = await fetch(`${baseUrl}/workouts/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })

  if (res.status == "403") {
    redirect("/login")
  }

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page({ params }) {
  const [id] = params.id
  const response = await getApiData(id)
  const workout = response.workout

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>{workout.name}</h1>
      </header>
      <main className={styles.main}>
        {workout ? (
          <div>
            <p>Image Url: {workout.image_url}</p>
            <p>Prazo: {workout.due}</p>
          </div>
        ) : (
          <p>Carregando detalhes do treino...</p>
        )}
      </main>
    </div>
  )
}