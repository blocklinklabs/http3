import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Mic } from "lucide-react";
import { indexWebsites, searchWebsites } from "@/utils/search-engine";

interface SearchResult {
  domain: string;
  url: string;
  content: string;
}

export function SearchEngineSP() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isIndexing, setIsIndexing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    handleIndexing();
  }, []);

  const handleIndexing = async () => {
    setIsIndexing(true);
    try {
      await indexWebsites();
      console.log("Indexing completed");
    } catch (error) {
      console.error("Indexing failed:", error);
    } finally {
      setIsIndexing(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const searchResults = await searchWebsites(query);
      setResults(searchResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSearch} className="relative mb-8">
        <Input
          type="text"
          placeholder="Search the decentralized web"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#0a0a0a] text-white border-gray-700 pl-4 pr-12 py-3 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button
          type="submit"
          disabled={isSearching}
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-transparent hover:bg-gray-800 rounded-full p-2"
        >
          <Search className="w-5 h-5 text-gray-400" />
        </Button>
        <Button
          type="button"
          className="absolute right-12 top-1/2 -translate-y-1/2 bg-transparent hover:bg-gray-800 rounded-full p-2"
        ></Button>
      </form>

      <div className="flex justify-center space-x-4 mb-8">
        <Button
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-gray-800 hover:bg-gray-700 text-white"
        >
          {isSearching ? "Searching..." : "Web3 Search"}
        </Button>
        <Button
          onClick={handleIndexing}
          disabled={isIndexing}
          className="bg-gray-800 hover:bg-gray-700 text-white"
        >
          {isIndexing ? "Indexing..." : "Re-index Websites"}
        </Button>
      </div>

      {results.length > 0 && (
        <Card className="bg-transparent border-gray-800">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg text-blue-400">
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {result.domain}
                    </a>
                  </h3>
                  <p className="text-sm text-green-500">{result.url}</p>
                  {/* <p className="text-sm text-gray-400">{result.content}</p> */}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
