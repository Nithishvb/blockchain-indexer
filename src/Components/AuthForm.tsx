import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (data: unknown) => void;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (type === "signup" && formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call the onSubmit handler passed from the parent
      onSubmit(formData);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gradient">
          {type === "login" ? "Sign in to your account" : "Create your account"}
        </h2>
        <p className="text-muted-foreground">
          {type === "login"
            ? "Enter your credentials to access your account"
            : "Fill in the details below to create your account"}
        </p>
      </div>

      <div className="space-y-4">
        {type === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="johndoe"
              required
              value={formData.username}
              onChange={handleChange}
              className="bg-background/50 backdrop-blur-sm border-muted/80"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-background/50 backdrop-blur-sm border-muted/80"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {type === "login" && (
              <Link href={"#"} className="text-sm text-primary link-hover">
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="bg-background/50 backdrop-blur-sm border-muted/80"
          />
        </div>

        {type === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-background/50 backdrop-blur-sm border-muted/80"
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {type === "login" ? "Signing in..." : "Creating account..."}
          </span>
        ) : (
          <span>{type === "login" ? "Sign in" : "Create account"}</span>
        )}
      </Button>

      <div className="text-center text-sm">
        {type === "login" ? (
          <p>
            {"Don't"} have an account?{" "}
            <Link href="/signup" className="text-primary font-medium link-hover">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium link-hover">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
