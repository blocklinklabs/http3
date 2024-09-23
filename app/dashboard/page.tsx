"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Globe,
  Shield,
  Zap,
  Activity,
  DollarSign,
  Users,
  Clock,
  Loader2,
  Layout,
  Rocket,
  GitBranch,
  Cpu,
  Network,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import DeploymentVisual from "@/components/DeploymentVisual";
import { Label } from "@/components/ui/label";
import {
  getUserIdByEmail,
  createWebpageWithName,
  updateWebpageContent,
  initializeClients,
  getUserWebpages,
  getWebpageContent,
} from "@/utils/db/actions";
import { usePrivy } from "@privy-io/react-auth";
import CICDManager from "@/components/CICDManager";
import { email } from "@web3-storage/w3up-client/types";
import { useRouter } from "next/navigation";
import { AIWebsiteGenerator } from "@/components/AIWebsiteGenerator";
import { DecentralizedCDN } from "@/components/DecentralizedCDN";

// Add this type definition
type Webpage = {
  webpages: {
    id: number;
    domain: string;
    cid: string;
    name: string | null;
  };
  deployments: {
    id: number;
    deploymentUrl: string;
    deployedAt: Date | null;
    transactionHash: string;
  } | null;
};

const truncateUrl = (url: string, maxLength: number = 30) => {
  if (!url) return "";
  if (url.length <= maxLength) return url;
  const start = url.substring(0, maxLength / 2 - 2);
  const end = url.substring(url.length - maxLength / 2 + 2);
  return `${start}...${end}`;
};

