import axios from "axios";
import { useEffect, useState } from "react";

export default function Swapi() {
  const [count, setCount] = useState(1);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    // 1. Оголошуємо асинхронну функцію
    async function fetchCharacter() {
      const response = await axios.get(
        `https://swapi.info/api/people/${count}`
      );
      setPerson(response.data);
    }

    // 2. Викликаємо її одразу після оголошення
    fetchCharacter();
  }, [count]);

  return (
    <>
      <h2>The count is {count}</h2>
      <button onClick={() => setCount(count + 1)}>Get next character</button>
      <pre>{JSON.stringify(person, null, 2)}</pre>
    </>
  );
}
