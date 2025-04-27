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
        
        // adding sample location data to some fijalists just for testing map view
        const enhancedData = data.map((fijalist: Fijalist, index: number) => {
          // adding location data to every other item for testing
          if (index % 2 === 0) {
            return {
              ...fijalist,
              location: {
                // generating random locations around the world to demo for now
                latitude: (Math.random() * 140 - 70),
                longitude: (Math.random() * 340 - 170),
                name: `Location for ${fijalist.title}`
              }
            };
          }
          return fijalist;
        });
        
        setFijalists(enhancedData);
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