export default function Dashboard() {
  const [sites, setSites] = useState([
    {
      id: 1,
      name: "My First Site",
      url: "https://http3.io/abc123",
      chain: "Ethereum",
      status: "Active",
      traffic: 1500,
      uptime: 99.9,
      lastDeployed: "2023-03-15 14:30",
    },
    {
      id: 2,
      name: "Blog",
      url: "https://http3.io/def456",
      chain: "Polygon",
      status: "Active",
      traffic: 3000,
      uptime: 100,
      lastDeployed: "2023-03-14 09:15",
    },
    {
      id: 3,
      name: "DApp Frontend",
      url: "https://http3.io/ghi789",
      chain: "Solana",
      status: "Maintenance",
      traffic: 500,
      uptime: 98.5,
      lastDeployed: "2023-03-13 18:45",
    },
  ]);

  const handleRename = (id: number, newName: string) => {
    setSites(
      sites.map((site) => (site.id === id ? { ...site, name: newName } : site))
    );
  };

  const dummyTokenEconomy = {
    balance: 1000,
    staked: 500,
    rewards: 50,
    transactions: [
      { id: 1, type: "Stake", amount: 100, date: "2023-03-15 08:30" },
      { id: 2, type: "Reward", amount: 10, date: "2023-03-14 00:00" },
      { id: 3, type: "Unstake", amount: -50, date: "2023-03-13 14:45" },
    ],
  };

  const [code, setCode] = useState(``);
  const [githubUrl, setGithubUrl] = useState("");
  const [deployedUrl, setDeployedUrl] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [livePreview, setLivePreview] = useState(code);
  const [activeTab, setActiveTab] = useState("sites");
  const [domain, setDomain] = useState("");
  const [content, setContent] = useState("");
  const [deploymentError, setDeploymentError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const { user, authenticated } = usePrivy();
  const [userId, setUserId] = useState<number | null>(null);
  const [w3name, setW3name] = useState<string | null>(null);
  const [userWebpages, setUserWebpages] = useState<Webpage[]>([]);
  const [selectedWebpage, setSelectedWebpage] = useState<Webpage | null>(null);
  const router = useRouter();

  console.log(userId);

  useEffect(() => {
    // Update live preview when code changes
    setLivePreview(code);
  }, [code]);

  useEffect(() => {
    initializeClients()
      .then(() => setIsInitialized(true))
      .catch((error) => {
        console.error("Failed to initialize clients:", error);
        setDeploymentError("Failed to initialize. Please try again later.");
      });
  }, []);

  useEffect(() => {
    async function fetchUserId() {
      if (authenticated && user?.email?.address) {
        const fetchedUserId = await getUserIdByEmail(user?.email?.address);
        console.log(fetchUserId);
        console.log(user.email.address);
        setUserId(fetchedUserId);
      }
    }

    fetchUserId();
  }, [authenticated, user]);

  console.log(userId);
  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentError("");
    try {
      if (!isInitialized) {
        throw new Error("Clients not initialized");
      }
      if (userId === null) {
        throw new Error("User not authenticated or ID not found");
      }

      const { webpage, txHash, cid, deploymentUrl, name, w3nameUrl } =
        await createWebpageWithName(userId, domain, content);

      setDeployedUrl(w3nameUrl || deploymentUrl);
      setW3name(name);
      console.log(
        `Deployed successfully. Transaction hash: ${txHash}, CID: ${cid}, URL: ${
          w3nameUrl || deploymentUrl
        }, W3name: ${name}`
      );

      // Refresh the user's webpages
      const updatedWebpages = await getUserWebpages(userId);
      setUserWebpages(updatedWebpages as Webpage[]);
    } catch (error) {
      console.error("Deployment failed:", error);
      setDeploymentError("Deployment failed. Please try again.");
    } finally {
      setIsDeploying(false);
    }
  };

  const handleUpdate = async () => {
    setIsDeploying(true);
    setDeploymentError("");
    try {
      if (!isInitialized || userId === null || !selectedWebpage) {
        throw new Error(
          "Cannot update: missing initialization, user ID, or selected webpage"
        );
      }

      const { txHash, cid, deploymentUrl, w3nameUrl } =
        await updateWebpageContent(
          userId,
          selectedWebpage.webpages.id,
          content
        );

      setDeployedUrl(w3nameUrl || deploymentUrl);
      console.log(
        `Updated successfully. Transaction hash: ${txHash}, CID: ${cid}, URL: ${
          w3nameUrl || deploymentUrl
        }`
      );
      setLivePreview(content);

      // Update the selected webpage in the state
      setSelectedWebpage((prev) => {
        if (!prev) return null;
        return {
          webpages: {
            ...prev.webpages,
            cid,
          },
          deployments: {
            id: prev.deployments?.id ?? 0,
            deploymentUrl,
            transactionHash: txHash,
            deployedAt: new Date(),
          },
        };
      });

      // Refresh the user's webpages
      const updatedWebpages = await getUserWebpages(userId);
      setUserWebpages(updatedWebpages as Webpage[]);
    } catch (error: any) {
      console.error("Update failed:", error);
      setDeploymentError(`Update failed: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  useEffect(() => {
    async function fetchUserWebpages() {
      if (userId) {
        const webpages = await getUserWebpages(userId);
        console.log("=======web pages", webpages);
        setUserWebpages(webpages as Webpage[]);
      }
    }
    fetchUserWebpages();
  }, [userId]);

  const handleEdit = async (webpage: Webpage) => {
    setSelectedWebpage(webpage);
    setDomain(webpage.webpages.domain);
    const webpageContent = await getWebpageContent(webpage.webpages.id);
    setContent(webpageContent);
    setW3name(webpage.webpages.name);
    setActiveTab("deploy");
  };

  const handleUrlClick = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const handleAIWebsiteDeploy = async (domain: string, content: string) => {
    setIsDeploying(true);
    setDeploymentError("");
    try {
      if (!isInitialized || userId === null) {
        throw new Error("Cannot deploy: missing initialization or user ID");
      }

      const { webpage, txHash, cid, deploymentUrl, name, w3nameUrl } =
        await createWebpageWithName(userId, domain, content);

      setDeployedUrl(w3nameUrl || deploymentUrl);
      setW3name(name);
      console.log(
        `Deployed AI-generated website successfully. Transaction hash: ${txHash}, CID: ${cid}, URL: ${
          w3nameUrl || deploymentUrl
        }, W3name: ${name}`
      );

      // Refresh the user's webpages
      const updatedWebpages = await getUserWebpages(userId);
      setUserWebpages(updatedWebpages as Webpage[]);
    } catch (error: any) {
      console.error("AI website deployment failed:", error);
      setDeploymentError(`AI website deployment failed: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  const tabsWithIcons = [
    { name: "sites", icon: Layout },
    { name: "deploy", icon: Rocket },
    { name: "CI-CD", icon: GitBranch },
    { name: "tokens", icon: Zap },
    { name: "AI Website", icon: Cpu },
    { name: "Decentralized CDN", icon: Network },
  ];

  return (
    <div className="min-h-screen mx-10 bg-black text-gray-300">
      <div className="container mx-auto px-4">
        <Navbar />
        <h1 className="text-4xl font-bold mb-8 text-white">
          Welcome to Your Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Websites
              </CardTitle>
              <Globe className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {userWebpages.length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Latest Deployment
              </CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {userWebpages.length > 0
                  ? new Date(
                      Math.max(
                        ...userWebpages
                          .filter((w) => w.deployments?.deployedAt)
                          .map((w) => w.deployments!.deployedAt!.getTime())
                      )
                    ).toLocaleDateString()
                  : "N/A"}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Deployments
              </CardTitle>
              <Activity className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {userWebpages.filter((w) => w.deployments).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          defaultValue="sites"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-6 rounded-xl bg-gray-900 p-1">
            {tabsWithIcons.map((tab) => (
              <TabsTrigger
                key={tab.name}
                value={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`rounded-lg transition-all ${
                  activeTab === tab.name
                    ? "bg-gray-800 text-white font-bold shadow-lg"
                    : "text-gray-400 hover:bg-gray-800/50"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="sites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userWebpages.map((webpage) => (
                <Card
                  key={webpage.webpages.id}
                  className="bg-gray-900 border-gray-800"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-white">
                      <span className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        {webpage.webpages.domain}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="mb-2 text-sm text-blue-400 cursor-pointer hover:underline overflow-hidden text-ellipsis"
                      onClick={() =>
                        handleUrlClick(
                          webpage.webpages.name
                            ? `https://dweb.link/ipfs/${webpage.webpages.cid}`
                            : webpage.deployments?.deploymentUrl || ""
                        )
                      }
                      title={
                        webpage.webpages.name
                          ? `https://dweb.link/ipfs/${webpage.webpages.cid}`
                          : webpage.deployments?.deploymentUrl
                      }
                    >
                      {truncateUrl(
                        webpage.webpages.name
                          ? `https://dweb.link/ipfs/${webpage.webpages.cid}`
                          : webpage.deployments?.deploymentUrl || ""
                      )}
                    </p>
                    <p className="mb-2 text-sm text-gray-500">
                      Deployed:{" "}
                      {webpage.deployments?.deployedAt?.toLocaleString()}
                    </p>
                    <p className="mb-2 text-sm overflow-hidden text-ellipsis text-gray-500">
                      TX: {webpage.deployments?.transactionHash.slice(0, 10)}...
                    </p>
                    <Button
                      onClick={() => handleEdit(webpage)}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="deploy">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  {selectedWebpage ? "Edit Website" : "Deploy a New Website"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="domain" className="text-lg text-gray-400">
                      Domain
                    </Label>
                    <Input
                      id="domain"
                      placeholder="Enter your domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="mt-1 bg-gray-800 text-white border-gray-700"
                      disabled={!!selectedWebpage}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content" className="text-lg text-gray-400">
                      Content
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Enter your HTML content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="mt-1 min-h-[200px] font-mono text-sm bg-gray-800 text-white border-gray-700"
                    />
                  </div>
                  <Button
                    onClick={selectedWebpage ? handleUpdate : handleDeploy}
                    disabled={
                      isDeploying ||
                      !domain ||
                      !content ||
                      !isInitialized ||
                      userId === null
                    }
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    {isDeploying ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {selectedWebpage ? "Updating..." : "Deploying..."}
                      </>
                    ) : selectedWebpage ? (
                      "Update Website"
                    ) : (
                      "Deploy to HTTP3"
                    )}
                  </Button>
                  {deploymentError && (
                    <p className="text-red-400 mt-2">{deploymentError}</p>
                  )}
                </div>
              </CardContent>
            </Card>
            {content && (
              <Card className="mt-4 bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border border-gray-800 p-4 rounded-lg">
                    <iframe
                      srcDoc={content}
                      style={{ width: "100%", height: "400px", border: "none" }}
                      title="Website Preview"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            {deployedUrl && <DeploymentVisual deployedUrl={deployedUrl} />}
          </TabsContent>

          <TabsContent value="CI-DC">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userWebpages.map((webpage) => (
                <Card
                  key={webpage.webpages.id}
                  className="bg-gray-900 border-gray-800"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-white">
                      <span className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        {webpage.webpages.domain}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="mb-2 text-sm text-blue-400 cursor-pointer hover:underline overflow-hidden text-ellipsis"
                      onClick={() =>
                        handleUrlClick(
                          webpage.webpages.name
                            ? `https://dweb.link/ipfs/${webpage.webpages.cid}`
                            : webpage.deployments?.deploymentUrl || ""
                        )
                      }
                      title={
                        webpage.webpages.name
                          ? `https://dweb.link/ipfs/${webpage.webpages.cid}`
                          : webpage.deployments?.deploymentUrl
                      }
                    >
                      {truncateUrl(
                        webpage.webpages.name
                          ? `https://dweb.link/ipfs/${webpage.webpages.cid}`
                          : webpage.deployments?.deploymentUrl || ""
                      )}
                    </p>
                    <p className="mb-2 text-sm text-gray-500">
                      Deployed:{" "}
                      {webpage.deployments?.deployedAt?.toLocaleString()}
                    </p>
                    <p className="mb-2 text-sm overflow-hidden text-ellipsis text-gray-500">
                      TX: {webpage.deployments?.transactionHash.slice(0, 10)}...
                    </p>
                    <Button
                      onClick={() => handleEdit(webpage)}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="AI Website">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  AI Website Generator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AIWebsiteGenerator
                  onDeploy={handleAIWebsiteDeploy}
                  isDeploying={isDeploying}
                />
              </CardContent>
            </Card>
            {deploymentError && (
              <p className="text-red-400 mt-2">{deploymentError}</p>
            )}
            {deployedUrl && <DeploymentVisual deployedUrl={deployedUrl} />}
          </TabsContent>

          <TabsContent value="Decentralized CDN">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  Decentralized Content Delivery Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DecentralizedCDN />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white border-gray-700"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
