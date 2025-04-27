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
  
  // store previous items in a ref to avoid unnecessary re-renders
  const prevItemsRef = useRef<T[]>([]);
  
  // only recalculate displayed items when the source items actually change
  const itemsChanged = items !== prevItemsRef.current && 
    (items.length !== prevItemsRef.current.length || 
     JSON.stringify(items.map(i => (i as any).id)) !== 
     JSON.stringify(prevItemsRef.current.map(i => (i as any).id)));

  // fetch items w pagination - use useEffect instead of a separate function
  useEffect(() => {
    // skip if items havent changed and if page has already been processed
    if (!itemsChanged && displayedItems.length === Math.min(page * pageSize, items.length)) {
      return;
    }
    
    prevItemsRef.current = items;
    setLoading(true);
    
    // use timeout to avoid too many rerenders
    const timer = setTimeout(() => {
      const newItems = items.slice(0, page * pageSize);
      setDisplayedItems(newItems);
      
      if (loadMore) {
        loadMore(newItems);
      }
      
      setLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [items, page, pageSize, loadMore, itemsChanged, displayedItems.length]);

  // intersection observer reference to attach to last item
  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          if (page * pageSize >= items.length) {
            observer.current?.disconnect();
            return;
          }
          
          // debounce page changes to avoid rapid changes
          setTimeout(() => {
            setPage(prev => prev + 1);
          }, 200);
        }
      }, {
        rootMargin: '100px', // load earlier before reaching the end
        threshold: 0.1
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
