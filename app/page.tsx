"use client";
import Image from "next/image";
import Link from "next/link";
import DeveloperTools from "@/components/DeveloperTools";
import UserAccess from "@/components/UserAccess";
import {
  ArrowRight,
  Code,
  Globe,
  Zap,
  Menu,
  Shield,
  BarChart,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { storeWebpageOnChain } from "@/utils/db/actions";
import { createWebpage } from "@/utils/db/actions";

export default function Home() {
  const features = [
    {
      icon: Globe,
      title: "Multi-Chain Deployment",
      description:
        "Deploy your website across multiple blockchain networks for maximum decentralization.",
    },
    {
      icon: Zap,
      title: "Instant Preview & CI/CD",
      description:
        "Automatic deployments from GitHub with instant preview links and version control.",
    },
    {
      icon: Code,
      title: "Smart Contract Integration",
      description:
        "Seamlessly integrate your website with blockchain functionality and decentralized apps.",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description:
        "Built-in DDoS protection, SSL management, and blockchain-based content verification.",
    },
    {
      icon: BarChart,
      title: "Analytics & Monitoring",
      description:
        "Real-time analytics dashboard and uptime monitoring for your decentralized websites.",
    },
    {
      icon: Coins,
      title: "Token Economy",
      description:
        "Participate in the HTTP3 token economy for hosting, accessing, and governing the platform.",
    },
  ];

  const [domain, setDomain] = useState("");
  const [content, setContent] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState("");

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      // Call the createWebpage function
      const { txHash, cid } = await createWebpage("4ffdsfdf", domain, content); // Assuming userId 1 for now

      // Set the deployed URL
      setDeployedUrl(`https://http3.io/${domain}`);

      console.log(
        `Deployed successfully. Transaction hash: ${txHash}, CID: ${cid}`
      );
    } catch (error) {
      console.error("Deployment failed:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-foreground">
        <nav className="flex justify-between items-center mb-12">
          <Link href="/" className="flex items-center">
            <Image
              src="/svg/lock-square-rounded.svg"
              alt="HTTP3 logo"
              width={40}
              height={40}
              priority
            />
            <span className="ml-2 text-xl font-bold">HTTP3</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-foreground hover:text-primary"
            >
              Dashboard
            </Link>
            <Link href="/docs" className="text-foreground hover:text-primary">
              Docs
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/help">Help & Support</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
          </div>
        </nav>

        <header className="mb-12 text-center">
          <Image
            className="mx-auto text-white mb-4"
            src="/svg/lock-square-rounded.svg"
            alt="HTTP3 logo"
            width={70}
            height={38}
            priority
          />
          <h1 className="text-5xl font-bold mb-4">
            The Future of Web3 Hosting on{" "}
            <span className="text-primary">Smart Contracts</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Deploy, manage, and scale your decentralized websites with HTTP3.
            Powered by blockchain technology for unparalleled security and
            performance.
          </p>
          <Button size="lg" className="mr-4">
            Start Deploying <ArrowRight className="ml-2" />
          </Button>
          <Button size="lg" variant="outline">
            Explore Features
          </Button>
        </header>

        <main className="max-w-6xl mx-auto">
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-semibold mb-8">
              Revolutionary Web3 Hosting Platform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-secondary p-6 rounded-lg">
                  <feature.icon className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
          <DeveloperTools />
          <UserAccess />

          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Deploy Your Website
            </h2>
            <div className="max-w-2xl mx-auto space-y-4">
              <Input
                placeholder="Enter domain (e.g., mysite.http3)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <Textarea
                placeholder="Enter your HTML content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
              />
              <Button
                onClick={handleDeploy}
                disabled={isDeploying || !domain || !content}
                className="w-full"
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  "Deploy to HTTP3"
                )}
              </Button>
              {deployedUrl && (
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                  <p className="text-center">
                    Your website has been deployed! Access it at:{" "}
                    <a
                      href={deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {deployedUrl}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* New sections can be added here for Marketplace, Governance, etc. */}
        </main>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 HTTP3. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}
