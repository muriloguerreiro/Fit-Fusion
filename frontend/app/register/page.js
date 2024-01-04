import styles from './page.module.css'
import RegisterForm from './RegisterForm'
import Link from 'next/link'


export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Cadastre-se</h1>
      </header>
      <main className={styles.main}>
        <RegisterForm />
        <Link href="/login" className={styles.link}>Já possui uma conta? Faça o login!</Link>
      </main>
    </div>
  )
}