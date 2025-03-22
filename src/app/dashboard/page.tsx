"use client";

import { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";
import DashboardCard from "@/Components/DashboardCard";
import SyncGraph from "@/Components/SyncGraph";
import { Button } from "@/Components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
  Database,
  Settings,
  AlertTriangle,
  Clock,
  Package,
  ArrowUpRight,
  LayoutDashboard,
  Terminal,
  Waves,
  FileClock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import IndexingControls from "@/Components/IndexingControls";

const Dashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalIndexed: "0",
    pendingTasks: "0",
    errorCount: "0",
    syncRate: "0",
  });

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setStats({
        totalIndexed: "5,892,341",
        pendingTasks: "247",
        errorCount: "12",
        syncRate: "98.3",
      });
      setLoading(false);
    }, 1500);
  }, []);

  // Mock data for recent logs
  const recentLogs = [
    {
      id: 1,
      type: "info",
      message: "Indexing cycle completed",
      time: "5 min ago",
    },
    {
      id: 2,
      type: "error",
      message: "Failed to connect to database",
      time: "22 min ago",
    },
    {
      id: 3,
      type: "warning",
      message: "Slow performance detected",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "info",
      message: "New block indexed: 128,421,394",
      time: "2 hours ago",
    },
    {
      id: 5,
      type: "info",
      message: "Webhook configured for new transactions",
      time: "5 hours ago",
    },
  ];

  const getLogIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Terminal className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar username="DevAlpha" />

      <main className="flex-1 pt-16">
        <div className="container px-4 py-6 md:py-10 mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, <span className="text-gradient">DevAlpha</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              {"Here's what's happening with your indexing service today"}
            </p>
          </div>

          <div
            className="mb-6 animate-fade-in glass-card p-6 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4"
            style={{ animationDelay: "50ms" }}
          >
            <div>
              <h3 className="text-lg font-medium mb-1">
                Indexing Control Panel
              </h3>
              <p className="text-sm text-muted-foreground">
                Start or stop blockchain data indexing
              </p>
            </div>
            <IndexingControls initialStatus="stopped" />
          </div>

          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                <span>Logs</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Status Cards */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in"
                style={{ animationDelay: "100ms" }}
              >
                <DashboardCard
                  title="Total Indexed Data"
                  value={loading ? "Loading..." : stats.totalIndexed}
                  icon={<Package className="h-4 w-4" />}
                  variant="primary"
                  trend={{ value: 12.5, isPositive: true }}
                />
                <DashboardCard
                  title="Pending Tasks"
                  value={loading ? "Loading..." : stats.pendingTasks}
                  icon={<Clock className="h-4 w-4" />}
                  variant="warning"
                  trend={{ value: 3.2, isPositive: false }}
                />
                <DashboardCard
                  title="Error Count"
                  value={loading ? "Loading..." : stats.errorCount}
                  icon={<AlertTriangle className="h-4 w-4" />}
                  variant="error"
                  trend={{ value: 2.1, isPositive: true }}
                />
                <DashboardCard
                  title="Sync Rate"
                  value={loading ? "Loading..." : stats.syncRate}
                  metric="%"
                  icon={<ArrowUpRight className="h-4 w-4" />}
                  variant="success"
                  trend={{ value: 0.8, isPositive: true }}
                />
              </div>

              {/* Sync Progress Graph */}
              <div
                className="animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                <SyncGraph />
              </div>

              {/* Quick Actions */}
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in"
                style={{ animationDelay: "300ms" }}
              >
                <div className="md:col-span-1 glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <Database className="mr-2 h-4 w-4" /> Configure Database
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <Settings className="mr-2 h-4 w-4" /> Indexing Settings
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <FileClock className="mr-2 h-4 w-4" /> View All Logs
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-2 glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentLogs.slice(0, 4).map((log) => (
                      <div
                        key={log.id}
                        className="flex items-start p-3 rounded-lg transition-colors hover:bg-muted/50"
                      >
                        <div className="mr-3 mt-0.5">
                          {getLogIcon(log.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{log.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {log.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="space-y-6">
              <div className="glass-card p-6 rounded-xl animate-fade-in">
                <h3 className="text-lg font-medium mb-4">System Logs</h3>
                <div className="space-y-2">
                  {recentLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`flex items-start p-3 rounded-lg ${
                        log.type === "error"
                          ? "bg-red-500/10"
                          : log.type === "warning"
                          ? "bg-yellow-500/10"
                          : "bg-muted/30"
                      }`}
                    >
                      <div className="mr-3 mt-0.5">{getLogIcon(log.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{log.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    View All Logs
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="glass-card p-6 rounded-xl animate-fade-in">
                <h3 className="text-lg font-medium mb-6">Indexing Settings</h3>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">
                      Database Configuration
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Host</label>
                        <input
                          type="text"
                          placeholder="db.example.com"
                          className="w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Port</label>
                        <input
                          type="text"
                          placeholder="5432"
                          className="w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Database Name
                        </label>
                        <input
                          type="text"
                          placeholder="blockchain_data"
                          className="w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Username</label>
                        <input
                          type="text"
                          placeholder="db_user"
                          className="w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-md font-medium">Indexing Options</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Sync Frequency (minutes)
                        </label>
                        <input
                          type="number"
                          placeholder="5"
                          className="w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Max Transactions Per Batch
                        </label>
                        <input
                          type="number"
                          placeholder="1000"
                          className="w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
