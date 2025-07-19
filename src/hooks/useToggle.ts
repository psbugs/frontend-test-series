import { useState } from 'react';
export function useToggle(initialValue = false) {

  const [value, toggle] = useState(initialValue);
  return {
    value,
    toggle
  }
};
