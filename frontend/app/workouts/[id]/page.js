import styles from './page.module.css'


async function getApiData(id) {
  const res = await fetch(`${process.env.API_URL}/workouts/${id}`)

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