"use client";

import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { Checkbox } from '@/Components/ui/checkbox';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import IndexingControls from '@/Components/IndexingControls';
import { Progress } from '@/Components/ui/progress';
import { Database, Clock, ArrowRight, CheckCircle, Info } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface DataCategory {
  id: string;
  label: string;
  description: string;
}

const IndexingConfig = () => {
  const router = useRouter();
  const [refreshInterval, setRefreshInterval] = useState('10min');
  const [indexingStatus, setIndexingStatus] = useState<'idle' | 'starting' | 'active'>('idle');
  const [progress, setProgress] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const dataCategories: DataCategory[] = [
    { 
      id: 'nftBids', 
      label: 'NFT Bids', 
      description: 'Index all NFT bid events on the network' 
    },
    { 
      id: 'nftPrices', 
      label: 'NFT Prices', 
      description: 'Track historical and current NFT price data' 
    },
    { 
      id: 'tokenBorrow', 
      label: 'Tokens Available to Borrow', 
      description: 'Monitor tokens available for borrowing across lending protocols' 
    },
    { 
      id: 'tokenPrices', 
      label: 'Token Prices on Various Platforms', 
      description: 'Track token prices across different exchanges and platforms' 
    },
  ];

  const handleCategoryToggle = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handleStartIndexing = () => {
    if (selectedCategories.length === 0) {
      toast.error("Please select at least one data category to index")
      return;
    }

    setIndexingStatus('starting');
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIndexingStatus('active');
          toast.info(`Now indexing ${selectedCategories.length} data categories with ${refreshInterval} refresh interval.`);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  const handleGotoDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar username="DevAlpha" />

      <main className="flex-1 pt-16">
        <div className="container px-4 py-6 md:py-10 mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">
              Indexing <span className="text-gradient">Configuration</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Select the blockchain data you want to index
            </p>
          </div>

          {/* Main Configuration Card */}
          <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="space-y-8">
              {/* Data Selection Section */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Database className="mr-2 h-5 w-5" />
                  Data Selection
                </h3>
                <div className="space-y-4">
                  {dataCategories.map((category) => (
                    <div key={category.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/40 transition-colors">
                      <Checkbox 
                        id={category.id} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryToggle(category.id)}
                      />
                      <div className="space-y-1">
                        <Label 
                          htmlFor={category.id} 
                          className="font-medium cursor-pointer"
                        >
                          {category.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Refresh Interval Selection */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Refresh Interval
                </h3>
                <Select 
                  value={refreshInterval} 
                  onValueChange={setRefreshInterval}
                >
                  <SelectTrigger className="w-full sm:w-[240px]">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5min">Every 5 minutes</SelectItem>
                    <SelectItem value="10min">Every 10 minutes</SelectItem>
                    <SelectItem value="30min">Every 30 minutes</SelectItem>
                    <SelectItem value="1hour">Every hour</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  How frequently the indexer will refresh data from the blockchain.
                </p>
              </div>

              {/* Status & Progress */}
              {indexingStatus === 'starting' && (
                <div className="space-y-2">
                  <p className="text-sm">Initializing indexers...</p>
                  <Progress value={progress} />
                </div>
              )}

              {indexingStatus === 'active' && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium">Indexing Active</h4>
                      <p className="text-sm mt-1">
                        Successfully indexing {selectedCategories.length} data categories with {refreshInterval} refresh interval.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                {indexingStatus === 'active' ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border">
                      <div className="h-3 w-3 rounded-full animate-pulse bg-green-500" />
                      <span className="text-sm font-medium">Indexing Active</span>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleGotoDashboard} variant="outline" className="gap-2">
                        View Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button 
                    onClick={handleStartIndexing} 
                    disabled={selectedCategories.length === 0 || indexingStatus === 'starting'}
                    className="w-full sm:w-auto"
                  >
                    {indexingStatus === 'starting' ? 'Starting...' : 'Start Indexing'}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Summary Card (when indexing is active) */}
          {indexingStatus === 'active' && (
            <div className="mt-6 glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg font-medium mb-4">Indexing Status</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Currently Indexing</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedCategories.map(id => {
                      const category = dataCategories.find(cat => cat.id === id);
                      return (
                        <div key={id} className="flex items-center gap-2 p-2 rounded bg-muted/20">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{category?.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Refresh Rate</h4>
                  <div className="flex items-center gap-2 p-2 rounded bg-muted/20">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      {refreshInterval === '5min' && 'Every 5 minutes'}
                      {refreshInterval === '10min' && 'Every 10 minutes'}
                      {refreshInterval === '30min' && 'Every 30 minutes'}
                      {refreshInterval === '1hour' && 'Every hour'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <IndexingControls initialStatus="active" />
              </div>
            </div>
          )}

          {/* Help Info */}
          <div className="mt-6 p-4 border border-muted rounded-lg flex items-start gap-3 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm">
                You can modify your indexing preferences at any time from the dashboard. 
                The first sync may take several minutes depending on the amount of historical data.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndexingConfig;
