import React from "react";
import { Home, Settings, HelpCircle, Code, FileText } from "lucide-react";
import Link from "next/link";

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-800">
      <div className="flex items-center justify-center h-14 border-b border-gray-800">
        <span className="text-lg font-semibold text-white">HTTP3</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-1">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded"
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="/help"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded"
            >
              <HelpCircle className="mr-3 h-5 w-5" />
              Help
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/ai-website-generator"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded"
            >
              <Code className="mr-3 h-5 w-5" />
              AI Website Generator
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800">{children}</div>
    </div>
  );
}
