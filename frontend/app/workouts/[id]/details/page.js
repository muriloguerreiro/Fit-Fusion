import Image from 'next/image'
import styles from './page.module.css'
import ExerciseCard from './ExerciseCard'
import SelectAllCheckbox from './SelectAllCheckbox'
import Navigator from './Navigator'

const baseUrl = process.env.API_URL;

async function getApiWorkoutDetails(id) {
  const res = await fetch(`${baseUrl}/workouts/${id}/details`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getApiWorkouts() {
  const res = await fetch(`${baseUrl}/workouts`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page({ params }) {
  const [id] = params.id
  const response = await getApiWorkoutDetails(id)
  const response2 = await getApiWorkouts()

  const workout = response.workout
  const exercises = response.exercises
  const workoutsList = response2.workouts

  workout.created_at = new Date(workout.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  })

  workout.due = new Date(workout.due).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  })

  return (
    <div className={styles.container}>
      <Navigator workouts={workoutsList} />
      <div className={styles.bodyContainer}>
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
    </div>
  )
}