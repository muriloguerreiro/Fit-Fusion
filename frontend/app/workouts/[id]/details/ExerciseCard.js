"use client";

import { useState } from 'react';
import styles from './page.module.css'

import Link from 'next/link';

function ExerciseCard({ exercise }) {
  const [isChecked, setIsChecked] = useState(localStorage.getItem(`exercise_${exercise.id}_checked`) === 'true')

  const handleCheckboxChange = () => {
    if (typeof window !== 'undefined') {
      const newState = !isChecked;
      setIsChecked(newState);
      localStorage.setItem(`exercise_${exercise.id}_checked`, newState);
    }
  };

  return (
    <div>
      <h3 style={{ opacity: isChecked ? 0.2 : 1, textDecoration: isChecked ? 'line-through' : 'none' }} className={styles.exerciseName}>{exercise.name}</h3>
      <div className={styles.exerciseDetails}>
        <p style={{ opacity: isChecked ? 0.2 : 1, textDecoration: isChecked ? 'line-through' : 'none' }}>{exercise.series}</p>
        <p style={{ opacity: isChecked ? 0.2 : 1, textDecoration: isChecked ? 'line-through' : 'none' }}>{exercise.reps}</p>
        <Link style={{ color: isChecked ? 'black' : 'blue', opacity: isChecked ? 0.2 : 1, textDecoration: isChecked ? 'line-through' : 'none' }} className={styles.link} href={exercise.link}>
          {exercise.link ? 'Vídeo' : 'S/ Vídeo'}
        </Link>
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
