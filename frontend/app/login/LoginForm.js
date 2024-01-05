import styles from './page.module.css'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const baseUrl = process.env.API_URL


export default function LoginForm() {

    async function login(formData) {
        "use server"

        const rawFormData = {
            username: formData.get('username'),
            password: formData.get('password')
        }

        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rawFormData),
            cache: 'no-store'
        })

        if (!response.ok) {
            throw new Error('Falha no login')
        }

        const res = await response.json()
        const token = res.token

        const nextCookies = cookies()
        nextCookies.set('token', token)

        redirect('/')

    }

    return (
        <form action={login} className={styles.form}>
            <input type="text" name="username" placeholder="Nome de usuário" className={styles.input} />
            <input type="password" name="password" placeholder="Senha" className={styles.input} />
            <button type="submit" className={styles.button}>Fazer Login</button>
        </form>
    )
}