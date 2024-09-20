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

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">
        Access Decentralized Content
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="p-4 col-span-2">
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Enter HTTP3 address or alias"
              value={http3Address}
              onChange={(e) => setHttp3Address(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleFetch} disabled={isFetching}>
              {isFetching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                "Fetch"
              )}
            </Button>
          </div>
          {fetchedContent && (
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Fetched Content:</h3>
              <div dangerouslySetInnerHTML={{ __html: fetchedContent }} />
            </div>
          )}
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Blockchain Network</h3>
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center">
              <Database className="w-16 h-16 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">
                Decentralized Storage
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
