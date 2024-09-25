import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Globe } from "lucide-react";
import { indexWebsites, searchWebsites } from "@/utils/search-engine";

interface SearchResult {
  domain: string;
  url: string;
  content: string;
}

export function SearchEngine() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isIndexing, setIsIndexing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Index websites when the component mounts
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

  const handleSearch = async () => {
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
    <div className="space-y-6">
      <Card className="bg-[#0a0a0a] border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            Decentralized Search Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter your search query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow bg-[#0a0a0a] text-white border-gray-700"
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-blue-600 hover:bg-blue-500"
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
          <Button
            onClick={handleIndexing}
            disabled={isIndexing}
            className="mt-4 bg-green-600 hover:bg-green-500"
          >
            {isIndexing ? "Indexing..." : "Re-index Websites"}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl text-white">Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="border-b border-gray-800 pb-4 last:border-b-0"
                >
                  <h3 className="text-lg font-semibold text-blue-400">
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {result.domain}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-400">{result.url}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
