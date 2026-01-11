import { cn } from "@/lib/utils";
import React from "react";

export const SparklesCore = (props: {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
  className?: string;
}) => {
  return (
    <div className={cn("relative", props.className)}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="sparkles-wrapper absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="sparkle absolute rounded-full bg-blue-500/30 dark:bg-blue-400/30 animate-sparkle"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
