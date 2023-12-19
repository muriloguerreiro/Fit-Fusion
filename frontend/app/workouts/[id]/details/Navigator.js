"use client"

import styles from './page.module.css'
import Link from 'next/link';

function Navigator({ workouts }) {

  return (
    <div className={styles.navigatorRow}>
      {workouts.map((workout) => (
        <div key={workout.id}>
          <Link className={styles.link} href={`/workouts/${workout.id}/details`} key={workout.id}>
            Treino {workout.id}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Navigator;