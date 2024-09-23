import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Upload, Download } from "lucide-react";

// This is a mock function. In a real implementation, you'd use a P2P library like WebTorrent or IPFS.
const mockShareFile = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`mock-hash-${file.name}`);
    }, 2000);
  });
};

// This is also a mock function
const mockRetrieveFile = async (hash: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://mock-cdn.com/${hash}`);
    }, 2000);
  });
};

export function DecentralizedCDN() {
  const [file, setFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string>("");
  const [retrieveHash, setRetrieveHash] = useState<string>("");
  const [retrievedUrl, setRetrievedUrl] = useState<string>("");
  const [isSharing, setIsSharing] = useState(false);
  const [isRetrieving, setIsRetrieving] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleShare = async () => {
    if (!file) return;
    setIsSharing(true);
    try {
      const hash = await mockShareFile(file);
      setFileHash(hash);
    } catch (error) {
      console.error("Error sharing file:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleRetrieve = async () => {
    if (!retrieveHash) return;
    setIsRetrieving(true);
    try {
      const url = await mockRetrieveFile(retrieveHash);
      setRetrievedUrl(url);
    } catch (error) {
      console.error("Error retrieving file:", error);
    } finally {
      setIsRetrieving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-white">Share File</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label
              htmlFor="file-upload"
              className="text-sm font-medium text-gray-400"
            >
              Select a file to share
            </Label>
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="mt-1 bg-gray-800 text-white border-gray-700"
            />
          </div>
          <Button
            onClick={handleShare}
            disabled={!file || isSharing}
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            {isSharing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sharing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Share File
              </>
            )}
          </Button>
          {fileHash && (
            <div className="mt-4">
              <Label className="text-sm font-medium text-gray-400">
                File Hash:
              </Label>
              <p className="mt-1 text-white">{fileHash}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-white">Retrieve File</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label
              htmlFor="retrieve-hash"
              className="text-sm font-medium text-gray-400"
            >
              Enter file hash to retrieve
            </Label>
            <Input
              id="retrieve-hash"
              value={retrieveHash}
              onChange={(e) => setRetrieveHash(e.target.value)}
              placeholder="Enter file hash"
              className="mt-1 bg-gray-800 text-white border-gray-700"
            />
          </div>
          <Button
            onClick={handleRetrieve}
            disabled={!retrieveHash || isRetrieving}
            className="bg-green-600 hover:bg-green-500 text-white"
          >
            {isRetrieving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Retrieving...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Retrieve File
              </>
            )}
          </Button>
          {retrievedUrl && (
            <div className="mt-4">
              <Label className="text-sm font-medium text-gray-400">
                Retrieved File URL:
              </Label>
              <p className="mt-1 text-white break-all">{retrievedUrl}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
