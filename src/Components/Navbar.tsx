import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
  Bell,
  Settings,
  Database,
  Activity,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  username?: string;
}

const Navbar = ({ username = "User" }: NavbarProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    router.push("/login");
  };

  const menuItems = [
    { icon: Activity, label: "Dashboard", path: "/dashboard" },
    { icon: Database, label: "Database Config", path: "/database-config" },
    { icon: BarChart3, label: "Indexing", path: "/indexing" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <a href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-secondary to-accent grid place-items-center">
              <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center">
                <span className="text-sm font-bold text-primary">H</span>
              </div>
            </div>
            <h1 className="text-xl font-bold hidden md:block">Helius</h1>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="" alt={username} />
              <AvatarFallback className="bg-muted text-primary-foreground">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{username}</p>
              <p className="text-xs text-muted-foreground">Developer</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
