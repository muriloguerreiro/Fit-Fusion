import Image from 'next/image'
import styles from './page.module.css'
import ExerciseCard from './ExerciseCard'
import SelectAllCheckbox from './SelectAllCheckbox'
import Navigator from './Navigator'
import { cookies } from "next/headers";

const baseUrl = process.env.API_URL;

export default async function Page({ params }) {
  
  async function getApiWorkoutDetails(id, token) {
    "use server"

    const res = await fetch(`${baseUrl}/workouts/${id}/details`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  
    if (res.status == "403") {
      throw new Error(`Forbidden for token: ${token}`)
    }
  
    if (!res.ok) {
      throw new Error('Failed to fetch WorkoutDetails')
    }
  
    return res.json()
  }
  
  async function getApiWorkoutsByLoggedUser(token) {
    "use server"

    const res = await fetch(`${baseUrl}/workouts/user`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  
  
    if (res.status == "403") {
      throw new Error('Forbidden2')
    }
  
    if (!res.ok) {
      throw new Error('Failed to fetch WorkoutsByLoggedUser')
    }
  
    return res.json()
  }
  
  const [id] = params.id

  const nextCookies = cookies()
  const token = nextCookies.get('token')

  if (!token) {
    throw new Error('Failed to get token')
  }

  const response = await getApiWorkoutDetails(id, token.value)
  const response2 = await getApiWorkoutsByLoggedUser(token.value)

  const workout = response.workout
  const exercises = response.exercises
  const loads = response.loads

  loads.forEach(load => {
    load.created_at = new Date(load.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: '2-digit'
    })
  })

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
            {exercises.map(exercise => {
              const exerciseLoads = loads.filter(load => load.exercise_id === exercise.id)
              return <ExerciseCard key={exercise.id} exercise={exercise} loads={exerciseLoads} token={token.value} />
            })}
          </div>
        </main>
      </div>
    </div>
  )
}