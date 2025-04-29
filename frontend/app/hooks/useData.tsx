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
  updateCollection: (
    collectionId: string,
    updatedCollection: Collection
  ) => Promise<boolean>;
  deleteCollection: (collectionId: string) => Promise<boolean>;
  addFijalistToCollection: (
    collectionId: string,
    fijalist: Fijalist
  ) => Promise<boolean>;
  removeFijalistFromCollection: (
    collectionId: string,
    fijalistId: string
  ) => Promise<boolean>;
}

const defaultContext: DataContextType = {
  isLoading: true,
  error: null,
  fijalists: [],
  collections: [],
  collectionNames: [],
  addCollection: () => Promise.resolve(false),
  updateCollection: () => Promise.resolve(false),
  deleteCollection: () => Promise.resolve(false),
  addFijalistToCollection: () => Promise.resolve(false),
  removeFijalistFromCollection: () => Promise.resolve(false),
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

      const newCollection = await response.json();
      setCollections((prev) => [...prev, newCollection]);

      return true;
    } catch (err: any) {
      setError(err.message || "Could not add collection");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCollection = async (collectionId: string) => {
    setIsLoading(true);

    if (!collectionId) {
      setError("Collection ID is required");
      setIsLoading(false);
      return false;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/collections/${collectionId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not delete collection");
      }

      setCollections((prev) =>
        prev.filter((collection) => String(collection.id) !== collectionId)
      );

      return true;
    } catch (err: any) {
      setError(err.message || "Could not delete collection");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCollection = async (
    collectionId: string,
    updatedCollection: Collection
  ) => {
    setIsLoading(true);

    if (!collectionId || !updatedCollection) {
      setError("Collection is required");
      setIsLoading(false);
      return false;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/collections/${collectionId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedCollection),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Could not update collection");
      }

      setCollections((prev) =>
        prev.map((collection) => {
          if (String(collection.id) === collectionId) {
            return { ...collection, ...updatedCollection };
          }
          return collection;
        })
      );

      return true;
    } catch (err: any) {
      setError(err.message || "Could not update collection");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const addFijalistToCollection = async (
    collectionId: string,
    fijalist: Fijalist
  ) => {
    setIsLoading(true);

    if (!collectionId || !fijalist) {
      setError("Collection ID and Fijalist are required");
      setIsLoading(false);
      return false;
    }

    const collection = collections.find(
      (collection) => String(collection.id) === collectionId
    );

    if (collection && collection.fijalists) {
      const isFijalistInCollection = collection.fijalists.some(
        (fijalistInCollection) =>
          String(fijalistInCollection.id) === String(fijalist.id)
      );
      if (isFijalistInCollection) {
        setError("Fijalist is already in the collection");
        setIsLoading(false);
        return false;
      }
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/collections/${collectionId}/fijalists/${fijalist.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Could not add fijalist to collection"
        );
      }

      setCollections((prev) =>
        prev.map((collection) => {
          if (String(collection.id) === collectionId) {
            return {
              ...collection,
              fijalists: [...(collection.fijalists || []), fijalist],
            };
          }
          return collection;
        })
      );

      return true;
    } catch (err: any) {
      setError(err.message || "Could not add fijalist to collection");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFijalistFromCollection = async (
    collectionId: string,
    fijalistId: string
  ) => {
    setIsLoading(true);

    if (!collectionId || !fijalistId) {
      setError("Collection ID and Fijalist ID are required");
      setIsLoading(false);
      return false;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/collections/${collectionId}/fijalists/${fijalistId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Could not remove fijalist from collection"
        );
      }

      setCollections((prev) =>
        prev.map((collection) => {
          if (String(collection.id) === collectionId) {
            return {
              ...collection,
              fijalists: collection.fijalists?.filter(
                (fijalist) => String(fijalist.id) !== fijalistId
              ),
            };
          }
          return collection;
        })
      );

      return true;
    } catch (err: any) {
      setError(err.message || "Could not add fijalist from collection");
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
        updateCollection,
        deleteCollection,
        addFijalistToCollection,
        removeFijalistFromCollection,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default function useData() {
  return useContext(DataContext);
}
