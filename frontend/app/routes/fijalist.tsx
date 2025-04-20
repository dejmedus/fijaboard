import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams } from "react-router";
import useData from "../hooks/useData";
import type { Fijalist } from "~/lib/types";

export default function FijalistDetail() {
  const { id } = useParams<{ id: string }>();
  const { fijalists } = useData();
  
  const [currentFijalist, setCurrentFijalist] = useState<Fijalist | null>(null);
  
  // to display related lists w infinite scrolling
  const [relatedLists, setRelatedLists] = useState<Fijalist[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  // get current fijalist based on ID from route params
  useEffect(() => {
    if (id) {
      const fijalist = fijalists.find(item => item.id === id);
      setCurrentFijalist(fijalist || null);
    }
  }, [id, fijalists]);

  // function to find related lists based on tags
  const findRelatedLists = useCallback(() => {
    if (!currentFijalist || !currentFijalist.tags) return [];
    
    const currentTags = currentFijalist.tags.map(tag => tag.id);
    
    // find other fijalists with at least one matching tag, excluding current one
    return fijalists.filter(item => 
      item.id !== currentFijalist.id && 
      item.tags && 
      item.tags.some(tag => currentTags.includes(tag.id))
    );
  }, [currentFijalist, fijalists]);

  const fetchRelatedItems = useCallback(async () => {
    if (!currentFijalist) return;
    
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allRelated = findRelatedLists();
    const newItems = allRelated.slice(0, page * 6);
    
    setRelatedLists(newItems);
    setLoading(false);
  }, [currentFijalist, findRelatedLists, page]);

  // to load related lists when current fijalist changes
  useEffect(() => {
    fetchRelatedItems();
  }, [fetchRelatedItems, page]);

  // same infinite scroll logic as catalog
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          const allRelated = findRelatedLists();
          if (page * 6 >= allRelated.length) {
            observer.current?.disconnect();
            return;
          }
          
          setPage(prev => prev + 1);
        }
      });
      
      if (node) observer.current.observe(node);
    },
    [loading, page, findRelatedLists]
  );

  const getRandomHeight = () => Math.floor(Math.random() * (30 - 10 + 1) + 10);

  if (!currentFijalist) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* back button */}
        <Link 
          to="/catalog" 
          className="inline-flex items-center mb-6 text-purple-600 hover:text-purple-800"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Catalog
        </Link>

        {/* main fijalist content */}
        <section className="mb-12">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            {/* cover image */}
            <div className="relative h-72 md:h-96">
              <img 
                src={currentFijalist.cover_image || 'https://via.placeholder.com/800x400?text=No+Image'} 
                alt={currentFijalist.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">{currentFijalist.title}</h1>
              
              {/* tag */}
              {currentFijalist.tags && currentFijalist.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentFijalist.tags.map(tag => (
                    <span 
                      key={tag.id}
                      className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-gray-600 mb-6">{currentFijalist.description}</p>
              
              {/* main list */}
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap">{currentFijalist.content}</div>
              </div>
            </div>
          </div>
        </section>

        {/* related lists section */}
        {relatedLists.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Lists</h2>
            
            {/* same masonry grid as catalog */}
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
              {relatedLists.map((item, index) => (
                <article
                  key={item.id}
                  ref={index === relatedLists.length - 1 ? lastItemRef : null}
                  className="break-inside-avoid mb-4"
                >
                  <Link to={`/fijalist/${item.id}`}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <figure className="relative">
                        <img
                          src={item.cover_image || 'https://via.placeholder.com/400x300?text=No+Image'}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          style={{ height: `${getRandomHeight()}rem` }}
                        />
                      </figure>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            
            {loading && (
              <div
                className="flex justify-center my-8"
                role="status"
                aria-label="Loading more lists"
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <span className="sr-only">Loading more lists...</span>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
} 
