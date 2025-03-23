"use client";

import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Progress } from '@/Components/ui/progress';
import { AlertTriangle, Server, Database, LockKeyhole, Key, HelpCircle } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/Components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Alert, AlertTitle, AlertDescription } from '@/Components/ui/alert';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/Components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { formSchema } from '@/lib/zod/schemas/schema';

const Page = () => {
  const router = useRouter();
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [connectionError, setConnectionError] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      host: 'https://',
      port: '5432',
      dbName: '',
      username: '',
      password: '',
    },
  });

  const simulateConnection = () => {
    setConnecting(true);
    setProgress(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 300);

    // Simulate connection attempt (success or failure)
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      const success = Math.random() > 0.3;
      
      if (success) {
        setConnectionStatus('success');
        toast.success("Database connected! Proceed to select your indexing preferences.");
      } else {
        setConnectionStatus('error');
        setConnectionError('Unable to connect to database. Please check your credentials.');
        toast.error("Unable to connect to database. Please check your credentials");
      }
      
      setConnecting(false);
    }, 3000);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    simulateConnection();
  };

  const handleProceed = () => {
    router.push('/indexing');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar username="DevAlpha" />

      <main className="flex-1 pt-16">
        <div className="container px-4 py-6 md:py-10 mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">
              Database <span className="text-gradient">Configuration</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Connect your database to start indexing blockchain data
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-card p-6 rounded-xl animate-fade-in" style={{ animationDelay: '100ms' }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  {/* Host */}
                  <FormField
                    control={form.control}
                    name="host"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="flex items-center">
                            <Server className="h-4 w-4 mr-2" />
                            HTTPS Host
                          </FormLabel>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-80">
                                  Enter the host URL of your database. For security reasons, 
                                  only HTTPS connections are allowed.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="https://db.example.com" 
                            disabled={connecting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Port */}
                  <FormField
                    control={form.control}
                    name="port"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="flex items-center">
                            <Database className="h-4 w-4 mr-2" />
                            Port Number
                          </FormLabel>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  The default PostgreSQL port is 5432.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="5432" 
                            disabled={connecting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Database Name */}
                  <FormField
                    control={form.control}
                    name="dbName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="flex items-center">
                            <Database className="h-4 w-4 mr-2" />
                            Database Name
                          </FormLabel>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  The name of your PostgreSQL database.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="blockchain_data" 
                            disabled={connecting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Username */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="flex items-center">
                            <Key className="h-4 w-4 mr-2" />
                            Username
                          </FormLabel>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Your database username.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="db_user" 
                            disabled={connecting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="flex items-center">
                            <LockKeyhole className="h-4 w-4 mr-2" />
                            Password
                          </FormLabel>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Your database password. This will be securely stored.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="password" 
                            placeholder="••••••••" 
                            disabled={connecting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Progress indicator */}
                {connecting && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Attempting to connect...</p>
                    <Progress value={progress} />
                  </div>
                )}

                {/* Connection status */}
                {connectionStatus === 'error' && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Connection Failed</AlertTitle>
                    <AlertDescription>
                      {connectionError}
                      <div className="mt-2">
                        <a href="#" className="text-sm underline">
                          View troubleshooting documentation
                        </a>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {connectionStatus === 'success' && (
                  <Alert>
                    <Database className="h-4 w-4 text-green-500" />
                    <AlertTitle>Connection Successful</AlertTitle>
                    <AlertDescription>
                      Your database has been successfully connected. You can now proceed to set up your indexing preferences.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Form actions */}
                <div className="flex gap-4 justify-end">
                  {connectionStatus === 'success' ? (
                    <Button onClick={handleProceed} type="button">
                      Proceed to Indexing Setup
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={connecting}
                    >
                      {connecting ? 'Connecting...' : 'Connect Database'}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>

          {/* Help section */}
          <div className="mt-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <p className="text-sm text-muted-foreground">
              Need help? Check our <a href="#" className="underline">documentation</a> or <a href="#" className="underline">contact support</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
