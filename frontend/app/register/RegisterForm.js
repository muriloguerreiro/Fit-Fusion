import styles from './page.module.css'
import { redirect } from "next/navigation";

const baseUrl = process.env.API_URL

export default function RegisterForm() {
    async function createRegister(formData) {
        "use server"

        const rawFormData = {
            username: formData.get('username'),
            password: formData.get('password')
        }

        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rawFormData)
        })

        if (!response.ok) {
            throw new Error('Falha no registro')
        }
        
        redirect('/login')
    }

    return (
        <form action={createRegister} className={styles.form}>
            <input type="text" name="username" placeholder="Nome de usuário" className={styles.input}/>
            <input type="password" name="password" placeholder="Senha" className={styles.input}/>
            <button type="submit" className={styles.button}>Registrar</button>
        </form>
    )
}