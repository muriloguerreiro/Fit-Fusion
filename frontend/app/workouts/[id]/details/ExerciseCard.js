"use client";

import { useState, useEffect } from 'react';
import styles from './page.module.css'

import Link from 'next/link';
import LoadModal from './LoadModal';

function ExerciseCard({ exercise, token }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    const checked = localStorage.getItem(`exercise_${exercise.id}_checked`) === 'true';
    setIsChecked(checked);
  }, [exercise.id]);

  async function handleCheckboxChange() {
    const newState = !isChecked;
    setIsChecked(newState);
    localStorage.setItem(`exercise_${exercise.id}_checked`, newState);
  }

  return (
    <div>
      <h3 style={{ opacity: isChecked ? 0.2 : 1, textDecoration: isChecked ? 'line-through' : 'none' }} className={styles.exerciseName}>{exercise.name}</h3>
      <div className={styles.exerciseDetails}>
        <p style={{ opacity: isChecked ? 0.2 : 1, textDecoration: isChecked ? 'line-through' : 'none' }}>{exercise.series}</p>
        <p style={{ opacity: isChecked ? 0.2 : 1, textDecoration: isChecked ? 'line-through' : 'none' }}>{exercise.reps}</p>
        {exercise.interval && <p style={{ opacity: isChecked ? 0.2 : 1, textDecoration: isChecked ? 'line-through' : 'none' }}>{exercise.interval}</p>}
        <Link style={{ color: isChecked ? 'black' : 'blue', opacity: isChecked ? 0.2 : 1, textDecoration: isChecked ? 'line-through' : 'none' }} className={styles.button} href={exercise.link}>
          {exercise.link ? 'Vídeo' : 'S/ Vídeo'}
        </Link>
        <button onClick={openModal} style={{ color: isChecked ? 'black' : 'blue', opacity: isChecked ? 0.2 : 1, textDecoration: isChecked ? 'line-through' : 'none' }} className={styles.button}>Carga</button>
        {isModalOpen && <LoadModal onClose={closeModal} token={token} exercise={exercise}/>}
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}

export default ExerciseCard;