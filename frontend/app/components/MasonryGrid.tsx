import type { Fijalist } from "~/lib/types";
import { getRandomHeight } from "../utils/display";

interface MasonryGridProps {
  items: Fijalist[];
  lastItemRef?: (node: HTMLDivElement | null) => void;
  onItemClick: (item: Fijalist) => void;
}

export default function MasonryGrid({ items, lastItemRef, onItemClick }: MasonryGridProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
      {items.map((item, index) => (
        <article
          key={item.id}
          ref={index === items.length - 1 ? lastItemRef : null}
          className="break-inside-avoid mb-4"
        >
          <div 
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onItemClick(item)}
          >
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
        </article>
      ))}
    </div>
  );
} 
