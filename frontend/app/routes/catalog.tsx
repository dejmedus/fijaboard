// TO DISCUSS: should a location be entered as a primary action in the main catalog page,
// or do we not want to limit it to location?
// TODO: upon clicking on a list, it should show up as a modal so we don't lose our position on the page
// or similar to Pinterest where it opens up a new view, and recommends similar things underneath 

import { useState, useEffect, useRef, useCallback } from 'react';

interface Item {
  id: number;
  height: number;
}

export default function Catalog() {
  const [viewMode, setViewMode] = useState('grid'); // grid or map view
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  
  // so that the grid can randomize heights bw 10rem and 30rem across the grid
  const getRandomHeight = () => Math.floor(Math.random() * (30 - 10 + 1) + 10);
  
  // simulate fetching data
  const fetchItems = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newItems = [...Array(12)].map((_, index) => ({
      id: (page - 1) * 12 + index,
      height: getRandomHeight()
    }));
    
    setItems(prev => [...prev, ...newItems]);
    setLoading(false);
  }, [page]);

  // initialize w first batch of items
  useEffect(() => {
    fetchItems();
  }, [page]);

  // set up intersection observer for infinite scroll (this part is called the observer - InstersectionObserver is an api that is used to detect 
  // when a user scrolls to the bottom of page)
  const lastItemRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading]);

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 py-4">
        {/* search/filter bar */}
        <header className="flex items-center justify-between mb-4">
          {/* search bar */}
          <form role="search" className="relative flex-1 max-w-xl">
            <label htmlFor="search-input" className="sr-only">Search lists</label>
            <input
              id="search-input"
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-2.5" aria-hidden="true">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* view controls */}
          <nav className="flex items-center space-x-4" aria-label="View options">
            <div className="flex space-x-2">
              <button 
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button 
                onClick={() => setViewMode('map')}
                aria-label="Map view"
                aria-pressed={viewMode === 'map'}
                className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </button>
            </div>
          </nav>
        </header>

        {/* filter nav */}
        <nav className="flex space-x-2 mb-6 overflow-x-auto pb-2" aria-label="List filters">
          <button role="tab" aria-selected="false" className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200">
            Filters
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200">
            Trip Length
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200">
            Budget
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200">
            Season
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200">
            Expert Endorsed
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200">
            Local Favourite
          </button>
        </nav>

        {/* create new collection button */}
        <button 
          className="w-full mb-6 px-4 py-3 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 flex items-center justify-center"
          aria-label="Create new collection"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create New Collection
        </button>

        {/* main masonry gruid */}
        <section 
          className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4"
          aria-label="List grid"
        >
          {items.map((item, index) => (
            <article 
              key={item.id}
              ref={index === items.length - 1 ? lastItemRef : null}
              className="break-inside-avoid mb-4"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <figure className="relative">
                  <img 
                    src={`https://source.unsplash.com/random/${Math.floor(Math.random() * 100 + 300)}x${item.height * 16}?sig=${item.id}`}
                    alt={`List ${item.id + 1}`}
                    className="w-full h-full object-cover"
                    style={{ height: `${item.height}rem` }}
                  />
                  <button 
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white"
                    aria-label="Add to favorites"
                  >
                    <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </figure>
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-1">List Title {item.id + 1}</h2>
                  <p className="text-sm text-gray-500">Brief description of the list goes here.</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* loading state */}
        {loading && (
          <div 
            className="flex justify-center my-8" 
            role="status"
            aria-label="Loading more listss"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="sr-only">Loading more listss...</span>
          </div>
        )}
      </section>
    </main>
  );
}
