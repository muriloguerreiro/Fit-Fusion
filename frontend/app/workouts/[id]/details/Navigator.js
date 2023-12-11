"use client"

import styles from './page.module.css'

function Navigator({ workouts }) {

  return (
    <div className={styles.navigator}>
      <ul className={styles.navigatorRow}>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <a href={`/workout/${workout.id}`}>Treino {workout.id}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navigator;
