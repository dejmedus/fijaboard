import { createContext, useContext, useEffect, useState } from "react";
import type { Fijalist } from "../lib/types";

interface DataContextType {
  isLoading: boolean;
  error: string | null;
  fijalists: Fijalist[];
}

const defaultContext: DataContextType = {
  isLoading: true,
  error: null,
  fijalists: [],
};

const DataContext = createContext<DataContextType>(defaultContext);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;
  const [fijalists, setFijalists] = useState<Fijalist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFijalists = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/fijalists`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch FijaLists");
        const data = await response.json();
        setFijalists(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFijalists();
    setIsLoading(false);
  }, []);

  return (
    <DataContext.Provider
      value={{
        isLoading,
        error,
        fijalists,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default function useData() {
  return useContext(DataContext);
}
