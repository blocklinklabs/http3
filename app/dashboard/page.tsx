"use client";
import { useState, useEffect } from "react";
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
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import DeploymentVisual from "@/components/DeploymentVisual";
import { Label } from "@/components/ui/label";

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

  const dummyAnalytics = {
    totalVisits: 5000,
    uniqueVisitors: 3200,
    avgSessionDuration: "2m 34s",
    bounceRate: "45%",
    topPages: [
      { url: "/home", visits: 2000 },
      { url: "/about", visits: 1500 },
      { url: "/products", visits: 1000 },
    ],
    trafficSources: [
      { source: "Direct", percentage: 40 },
      { source: "Search", percentage: 30 },
      { source: "Social", percentage: 20 },
      { source: "Referral", percentage: 10 },
    ],
  };

  const dummySecurityEvents = [
    {
      id: 1,
      type: "DDoS Attempt",
      date: "2023-03-15 10:30",
      status: "Blocked",
      severity: "High",
    },
    {
      id: 2,
      type: "Unauthorized Access",
      date: "2023-03-14 15:45",
      status: "Prevented",
      severity: "Medium",
    },
    {
      id: 3,
      type: "SSL Certificate Renewal",
      date: "2023-03-13 09:00",
      status: "Completed",
      severity: "Low",
    },
    {
      id: 4,
      type: "Suspicious Traffic",
      date: "2023-03-12 22:15",
      status: "Investigating",
      severity: "Medium",
    },
  ];

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

  const [code, setCode] = useState(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bouncing Ball Game</title>
    <style>
        body { margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0; }
        #gameCanvas { border: 2px solid #333; border-radius: 10px; background-color: #fff; }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="600" height="200"></canvas>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        let ball = { x: 50, y: 100, radius: 20, dy: 0, jumpStrength: -10 };
        let obstacles = [];
        let score = 0;
        let gameOver = false;
        
        function drawBall() {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#4CAF50';
            ctx.fill();
            ctx.closePath();
        }
        
        function drawObstacles() {
            ctx.fillStyle = '#FF5722';
            obstacles.forEach(obs => {
                ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
            });
        }
        
        function jump() {
            if (ball.y === canvas.height - ball.radius) {
                ball.dy = ball.jumpStrength;
            }
        }
        
        function checkCollision(ball, obstacle) {
            return ball.x + ball.radius > obstacle.x &&
                   ball.x - ball.radius < obstacle.x + obstacle.width &&
                   ball.y + ball.radius > obstacle.y;
        }
        
        function updateGame() {
            if (gameOver) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ball.dy += 0.8; // gravity
            ball.y += ball.dy;
            
            if (ball.y + ball.radius > canvas.height) {
                ball.y = canvas.height - ball.radius;
                ball.dy = 0;
            }
            
            obstacles.forEach(obs => {
                obs.x -= 5;
                if (checkCollision(ball, obs)) {
                    gameOver = true;
                }
            });
            
            if (Math.random() < 0.02 && obstacles.length < 3) {
                obstacles.push({ x: canvas.width, y: canvas.height - 40, width: 20, height: 40 });
            }
            
            obstacles = obstacles.filter(obs => obs.x > -20);
            
            score++;
            
            drawBall();
            drawObstacles();
            
            ctx.fillStyle = '#333';
            ctx.font = '20px Arial';
            ctx.fillText('Score: ' + score, 20, 30);
            
            if (gameOver) {
                ctx.fillStyle = '#E53935';
                ctx.font = '40px Arial';
                ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
            } else {
                requestAnimationFrame(updateGame);
            }
        }
        
        canvas.addEventListener('click', () => {
            if (gameOver) {
                gameOver = false;
                ball = { x: 50, y: 100, radius: 20, dy: 0, jumpStrength: -10 };
                obstacles = [];
                score = 0;
                updateGame();
            } else {
                jump();
            }
        });
        
        updateGame();
    </script>
</body>
</html>
  `);
  const [githubUrl, setGithubUrl] = useState("");
  const [deployedUrl, setDeployedUrl] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [livePreview, setLivePreview] = useState(code);
  const [activeTab, setActiveTab] = useState("sites");

  useEffect(() => {
    // Update live preview when code changes
    setLivePreview(code);
  }, [code]);

  const handleDeploy = async () => {
    setIsDeploying(true);
    // Simulate deployment process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setDeployedUrl(
      `https://http3.io/${Math.random().toString(36).substring(7)}`
    );
    setIsDeploying(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4">
        <Navbar />
        <h1 className="text-4xl font-bold mb-8">Welcome to Your Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sites</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sites.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Traffic
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sites.reduce((acc, site) => acc + site.traffic, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Uptime
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(
                  sites.reduce((acc, site) => acc + site.uptime, 0) /
                  sites.length
                ).toFixed(2)}
                %
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Token Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dummyTokenEconomy.balance} HTTP3
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-5 rounded-xl bg-muted p-1">
            {["sites", "analytics", "security", "tokens", "deploy"].map(
              (tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`rounded-lg transition-all ${
                    activeTab === tab
                      ? "bg-background text-foreground shadow-sm"
                      : "hover:bg-muted-foreground/20"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              )
            )}
          </TabsList>

          <TabsContent value="sites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sites.map((site) => (
                <Card key={site.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        {site.name}
                      </span>
                      <span
                        className={`text-sm px-2 py-1 rounded ${
                          site.status === "Active"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {site.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {site.url}
                    </p>
                    <p className="mb-2 text-sm">
                      Chain: <span className="font-semibold">{site.chain}</span>
                    </p>
                    <p className="mb-2 text-sm">
                      Traffic:{" "}
                      <span className="font-semibold">{site.traffic}</span>
                    </p>
                    <p className="mb-2 text-sm">
                      Uptime:{" "}
                      <span className="font-semibold">{site.uptime}%</span>
                    </p>
                    <p className="mb-4 text-sm">
                      Last Deployed:{" "}
                      <span className="font-semibold">{site.lastDeployed}</span>
                    </p>
                    <Input
                      placeholder="New name"
                      onChange={(e) => handleRename(site.id, e.target.value)}
                      className="mb-2"
                    />
                    <Button className="w-full">Rename</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="mr-2 h-4 w-4" />
                    Site Analytics Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Total Visits</h3>
                      <p className="text-2xl font-bold">
                        {dummyAnalytics.totalVisits}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Unique Visitors</h3>
                      <p className="text-2xl font-bold">
                        {dummyAnalytics.uniqueVisitors}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Avg. Session Duration</h3>
                      <p className="text-2xl font-bold">
                        {dummyAnalytics.avgSessionDuration}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Bounce Rate</h3>
                      <p className="text-2xl font-bold">
                        {dummyAnalytics.bounceRate}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-4 w-4" />
                    Top Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {dummyAnalytics.topPages.map((page, index) => (
                      <li key={index} className="mb-2 flex justify-between">
                        <span>{page.url}</span>
                        <span className="font-semibold">
                          {page.visits} visits
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Traffic Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dummyAnalytics.trafficSources.map((source, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span>{source.source}</span>
                        <span>{source.percentage}%</span>
                      </div>
                      <Progress value={source.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Security Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {dummySecurityEvents.map((event) => (
                    <li key={event.id} className="mb-4 p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{event.type}</span>
                        <span
                          className={`text-sm px-2 py-1 rounded ${
                            event.severity === "High"
                              ? "bg-red-500"
                              : event.severity === "Medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        >
                          {event.severity}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Date: {event.date}
                      </p>
                      <p className="text-sm">
                        Status:{" "}
                        <span className="font-semibold">{event.status}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tokens">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-4 w-4" />
                    Token Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">HTTP3 Token Balance</h3>
                      <p className="text-2xl font-bold">
                        {dummyTokenEconomy.balance} HTTP3
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Staked Amount</h3>
                      <p className="text-2xl font-bold">
                        {dummyTokenEconomy.staked} HTTP3
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Rewards Earned</h3>
                      <p className="text-2xl font-bold">
                        {dummyTokenEconomy.rewards} HTTP3
                      </p>
                    </div>
                  </div>
                  <Button className="mt-4 w-full">Stake Tokens</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {dummyTokenEconomy.transactions.map((tx) => (
                      <li
                        key={tx.id}
                        className="mb-2 flex justify-between items-center"
                      >
                        <span>{tx.type}</span>
                        <span
                          className={`font-semibold ${
                            tx.amount > 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {tx.amount > 0 ? "+" : ""}
                          {tx.amount} HTTP3
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deploy">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Deploy a New Website</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="editor" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="editor">Code Editor</TabsTrigger>
                    <TabsTrigger value="github">GitHub Link</TabsTrigger>
                  </TabsList>
                  <TabsContent value="editor" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="code-editor" className="text-lg">
                          Code Editor
                        </Label>
                        <Textarea
                          id="code-editor"
                          placeholder="Enter your HTML/CSS/JavaScript code here"
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value);
                            setLivePreview(e.target.value);
                          }}
                          className="min-h-[400px] font-mono text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="live-preview" className="text-lg">
                          Live Preview
                        </Label>
                        <div className="border rounded-lg overflow-hidden h-[400px] bg-white">
                          <iframe
                            id="live-preview"
                            srcDoc={livePreview}
                            className="w-full h-full"
                            title="Live Preview"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="github">
                    <Input
                      placeholder="Enter GitHub repository URL"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="mb-4"
                    />
                  </TabsContent>
                </Tabs>
                <div className="mt-6">
                  <Button
                    onClick={handleDeploy}
                    disabled={isDeploying}
                    size="lg"
                  >
                    {isDeploying ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      "Deploy to HTTP3"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            {deployedUrl && <DeploymentVisual deployedUrl={deployedUrl} />}
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
