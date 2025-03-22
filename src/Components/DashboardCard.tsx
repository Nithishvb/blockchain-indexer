import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "glass-card rounded-xl p-6 relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "",
        success:
          "border-green-500/20 before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-green-500",
        warning:
          "border-yellow-500/20 before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-yellow-500",
        error:
          "border-red-500/20 before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-red-500",
        primary:
          "border-primary/20 before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-primary",
      },
      size: {
        default: "",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface DashboardCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  metric?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const DashboardCard = ({
  title,
  value,
  icon,
  metric,
  trend,
  variant,
  size,
  className,
  ...props
}: DashboardCardProps) => {
  return (
    <div className={cn(cardVariants({ variant, size }), className)} {...props}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && <div className="p-2 rounded-full bg-muted">{icon}</div>}
      </div>
      <div className="flex items-end gap-2">
        <h3 className="text-3xl font-bold">{value}</h3>
        {metric && (
          <span className="text-sm text-muted-foreground mb-1">{metric}</span>
        )}
      </div>
      {trend && (
        <div
          className={`flex items-center mt-2 text-sm ${
            trend.isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          <span>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="ml-1 text-muted-foreground">from last week</span>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
