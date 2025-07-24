import { Search } from "lucide-react";

interface SearchLogoProps {
  size?: "small" | "large";
  className?: string;
}

export const SearchLogo = ({ size = "large", className = "" }: SearchLogoProps) => {
  const isLarge = size === "large";
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${isLarge ? "p-3 bg-search-primary" : "p-2 bg-search-primary"} rounded-full`}>
        <Search className={`${isLarge ? "h-8 w-8" : "h-5 w-5"} text-white`} />
      </div>
      <span className={`font-light ${isLarge ? "text-4xl" : "text-xl"} text-search-secondary`}>
        RankFinder
      </span>
    </div>
  );
};