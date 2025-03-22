import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Play, Pause, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type IndexingStatus = "active" | "paused" | "stopped";

interface IndexingControlsProps {
  initialStatus?: IndexingStatus;
  className?: string;
}

const IndexingControls = ({
  initialStatus = "stopped",
  className,
}: IndexingControlsProps) => {
  const [status, setStatus] = useState<IndexingStatus>(initialStatus);

  const handleStartIndexing = () => {
    setStatus("active");
    toast.info("Your blockchain data is now being indexed");
  };

  const handleStopIndexing = () => {
    setStatus("stopped");
    toast.info("Blockchain indexing has been stopped");
  };

  const handlePauseIndexing = () => {
    setStatus("paused");
    toast.info("Blockchain indexing has been paused. Click Start to resume")
  };

  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "paused":
        return "bg-yellow-500";
      case "stopped":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "active":
        return "Indexing Active";
      case "paused":
        return "Indexing Paused";
      case "stopped":
        return "Indexing Stopped";
      default:
        return "Unknown Status";
    }
  };

  return (
    <div
      className={cn("flex flex-col sm:flex-row items-center gap-4", className)}
    >
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border">
        <div
          className={`h-3 w-3 rounded-full animate-pulse ${getStatusColor()}`}
        />
        <span className="text-sm font-medium">{getStatusText()}</span>
      </div>

      <div className="flex gap-2">
        {status !== "active" ? (
          <Button
            onClick={handleStartIndexing}
            className="gap-2"
            variant="default"
            size="sm"
          >
            <Play className="h-4 w-4" />
            Start Indexing
          </Button>
        ) : (
          <>
            <Button
              onClick={handlePauseIndexing}
              className="gap-2"
              variant="outline"
              size="sm"
            >
              <Pause className="h-4 w-4" />
              Pause
            </Button>
            <Button
              onClick={handleStopIndexing}
              className="gap-2"
              variant="destructive"
              size="sm"
            >
              <AlertTriangle className="h-4 w-4" />
              Stop
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default IndexingControls;
