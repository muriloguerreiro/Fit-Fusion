import styles from './page.module.css'
import LoginForm from './LoginForm'
import Link from 'next/link'


export default function LoginPage() {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Entrar</h1>
      </header>
      <main className={styles.main}>
        <LoginForm />
        <Link href="/register" className={styles.link}>Não tem uma conta? Cadastre-se!</Link>
      </main>
    </div>
  )
}