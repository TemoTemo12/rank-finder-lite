import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBox = ({ onSearch, placeholder = "Search the web", className = "" }: SearchBoxProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-2xl ${className}`}>
      <div className="relative flex items-center border border-search-border rounded-full overflow-hidden bg-white hover:shadow-md transition-shadow duration-200 focus-within:shadow-md">
        <Search className="absolute left-4 h-5 w-5 text-search-muted" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-20 py-3 text-lg border-none bg-transparent focus:outline-none focus:ring-0 placeholder:text-search-muted"
        />
        <Button
          type="submit"
          disabled={!query.trim()}
          className="absolute right-1 bg-search-primary hover:bg-search-primary-hover text-white px-6 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </Button>
      </div>
    </form>
  );
};