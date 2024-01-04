import styles from './page.module.css'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const baseUrl = process.env.API_URL

export default function WorkoutHandler() {

    async function navigateToWorkouts() {
        "use server"

        const nextCookies = cookies()
        const token = nextCookies.get('token')

        if(!token || token.value.trim() == "") {
            redirect('/login')
        }

        const response = await fetch(`${baseUrl}/workouts/user`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })

        if (response.status == "403") {
            redirect('/login')
        }

        if (!response.ok) {
            console.log(response)
            throw new Error('Falha ao buscar treinos')
        }

        const res = await response.json()

        if (!res.workouts) {
            redirect('/login')
        } else {
            const linkId = res.workouts[0].id
            redirect(`/workouts/${linkId}/details`)
        }
    }

    return (
        <form className={styles.navigateForm} action={navigateToWorkouts}>
            <button type="submit">
                <h1 className={styles.cardTitle}>Treinos</h1>
            </button>
        </form>
    )
}