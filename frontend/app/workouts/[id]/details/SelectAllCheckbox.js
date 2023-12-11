"use client"

import React from 'react';

function SelectAllCheckbox() {
  const handleClearCache = () => {
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      if (key.startsWith('exercise_')) {
        localStorage.removeItem(key);
      }
    });

    window.location.reload()
  };

  return (
    <div>
      <button onClick={handleClearCache}>Resetar</button>
    </div>
  );
}

export default SelectAllCheckbox;
