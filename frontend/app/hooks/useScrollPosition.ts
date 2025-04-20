// TO DISCUSS: what do we want when the user presses the "Back to catalog" button in the fijalist page?
// do we want to save the scroll position and restore it when the user clicks the "Back to catalog" button?

import { useEffect } from "react";

// global object to store scroll positions by route
const scrollPositions: Record<string, number> = {};

// save current scroll position before leaving a route
export function saveScrollPosition(route: string) {
  scrollPositions[route] = window.scrollY;
}

// custom hook to restore scroll position when returning to a route
export function useRestoreScrollPosition(route: string) {
  useEffect(() => {
    // check if we have a saved position for this route
    if (scrollPositions[route] !== undefined) {
      // use a small timeout to ensure the DOM has updated
      const timer = setTimeout(() => {
        window.scrollTo(0, scrollPositions[route]);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [route]);
} 
