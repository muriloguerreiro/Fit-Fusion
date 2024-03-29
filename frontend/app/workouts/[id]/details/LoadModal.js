import styles from './page.module.css'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

export default function LoadModal({ onClose, token, exercise }) {

    const router = useRouter()

    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [weightError, setWeightError] = useState('');

    const loads = exercise.loads

    loads.forEach(load => {
        load.createdAt = new Date(load.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit', month: '2-digit', year: '2-digit'
        })
    })

    async function onSubmit(formData) {

        const rawFormData = {
            weight: formData.get('weight'),
            exerciseId: exercise.id
        }

        if (isNaN(parseInt(rawFormData.weight, 10))) {
            setWeightError('Por favor, insira um número inteiro válido.');
        } else {
            setWeightError('');
            setIsLoading(true);
            const response = await fetch(`${baseUrl}/loads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(rawFormData)
            })

            if (!response.ok) {
                throw new Error('Falha ao buscar cargas')
            }

            setIsLoading(false);
            setSubmitted(true)
        }
    }

    useEffect(() => {
        if (submitted) {
            router.refresh()
            setSubmitted(false)
        }
    }, [submitted])

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <h4>{exercise.name}</h4>
                <ul>
                    {loads.map((load) => (
                        <li key={load.id}>{`${load.weight}kg - ${load.createdAt}`}</li>
                    ))}
                </ul>
                <form action={onSubmit}>
                    <input type="text" name="weight" placeholder="Adicionar carga" />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Carregando...' : 'Salvar'}
                    </button>
                    {weightError && <p style={{ color: 'red' }}>{weightError}</p>}
                </form>
            </div>
        </div>
    )
}