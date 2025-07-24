import { SearchResult } from "@/services/searchService";

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onNewSearch: () => void;
}

export const SearchResults = ({ results, query, onNewSearch }: SearchResultsProps) => {
  return (
    <div className="w-full max-w-2xl">
      {/* Header with search stats */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-search-muted">
            About {results.length.toLocaleString()} results for "{query}"
          </p>
          <button
            onClick={onNewSearch}
            className="text-sm text-search-primary hover:underline"
          >
            New Search
          </button>
        </div>
      </div>

      {/* Results list */}
      <div className="space-y-6">
        {results.map((result) => (
          <div key={result.id} className="group">
            <div className="text-sm text-search-muted mb-1">
              {result.domain}
            </div>
            <h3 className="text-xl leading-tight mb-1">
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-search-primary hover:underline"
              >
                {result.title}
              </a>
            </h3>
            <p className="text-search-secondary leading-relaxed">
              {result.description}
            </p>
          </div>
        ))}
      </div>

      {/* No results state */}
      {results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-search-muted text-lg">
            No results found for "{query}"
          </p>
          <p className="text-search-muted text-sm mt-2">
            Try different keywords or check your spelling
          </p>
        </div>
      )}
    </div>
  );
};