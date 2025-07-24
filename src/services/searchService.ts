export interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  domain: string;
}

export const searchWithGoogle = async (query: string): Promise<SearchResult[]> => {
  const apiKey = localStorage.getItem("rankfinder_google_api_key");
  const searchEngineId = localStorage.getItem("rankfinder_search_engine_id");
  
  if (!apiKey || !searchEngineId) {
    throw new Error("Google API key and Search Engine ID are required");
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&num=10`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await response.json();
    
    if (!data.items) {
      return [];
    }

    return data.items.map((item: any, index: number) => ({
      id: (index + 1).toString(),
      title: item.title,
      url: item.link,
      description: item.snippet || "No description available",
      domain: new URL(item.link).hostname
    }));
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

// Fallback mock search for demo purposes
export const mockSearch = (query: string): SearchResult[] => {
  const mockResults = [
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

  return mockResults.filter(result =>
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.description.toLowerCase().includes(query.toLowerCase())
  );
};