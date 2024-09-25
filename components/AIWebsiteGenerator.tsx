import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export function AIWebsiteGenerator({
  onDeploy,
  isDeploying,
}: {
  onDeploy: (domain: string, content: string) => Promise<void>;
  isDeploying: boolean;
}) {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [domain, setDomain] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError("");
    try {
      const response = await fetch("/api/generate-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error("Failed to generate website");
      const data = await response.json();
      setGeneratedCode(data.code);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to generate website. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="prompt" className="text-sm font-medium text-gray-400">
            Describe the website you want to generate
          </Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., A simple landing page for a coffee shop with a hero section, about us, and contact form..."
            className="mt-1 bg-[#0a0a0a] text-white border-gray-700"
            rows={4}
          />
        </div>
        <Button
          type="submit"
          disabled={isGenerating || !prompt}
          className="bg-blue-600 hover:bg-blue-500 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Website"
          )}
        </Button>
      </form>
      {error && <p className="text-red-400">{error}</p>}
      {generatedCode && (
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="domain"
              className="text-sm font-medium text-gray-400"
            >
              Domain
            </Label>
            <Input
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter your domain"
              className="mt-1 bg-gray-800 text-white border-gray-700"
            />
          </div>
          <div>
            <Label
              htmlFor="generatedCode"
              className="text-sm font-medium text-gray-400"
            >
              Generated Code
            </Label>
            <Textarea
              id="generatedCode"
              value={generatedCode}
              onChange={(e) => setGeneratedCode(e.target.value)}
              className="mt-1 bg-gray-800 text-white border-gray-700 font-mono text-sm"
              rows={10}
            />
          </div>
          <div>
            <Label
              htmlFor="preview"
              className="text-sm font-medium text-gray-400"
            >
              Preview
            </Label>
            <div
              className="mt-1 border border-gray-700 rounded-md overflow-hidden"
              style={{ height: "400px" }}
            >
              <iframe
                srcDoc={generatedCode}
                title="Generated Website Preview"
                className="w-full h-full"
              />
            </div>
          </div>
          <Button
            onClick={() => onDeploy(domain, generatedCode)}
            disabled={isDeploying || !domain || !generatedCode}
            className="bg-green-600 hover:bg-green-500 text-white"
          >
            {isDeploying ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Deploying...
              </>
            ) : (
              "Deploy AI-Generated Website"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
