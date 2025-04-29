import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "./useAuth";
import type { Collection, Fijalist } from "../lib/types";

interface DataContextType {
  isLoading: boolean;
  error: string | null;
  fijalists: Fijalist[];
  collections: Collection[];
  collectionNames: string[];
  addCollection: (collection: Collection) => Promise<boolean>;
}

const defaultContext: DataContextType = {
  isLoading: true,
  error: null,
  fijalists: [],
  collections: [],
  collectionNames: [],
  addCollection: () => Promise.resolve(false),
};

const DataContext = createContext<DataContextType>(defaultContext);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;
  const [fijalists, setFijalists] = useState<Fijalist[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionNames, setCollectionNames] = useState<string[]>([]);
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

    const fetchCollections = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/users/${user?.id}/collections`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch collections");
        const data = await response.json();
        setCollections(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchCollections();
    }

    fetchFijalists();
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    setCollectionNames([
      "All",
      ...collections.map((collection) => collection.name),
    ]);
  }, [collections]);

  const addCollection = async (collection: Collection) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/collections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(collection),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not add collection");
      }

      setCollections((prev) => [...prev, collection]);

      return true;
    } catch (err: any) {
      setError(err.message || "Could not add collection");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        isLoading,
        error,
        fijalists,
        collections,
        collectionNames,
        addCollection,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default function useData() {
  return useContext(DataContext);
}
