import { useState } from "react";

// properly type the filter categories
type FilterCategories = {
  [key: string]: string[];
};

// filter categories with their respective tags
const filterCategories: FilterCategories = {
  "Trip Type": [
    "For Solo Travelers",
    "For Families",
    "For Friends",
    "Cultural Immersion",
    "Sustainable Tourism",
  ],
  "Budget": [
    "Budget-Friendly",
    "Mid-Range",
    "Luxury Indulgences",
  ],
  "Attractions": [
    "Art Museum",
    "Science Museum",
    "Historical Landmarks",
    "Architectural Wonders",
    "Literary Landmarks",
    "Hidden Gems",
    "Photogenic Spots",
  ],
  "Experiences": [
    "Dining",
    "Culinary Discoveries",
    "Night Experiences",
    "Day Experiences",
    "Indie Boutiques",
    "Lofi Beats",
    "Seasonal Specialties",
  ],
  "Endorsements": [
    "Expert Endorsed",
    "Local Favorite",
  ],
};

// all tags flattened into a single array
const allTags = Object.values(filterCategories).flat();

type FilterBarProps = {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
};

export default function FilterBar({ selectedFilters, setSelectedFilters }: FilterBarProps) {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string | null>(null);
  
  // toggle a tag selection
  const toggleFilter = (tag: string) => {
    if (selectedFilters.includes(tag)) {
      setSelectedFilters(selectedFilters.filter(filter => filter !== tag));
    } else {
      setSelectedFilters([...selectedFilters, tag]);
    }
  };
  
  // toggle category tab visibility
  const toggleCategoryTab = (category: string) => {
    if (activeCategoryTab === category) {
      setActiveCategoryTab(null);
    } else {
      setActiveCategoryTab(category);
    }
  };
  
  // clear all filters
  const clearAllFilters = () => {
    setSelectedFilters([]);
    setActiveCategoryTab(null);
  };
  
  return (
    <div className="mb-6">
      {/* main filter categories */}
      <div className="flex space-x-2 mb-2 overflow-x-auto pb-2">
        <button
          onClick={clearAllFilters}
          className={`px-4 py-2 text-sm font-medium rounded-full hover:bg-gray-200 ${
            selectedFilters.length > 0 
              ? "bg-purple-100 text-purple-600 hover:bg-purple-200" 
              : "bg-gray-100"
          }`}
        >
          {selectedFilters.length > 0 ? `Clear Filters (${selectedFilters.length})` : "Filters"}
        </button>
        
        {Object.keys(filterCategories).map((category) => (
          <button
            key={category}
            onClick={() => toggleCategoryTab(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              activeCategoryTab === category
                ? "bg-gray-200"
                : selectedFilters.some(filter => filterCategories[category].includes(filter))
                  ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
                  : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {category}
            {selectedFilters.some(filter => filterCategories[category].includes(filter)) && 
              ` (${selectedFilters.filter(filter => filterCategories[category].includes(filter)).length})`
            }
          </button>
        ))}
      </div>
      
      {/* expanded filter tag options */}
      {activeCategoryTab && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 border animate-fadeIn">
          <h3 className="text-sm font-medium mb-3">{activeCategoryTab}</h3>
          <div className="flex flex-wrap gap-2">
            {filterCategories[activeCategoryTab].map((tag: string) => (
              <button
                key={tag}
                onClick={() => toggleFilter(tag)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedFilters.includes(tag)
                    ? "bg-purple-100 text-purple-600 hover:bg-purple-200"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* selected filters display */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedFilters.map((filter) => (
            <span 
              key={filter} 
              className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
            >
              {filter}
              <button 
                onClick={() => toggleFilter(filter)}
                className="ml-1.5 text-purple-500 hover:text-purple-700"
                aria-label={`Remove ${filter} filter`}
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
} 
