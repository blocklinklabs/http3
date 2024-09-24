"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Calculator, Scale, LayoutGrid } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${query}`);
    // Implement actual search logic here
  };

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Search</h1>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search or enter web address"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </form>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <ToolCard
            icon={<Calculator className="w-8 h-8" />}
            title="Calculator"
          />
          <ToolCard
            icon={<Scale className="w-8 h-8" />}
            title="Unit Converter"
          />
          <ToolCard
            icon={<LayoutGrid className="w-8 h-8" />}
            title="Common Apps"
          />
        </div>
      </div>
    </div>
  );
}

function ToolCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center hover:bg-gray-700 transition duration-300 cursor-pointer">
      {icon}
      <h3 className="text-lg font-semibold mt-3">{title}</h3>
    </div>
  );
}
