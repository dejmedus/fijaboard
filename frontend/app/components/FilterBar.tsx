import { useState } from "react";

// properly type the filter categories
type FilterCategories = {
  [key: string]: string[];
};

// utility funct to format tag displays: convert hyphenated strings to title case
const formatTagDisplay = (tag: string): string => {
  return tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// filter categories with their respective tags
const filterCategories: FilterCategories = {
  "Locations": [
    "new-york-city", 
    "san-francisco", 
    "portland", 
    "seattle", 
    "miami", 
    "new-orleans", 
    "boston", 
    "chicago", 
    "tokyo", 
    "paris", 
    "london", 
    "austin", 
    "manhattan",
    "queens", 
    "brooklyn", 
    "dublin", 
    "rome", 
    "melbourne", 
    "key-west",
    "vancouver",
    "singapore", 
    "santorini", 
    "california",
    "italy",
    "france",
    "uk",
    "texas",
    "florida",
  ],
  "Nature & Outdoors": [
    "nature",
    "animals",
    "wildlife",
    "outdoors",
    "hiking",
    "gardens",
    "marine-life",
    "eco-tourism",
    "national-parks",
    "geology",
    "mountains",
    "landscapes",
    "outdoor-adventure",
    "rain",
  ],
  "Food & Drink": [
    "food",
    "food-drink",
    "restaurants",
    "cafes",
    "coffee",
    "street-food",
    "fine-dining",
    "chocolate",
    "culinary",
    "craft-beer",
    "cocktails",
    "pubs",
    "asian-cuisine",
    "italian-cuisine",
    "hawker-centers",
    "culinary-heritage",
    "traditional",
    "cooking",
    "family-recipes",
    "gourmet",
  ],
  "Art & Culture": [
    "art",
    "street-art",
    "museums",
    "culture",
    "design",
    "literature",
    "history",
    "architecture",
    "urban-culture",
    "indigenous",
    "aboriginal",
    "social-justice",
    "metaphysical",
  ],
  "Entertainment": [
    "music",
    "jazz",
    "vinyl",
    "record-shops",
    "record-stores",
    "film",
    "film-locations",
    "filming-locations",
    "television",
    "nightlife",
    "entertainment",
    "dancing",
    "vintage",
    "retro",
  ],
  "Experience Types": [
    "hidden-gems",
    "outdoor-activities",
    "family-friendly",
    "urban-exploration",
    "adventure",
    "romantic",
    "date-night",
    "spiritual",
    "historical",
    "slow-living",
    "relaxation",
    "mindfulness",
    "solitude",
    "unique",
    "celebration",
    "cozy",
    "shopping",
    "indoor",
    "picnic",
    "travel",
  ],
  "Special Themes": [
    "wes-anderson",
    "studio-ghibli",
    "miyazaki",
    "anime-inspired",
    "supernatural",
    "witchcraft",
    "bob-ross",
    "twilight",
    "taylor-swift",
    "cesar-chavez",
    "david-bowie",
    "marilyn-monroe",
    "hemingway",
    "kylie-jenner",
    "queens-gambit",
    "chess",
    "photography",
    "aesthetics",
    "sunset",
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
        {selectedFilters.length > 0 && (
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-sm font-medium rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
          >
            Clear Filters ({selectedFilters.length})
          </button>
        )}
        
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
                {formatTagDisplay(tag)}
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
              {formatTagDisplay(filter)}
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
