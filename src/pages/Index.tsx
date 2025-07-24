import { useState } from "react";
import { Settings, Bot } from "lucide-react";
import { SearchBox } from "@/components/SearchBox";
import { SearchResults } from "@/components/SearchResults";
import { SearchLogo } from "@/components/SearchLogo";
import { SettingsPanel } from "@/components/SettingsPanel";
import { FinderAI } from "@/components/FinderAI";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { searchWithGoogle, mockSearch, SearchResult } from "@/services/searchService";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFinderAI, setShowFinderAI] = useState(false);
  const [isAIMinimized, setIsAIMinimized] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    try {
      // Try Google Search API first
      const googleResults = await searchWithGoogle(query);
      setResults(googleResults);
    } catch (error) {
      // Fallback to mock search if Google API fails
      console.warn("Google Search failed, using mock results:", error);
      const mockResults = mockSearch(query);
      setResults(mockResults);
      
      toast({
        title: "Using Demo Results",
        description: "Set up Google Search API in settings for real results.",
      });
    } finally {
      setIsLoading(false);
      setIsSearched(true);
    }
  };

  const handleNewSearch = () => {
    setIsSearched(false);
    setSearchQuery("");
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Settings Panel */}
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
      
      {/* FinderAI Assistant */}
      <FinderAI 
        isOpen={showFinderAI} 
        onClose={() => setShowFinderAI(false)}
        isMinimized={isAIMinimized}
        onToggleMinimize={() => setIsAIMinimized(!isAIMinimized)}
      />

      {/* Top Navigation */}
      <div className="absolute top-4 right-4 flex gap-2 z-30">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSettings(true)}
          className="border-search-border hover:bg-search-subtle"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFinderAI(true)}
          className="border-search-border hover:bg-search-subtle"
        >
          <Bot className="h-4 w-4 mr-2" />
          FinderAI
        </Button>
      </div>

      {!isSearched ? (
        // Homepage - centered search
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center mb-12">
            <SearchLogo size="large" className="justify-center mb-8" />
            <p className="text-search-muted text-lg mb-8">
              The fastest and most relevant way to find information
            </p>
            <p className="text-search-muted text-sm mb-4">
              Powered by Google Search API • Enhanced with FinderAI Assistant
            </p>
          </div>
          <SearchBox onSearch={handleSearch} />
          {isLoading && (
            <div className="mt-6 flex items-center gap-2 text-search-muted">
              <div className="w-4 h-4 border-2 border-search-primary border-t-transparent rounded-full animate-spin"></div>
              Searching...
            </div>
          )}
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
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-search-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-search-muted">Searching...</p>
              </div>
            ) : (
              <SearchResults 
                results={results} 
                query={searchQuery}
                onNewSearch={handleNewSearch}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
