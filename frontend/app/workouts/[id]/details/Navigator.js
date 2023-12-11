"use client"

import styles from './page.module.css'
import Link from 'next/link';

function Navigator({ workouts }) {

  return (
    <div className={styles.navigatorRow}>
      {workouts.map((workout) => (
        <Link className={styles.link} href={`/workouts/${workout.id}/details`} key={workout.id}>
          <div>Treino {workout.id}</div>
        </Link>
      ))}
    </div>
  );
}

export default Navigator;