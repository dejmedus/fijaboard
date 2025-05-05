import { useState, useRef, useCallback, useEffect } from "react";

interface UseInfiniteScrollOptions<T> {
  items: T[];
  pageSize: number;
  loadMore?: (items: T[]) => void;
}

export default function useInfiniteScroll<T>({ 
  items, 
  pageSize, 
  loadMore 
}: UseInfiniteScrollOptions<T>) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  // fetch items with pagination
  const fetchItems = useCallback(async () => {
    setLoading(true);
    
    // simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newItems = items.slice(0, page * pageSize);
    
    setDisplayedItems(newItems);
    
    if (loadMore) {
      loadMore(newItems);
    }
    
    setLoading(false);
  }, [items, page, pageSize, loadMore]);

  // load items when page changes or source items change
  useEffect(() => {
    fetchItems();
  }, [fetchItems, page, items]);

  // intersection observer reference to attach to last item
  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          if (page * pageSize < items.length) {
            setPage(prev => prev + 1);
          }
        }
      });
      
      if (node) observer.current.observe(node);
    },
    [loading, page, pageSize, items.length]
  );

  return {
    loading,
    displayedItems,
    lastItemRef,
    hasMore: page * pageSize < items.length
  };
} 
