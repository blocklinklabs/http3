"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Navbar />
        <h1 className="text-4xl font-bold mb-12 text-left bg-clip-text ">
          Documentation
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                Getting Started <ArrowRight className="ml-2 h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#create-account"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    Create an account
                  </Link>
                </li>
                <li>
                  <Link
                    href="#deploy-website"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    Deploy your first website
                  </Link>
                </li>
                <li>
                  <Link
                    href="#manage-deployments"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    Manage your deployments
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                Features <ArrowRight className="ml-2 h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-white">
                <li>Decentralized hosting on IPFS</li>
                <li>Automatic HTTPS with ENS domains</li>
                <li>Version control and rollbacks</li>
                <li>CI/CD integration</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                API Reference <ArrowRight className="ml-2 h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-white">
                Integrate HTTP3 into your workflow with our comprehensive API.
              </p>
              <Link
                href="/api-docs"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                View full API documentation
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                Troubleshooting <ArrowRight className="ml-2 h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#deployment-issues"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    Common deployment issues
                  </Link>
                </li>
                <li>
                  <Link
                    href="#performance-optimization"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    Performance optimization
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-16">
          <section
            id="create-account"
            className="bg-gray-800 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              Create an Account
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To get started with HTTP3, you'll need to create an account. Visit
              our homepage and click on the "Sign Up" button. Follow the prompts
              to set up your account using your email address or connect with
              your Web3 wallet.
            </p>
          </section>

          <section
            id="deploy-website"
            className="bg-gray-800 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              Deploy Your First Website
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Once you've created an account, you can deploy your first website
              by following these steps:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-300">
              <li>Log in to your HTTP3 dashboard</li>
              <li>Click on the "New Deployment" button</li>
              <li>
                Upload your website files or connect your GitHub repository
              </li>
              <li>Configure your deployment settings</li>
              <li>Click "Deploy" and wait for the process to complete</li>
            </ol>
          </section>

          <section
            id="manage-deployments"
            className="bg-gray-800 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              Manage Your Deployments
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              HTTP3 provides powerful tools to manage your deployments:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>View deployment history and rollback to previous versions</li>
              <li>Set up custom domains and SSL certificates</li>
              <li>Monitor performance and traffic statistics</li>
              <li>Configure environment variables and build settings</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
