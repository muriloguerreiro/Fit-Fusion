import Image from 'next/image'
import styles from './page.module.css'
import ExerciseCard from './ExerciseCard'
import SelectAllCheckbox from './SelectAllCheckbox'

async function getApiData(id) {
  const res = await fetch(`http://localhost:8080/workouts/${id}/details`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page({ params }) {
  const [id] = params.id
  const response = await getApiData(id)
  const workout = response.workout
  const exercises = response.exercises

  workout.created_at = new Date(workout.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  })

  workout.due = new Date(workout.due).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  })

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{workout.name}</h1>
        <Image
          className={styles.image}
          src={workout.image_url}
          alt={workout.name}
          width={1000}
          height={400}
        />
        <div className={styles.descriptionRow}>
          <div className={styles.descriptionColumn}>
            <p>Criado em: {workout.created_at}</p>
            <p>Vencimento: {workout.due}</p>
          </div>
          <SelectAllCheckbox />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.exercisesList}>
          {exercises.map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </main>
    </div>
  )
}