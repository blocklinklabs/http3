import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Database } from "lucide-react";

export default function UserAccess() {
  const [http3Address, setHttp3Address] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedContent, setFetchedContent] = useState<string | null>(null);

  const handleFetch = async () => {
    setIsFetching(true);
    // Simulate fetching process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFetchedContent(
      `<h1>Fetched content from ${http3Address}</h1><p>This is a sample content.</p>`
    );
    setIsFetching(false);
  };

  return <section className="mb-12"></section>;
}
