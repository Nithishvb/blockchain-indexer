"use client";

import { useState } from "react";
import AuthForm from "@/Components/AuthForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (data: unknown) => {
    setIsLoading(true);
    console.log("data", data);
    // Simulate login API call
    setTimeout(() => {
      // For demo purposes, we'll just navigate to dashboard
      setIsLoading(false);
      toast.success("Welcome back to Helius Indexing Platform");
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col sm:flex-row">
      {/* Left side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-secondary to-accent grid place-items-center animate-pulse-glow">
              <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                <span className="text-xl font-bold text-primary">H</span>
              </div>
            </div>
          </div>
          <AuthForm type="login" onSubmit={handleLogin} />
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden sm:flex sm:flex-1 bg-gradient-to-br from-background via-muted to-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-primary/20 filter blur-3xl animate-float" />
          <div
            className="absolute bottom-[30%] right-[20%] w-72 h-72 rounded-full bg-accent/20 filter blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <radialGradient
                id="heliusGradient"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--accent))"
                  stopOpacity="0"
                />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill="url(#heliusGradient)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-center">
          <div className="max-w-md space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-gradient">
              Helius Blockchain Indexing
            </h2>
            <p className="text-xl text-muted-foreground">
              Seamlessly index and store Solana blockchain data directly into
              your Postgres database
            </p>

            <div className="flex flex-col gap-4 p-6 glass-card text-left mt-12">
              <h3 className="text-lg font-semibold">Why choose Helius?</h3>
              <ul className="space-y-2">
                {[
                  "No RPC infrastructure to manage",
                  "Webhooks for real-time updates",
                  "Advanced data filtering options",
                  "Automatic database schema management",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
