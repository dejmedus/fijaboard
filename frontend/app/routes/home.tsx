import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // react-router env vars are accessed with import.meta.env (like process.env)
    // VITE_BACKEND_URL comes from .env
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <main>
      <h1>{message}</h1>
    </main>
  );
}
