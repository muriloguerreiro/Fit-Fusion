import Image from 'next/image'
import styles from './page.module.css'
import ExerciseCard from './ExerciseCard'
import SelectAllCheckbox from './SelectAllCheckbox'
import Navigator from './Navigator'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const baseUrl = process.env.API_URL;

async function getApiWorkoutDetails(id, token) {
  const res = await fetch(`${baseUrl}/workouts/${id}/details`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (res.status == "403") {
    throw new Error('Forbidden')
  }

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getApiWorkoutsByLoggedUser(token) {
  const res = await fetch(`${baseUrl}/workouts/user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })


  if (res.status == "403") {
    throw new Error('Forbidden')
  }

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page({ params }) {
  const [id] = params.id

  const nextCookies = cookies()
  const token = nextCookies.get('token')

  if (!token) {
    throw new Error('Failed to get token')
  }

  const response = await getApiWorkoutDetails(id, token)
  const response2 = await getApiWorkoutsByLoggedUser(token)

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
              return <ExerciseCard key={exercise.id} exercise={exercise} loads={exerciseLoads} token={token} />
            })}
          </div>
        </main>
      </div>
    </div>
  )
}