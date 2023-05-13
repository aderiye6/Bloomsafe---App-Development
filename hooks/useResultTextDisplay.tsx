import { useEffect, useState } from 'react';

export default function useResultTextDisplay(resultText: string) {
  const [resultTextDisplay, setResultTextDisplay] = useState('');
  useEffect(() => {
    resultText.toLowerCase() === 'really bad'
      ? setResultTextDisplay('Water is really Bad to drink or play in.')
      : resultText.toLowerCase() === 'slightly bad'
      ? setResultTextDisplay('Water is slightly bad to drink or play in.')
      : resultText.toLowerCase() === 'slightly safe'
      ? setResultTextDisplay('Water is safe to drink or play in.')
      : setResultTextDisplay('');
  }, [resultText]);

  return { resultTextDisplay };
}
