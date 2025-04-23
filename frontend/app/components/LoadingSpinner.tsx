export default function LoadingSpinner() {
  return (
    <div
      className="flex justify-center my-8"
      role="status"
      aria-label="Loading"
    >
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
} 
