import Image from 'next/image'
import styles from './page.module.css'
import ExerciseCard from './ExerciseCard'
import SelectAllCheckbox from './SelectAllCheckbox'
import Navigator from './Navigator'
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

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
      throw new Error(`Old token for - ${baseUrl}/workouts/${id}/details and ${token}`)
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch WorkoutDetails - ${res.status}`)
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
      redirect('/')
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

  workout.createdAt = new Date(workout.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  })

  workout.due = new Date(workout.due).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  })

  const workoutsList = response2.workouts

  return (
    <div className={styles.container}>
      <Navigator workouts={workoutsList} />
      <div className={styles.bodyContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>{workout.name}</h1>
          <Image
            className={styles.image}
            src={workout.imageUrl}
            alt={workout.name}
            width={1000}
            height={400}
          />
          <div className={styles.descriptionRow}>
            <div className={styles.descriptionColumn}>
              <p>Criado em: {workout.createdAt}</p>
              <p>Vencimento: {workout.due}</p>
            </div>
            <SelectAllCheckbox />
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.exercisesList}>
            {workout.exercises.map(exercise => {
              return <ExerciseCard key={exercise.id} exercise={exercise} token={token.value} />
            })}
          </div>
        </main>
      </div>
    </div>
  )
}