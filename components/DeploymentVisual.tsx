import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface DeploymentVisualProps {
  deployedUrl: string;
}

export default function DeploymentVisual({
  deployedUrl,
}: DeploymentVisualProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleViewPreview = () => {
    setShowPreview(true);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(deployedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="text-center p-8 bg-secondary rounded-lg mt-4">
      <h2 className="text-2xl font-semibold mb-4">Deployment Status</h2>
      <div className="flex items-center justify-center mb-4">
        <p className="text-muted-foreground mr-2">
          Your content has been deployed successfully!
        </p>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={handleCopyUrl}
        >
          {copied ? (
            <Check className="h-4 w-4 mr-2" />
          ) : (
            <Copy className="h-4 w-4 mr-2" />
          )}
          {copied ? "Copied!" : "Copy URL"}
        </Button>
      </div>
      {!showPreview ? (
        <Button onClick={handleViewPreview}>View Deployed Site</Button>
      ) : (
        <div className="w-full aspect-video rounded-lg overflow-hidden border border-border">
          <iframe
            src={deployedUrl}
            className="w-full h-full"
            title="Deployed Site Preview"
          />
        </div>
      )}
    </section>
  );
}
