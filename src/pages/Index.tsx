import { useState } from "react";
import { SearchBox } from "@/components/SearchBox";
import { SearchResults } from "@/components/SearchResults";
import { SearchLogo } from "@/components/SearchLogo";

// Mock search results - in a real app, this would come from a search API
const mockSearchResults = [
  {
    id: "1",
    title: "React - A JavaScript library for building user interfaces",
    url: "https://reactjs.org",
    description: "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
    domain: "reactjs.org"
  },
  {
    id: "2", 
    title: "JavaScript | MDN - Mozilla Developer Network",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    description: "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages...",
    domain: "developer.mozilla.org"
  },
  {
    id: "3",
    title: "TypeScript: JavaScript With Syntax For Types",
    url: "https://www.typescriptlang.org",
    description: "TypeScript extends JavaScript by adding types. By understanding JavaScript, TypeScript saves you time catching errors and providing fixes before you run your code.",
    domain: "typescriptlang.org"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<typeof mockSearchResults>([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Simulate search - filter mock results based on query
    const filteredResults = mockSearchResults.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
    setIsSearched(true);
  };

  const handleNewSearch = () => {
    setIsSearched(false);
    setSearchQuery("");
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-white">
      {!isSearched ? (
        // Homepage - centered search
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center mb-12">
            <SearchLogo size="large" className="justify-center mb-8" />
            <p className="text-search-muted text-lg mb-8">
              The fastest and most relevant way to find information
            </p>
          </div>
          <SearchBox onSearch={handleSearch} />
        </div>
      ) : (
        // Results page - top-aligned search
        <div className="px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-6 mb-8">
              <SearchLogo size="small" />
              <div className="flex-1">
                <SearchBox 
                  onSearch={handleSearch} 
                  placeholder={searchQuery}
                />
              </div>
            </div>
            <SearchResults 
              results={results} 
              query={searchQuery}
              onNewSearch={handleNewSearch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
