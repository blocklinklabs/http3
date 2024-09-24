import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ExampleWebsites() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            Example Websites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExampleCard
              title="Calculator"
              description="A simple calculator built with HTML, CSS, and JavaScript."
              url="https://bafkreicxjg7dxqftonwmfvrokym6q5isbs2i35spht6hy2pt37jfuvp2v4.ipfs.dweb.link/"
            />
            <ExampleCard
              title="Unit Converter"
              description="A basic unit converter for length, weight, and volume."
              url="https://bafkreif2zw75vkfhxgap2itcliamfc3iz73xczzper4iylagg7xuijyk2m.ipfs.dweb.link"
            />
            <ExampleCard
              title="Currency Converter"
              description="A currency converter that fetches real-time exchange rates."
              url="https://bafkreighge4wwedrf7tssbmctbkqcxsh6z64lha7ximkkq6lreqxzsg7fq.ipfs.dweb.link/"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExampleCard({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full"
        >
          <Button className="w-full bg-blue-600 hover:bg-blue-500">
            View Example
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}
